import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { load } from "cheerio";

const apiBase = "https://www.cetys.mx/noticias/wp-json/wp/v2";
const outputPath = resolve("data/news-catalog.json");
const concurrency = 2;
const timeoutMs = 18000;

async function fetchText(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return { response, text: await response.text() };
}

function canonicalize(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    url.search = "";
    url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;
    return url.href;
  } catch {
    return value;
  }
}

async function scrapeArticle(candidate) {
  const slug = new URL(candidate.source).pathname.split("/").filter(Boolean).at(-1);
  let apiError;
  try {
    const { text } = await fetchText(`${apiBase}/posts?slug=${encodeURIComponent(slug)}&_embed=1`);
    const post = JSON.parse(text)[0];
    if (post) {
      const sourceTags = post._embedded?.["wp:term"]?.flat()?.map((term) => term.name) ?? [];
      return {
        title: load(post.title?.rendered ?? "").text().trim(),
        publishedAt: post.date?.slice(0, 10) ?? "",
        image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
        canonicalUrl: canonicalize(post.link ?? candidate.source),
        sourceTags,
      };
    }
  } catch (error) {
    apiError = error;
  }

  const { text } = await fetchText(candidate.source);
  const $ = load(text);
  const article = $("main article, article.post, article").has("h1").first();
  const title = $("h1").first().text().replace(/\s+/g, " ").trim();
  if (!title || /apologize for the inconvenience/i.test(title)) {
    throw new Error(`REST API failed (${apiError ?? "empty response"}); HTML returned no article metadata`);
  }
  const sourceUrl = $("link[rel='canonical']").attr("href") ?? candidate.source;
  const image = $("meta[property='og:image']").attr("content") ?? article.find("img").first().attr("src") ?? "";
  const date = $("time[datetime]").first().attr("datetime") ?? $("meta[property='article:published_time']").attr("content") ?? "";
  const sourceTags = $("a[rel='tag'], .tags a").map((_, node) => $(node).text().trim()).get();
  return { title, publishedAt: date.slice(0, 10), image, canonicalUrl: canonicalize(sourceUrl), sourceTags };
}

async function mapConcurrent(items, limit, callback) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      try { results[index] = await callback(items[index]); }
      catch (error) { results[index] = { url: items[index].url, fetchError: String(error) }; }
    }
  }));
  return results;
}

async function main() {
  const catalog = JSON.parse(await readFile(outputPath, "utf8"));
  if (catalog.articles?.length !== 21) throw new Error("El catálogo editorial debe contener exactamente 21 noticias.");
  const inputCanonicals = catalog.articles.map((article) => canonicalize(article.canonicalUrl ?? article.source));
  if (new Set(inputCanonicals).size !== inputCanonicals.length) throw new Error("El catálogo contiene URL canónicas duplicadas.");

  const results = await mapConcurrent(catalog.articles, concurrency, async (article) => {
    try { return { article, metadata: await scrapeArticle(article) }; }
    catch (error) { return { article, error: String(error) }; }
  });
  const articles = results.map(({ article, metadata, error }) => {
    if (!metadata) {
      const previousStatus = article.metadataNote?.includes("La consulta anterior fue bloqueada")
        ? "pending"
        : article.metadataStatus ?? "pending";
      const pendingFields = article.metadataNote?.includes("La consulta anterior fue bloqueada")
        ? ["No se pudieron verificar los metadatos de la fuente."]
        : article.metadataPending ?? (previousStatus === "verified" ? [] : ["No se pudieron verificar los metadatos de la fuente."]);
      return {
        ...article,
        metadataStatus: previousStatus,
        metadataPending: pendingFields,
        metadataNote: article.metadataNote?.includes("La consulta anterior fue bloqueada")
          ? "Los metadatos locales se conservaron; falta verificar la fuente."
          : article.metadataNote ?? "No se pudo verificar la fuente.",
        syncError: String(error),
        lastCheckedAt: new Date().toISOString(),
      };
    }
    const updates = {};
    const pending = [];
    if (metadata.title && !/apologize for the inconvenience/i.test(metadata.title)) updates.title = metadata.title;
    else pending.push("title");
    if (/^\d{4}-\d{2}-\d{2}$/.test(metadata.publishedAt)) updates.publishedAt = metadata.publishedAt;
    else pending.push("publishedAt");
    if (/^https:\/\//.test(metadata.image) && metadata.image.includes("/noticias/wp-content/uploads/")) updates.image = metadata.image;
    else pending.push("image");
    if (metadata.canonicalUrl) updates.canonicalUrl = metadata.canonicalUrl;
    else pending.push("canonicalUrl");
    if (Array.isArray(metadata.sourceTags)) updates.sourceTags = metadata.sourceTags;
    return {
      ...article,
      ...updates,
      metadataStatus: pending.length ? "partial" : "verified",
      metadataPending: pending,
      metadataNote: pending.length ? "Hay metadatos de la fuente pendientes de verificación." : "",
      syncError: "",
      lastCheckedAt: new Date().toISOString(),
    };
  }).sort((first, second) => second.publishedAt.localeCompare(first.publishedAt));

  const resultingCanonicals = articles.map((article) => canonicalize(article.canonicalUrl ?? article.source));
  if (new Set(resultingCanonicals).size !== resultingCanonicals.length) throw new Error("La fuente devolvió URL canónicas duplicadas; el catálogo local no se modificó.");
  const updatedCatalog = { ...catalog, updatedAt: new Date().toISOString(), articles };
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(updatedCatalog, null, 2)}\n`, "utf8");
  const pendingCount = articles.filter((article) => article.metadataStatus !== "verified").length;
  console.log(`Actualizadas ${articles.length} noticias seleccionadas; ${pendingCount} requieren revisión de metadatos.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });