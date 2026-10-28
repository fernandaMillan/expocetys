"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BusFront, Gamepad2, Search, Sun } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { communityVideoGroups, type CommunityVideoRecord, type NewsItem, type Project, type StudentClip, type VideoResource } from "./content";

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [classification, setClassification] = useState("Todas");
  const [semester, setSemester] = useState("Todos");
  const [query, setQuery] = useState("");
  const classifications = ["Todas", ...new Set(projects.flatMap((project) => [project.classification ?? "", project.area, project.type]).filter(Boolean))];
  const semesters = [...new Set(projects.flatMap((project) => project.developmentSemester ? [String(project.developmentSemester)] : []))].sort((a, b) => Number(a) - Number(b));
  const filtered = projects.filter((project) => {
    const matchesSemester = semester === "Todos" || (semester === "Intersemestral" ? project.developmentPeriod === semester : String(project.developmentSemester ?? "") === semester);
    const searchable = `${project.name} ${project.description} ${project.classification ?? ""} ${project.area} ${project.type} ${project.problem} ${project.solution} ${project.technologies.join(" ")}`;
    const matchesClassification = classification === "Todas" || [project.classification, project.area, project.type].includes(classification);
    return matchesSemester && matchesClassification && searchable.toLocaleLowerCase("es-MX").includes(query.trim().toLocaleLowerCase("es-MX"));
  });
  const groups = Map.groupBy(filtered, (project) => project.developmentPeriod ?? (project.developmentSemester ? `Semestre ${project.developmentSemester}` : "Semestre de desarrollo por confirmar"));
  return <>
    <div className="project-controls"><label className="search-field"><Search size={18} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca nombre, descripción o tecnología" /></label><label>Semestre de desarrollo <select value={semester} onChange={(event) => setSemester(event.target.value)}><option>Todos</option>{semesters.map((item) => <option key={item}>{item}</option>)}<option>Intersemestral</option></select></label><label>Clasificación <select value={classification} onChange={(event) => setClassification(event.target.value)}>{classifications.map((item) => <option key={item}>{item}</option>)}</select></label></div>
    {filtered.length ? [...groups].map(([group, items]) => <section className="project-group" key={group}><h2>{group}</h2><div className="story-grid">{items.map((project) => <article className="story-card" key={project.id}><Link className="project-cover-link" href={`/proyectos/${project.slug}`} aria-label={`Ver proyecto ${project.name}`}><ProjectCover project={project} /></Link><div className="story-body"><span className="tag">{project.classification ?? project.area}</span><h3><Link className="project-title-link" href={`/proyectos/${project.slug}`}>{project.name}</Link></h3><p>{project.description}</p><Link className="link-arrow" href={`/proyectos/${project.slug}`}>Ver proyecto <ArrowUpRight size={16} aria-hidden="true" /></Link></div></article>)}</div></section>) : <p className="empty-state">No encontramos proyectos con esos filtros.</p>}
  </>;
}

export function ProjectCover({ project }: { project: Project }) {
  const videoId = project.video && youtubeVideoId(project.video.url);
  const videoPoster = project.video?.poster ?? (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined);
  if (videoPoster && project.video?.aspectRatio !== "9 / 16") return <div className="story-image project-cover-image project-video-cover" style={{ aspectRatio: "16 / 9", backgroundImage: `url("${videoPoster}")` }}><span className="tag">Video del proyecto</span><span className="play-mark" aria-hidden="true">▶</span></div>;
  if (project.screenshot) return <div className="story-image project-cover-image"><Image src={project.screenshot} alt={`Captura del producto ${project.name}`} fill sizes="(max-width: 650px) 100vw, 33vw" /></div>;
  const CoverIcon = project.cover?.graphic === "sun" ? Sun : project.cover?.graphic === "game" ? Gamepad2 : BusFront;
  return <div className={`project-cover project-cover-${project.cover?.graphic ?? "transit"}`}><span className="project-cover-name">{project.name}</span><CoverIcon size={54} strokeWidth={1.4} aria-hidden="true" /><strong>{project.type ?? project.cover?.type ?? project.area}</strong><p>{project.cover?.summary ?? project.solution}</p></div>;
}

export function NewsGallery({ articles }: { articles: NewsItem[] }) {
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");
  const categories = ["Todas", ...new Set(articles.map((item) => item.category))];
  const normalizedQuery = query.trim().toLocaleLowerCase("es-MX");
  const filtered = articles.filter((item) => {
    const searchable = `${item.title} ${item.summary} ${item.category} ${item.campusLabel}`.toLocaleLowerCase("es-MX");
    return (category === "Todas" || item.category === category) && searchable.includes(normalizedQuery);
  });
  return <>
    <label className="search-field news-search"><Search size={18} aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por título, tema o campus" aria-label="Buscar noticias" /></label>
    <div className="filters" aria-label="Filtrar noticias por categoría">{categories.map((item) => <button className="filter-button" type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
    <p className="quiet-note" aria-live="polite">{filtered.length} de {articles.length} noticias</p>
    {filtered.length ? <div className="story-grid">{filtered.map((item) => <article className="story-card" key={item.id}>
      {item.image ? <div className="story-image"><Image src={item.image} alt={`Imagen destacada de ${item.title}`} fill sizes="(max-width: 650px) 100vw, 33vw" /></div> : <div className="story-image news-cover-fallback"><span>{item.category}</span><strong>{item.title}</strong></div>}
      <div className="story-body"><span className="tag">{item.category} · {item.campusLabel}</span><p className="quiet-note"><time dateTime={item.publishedAt}>{new Date(`${item.publishedAt}T12:00:00Z`).toLocaleDateString("es-MX", { dateStyle: "long", timeZone: "UTC" })}</time></p><h3>{item.title}</h3><p>{item.summary}</p><p className="news-source">Fuente: VOCETYS</p><a className="link-arrow" href={item.source} target="_blank" rel="noreferrer">Leer nota completa <ArrowUpRight size={16} aria-hidden="true" /></a></div>
    </article>)}</div> : <p className="empty-state">No encontramos noticias con esa búsqueda o categoría.</p>}
  </>;
}

function youtubeVideoId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    if (!/(^|\.)youtube\.com$/.test(parsed.hostname)) return null;
    if (parsed.pathname === "/watch") return parsed.searchParams.get("v");
    return parsed.pathname.match(/^\/(?:shorts|embed|live)\/([^/?]+)/)?.[1] ?? null;
  } catch {
    return null;
  }
}

export function youtubeWatchUrl(url: string) {
  const videoId = youtubeVideoId(url);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
}

export function VideoPlayer({ video, aspectRatio, autoPlayOnMount = false }: { video: VideoResource; aspectRatio?: string; autoPlayOnMount?: boolean }) {
  const [playing, setPlaying] = useState(autoPlayOnMount);
  const playerId = useId();
  const videoId = youtubeVideoId(video.url);
  const poster = video.poster ?? (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined);
  const ratio = aspectRatio ?? video.aspectRatio ?? "16 / 9";

  useEffect(() => {
    const pauseOtherPlayers = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== playerId) setPlaying(false);
    };
    window.addEventListener("icc:video-play", pauseOtherPlayers);
    return () => window.removeEventListener("icc:video-play", pauseOtherPlayers);
  }, [playerId]);

  useEffect(() => {
    if (playing) window.dispatchEvent(new CustomEvent("icc:video-play", { detail: playerId }));
  }, [playerId, playing]);

  return (
    <div className="video-frame" style={{ aspectRatio: ratio }}>
      {playing ? videoId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&playsinline=1&rel=0&cc_load_policy=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <video src={video.url} poster={poster} controls autoPlay playsInline aria-label={video.title}>
          {video.subtitlesUrl && <track kind="captions" src={video.subtitlesUrl} srcLang="es" label={video.subtitlesLabel ?? "Español"} default />}
        </video>
      ) : (
        <button className="video-poster" type="button" onClick={() => setPlaying(true)} aria-label={`Reproducir ${video.title}`}>
          {poster && <span className="video-poster-image" style={{ backgroundImage: `url("${poster}")` }} aria-hidden="true" />}
          <span className="video-poster-title">{video.title}</span>
          <span className="play-mark" aria-hidden="true">▶</span>
        </button>
      )}
      {videoId && <a className="video-youtube-link" href={youtubeWatchUrl(video.url)} target="_blank" rel="noreferrer">Ver en YouTube</a>}
    </div>
  );
}

export function CommunityVideoGallery({ videos }: { videos: CommunityVideoRecord[] }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>({});

  return <div className="community-video-gallery">{communityVideoGroups.map((group) => {
    const groupVideos = videos.filter((video) => video.groupId === group.id);
    const activeIndex = activeIndexes[group.id] ?? 0;
    if (!groupVideos.length) return null;

    const navigate = (direction: number) => {
      const nextIndex = (activeIndex + direction + groupVideos.length) % groupVideos.length;
      setActiveIndexes((indexes) => ({ ...indexes, [group.id]: nextIndex }));
      setActiveVideoId((current) => groupVideos.some((video) => video.id === current) ? null : current);
    };

    return <section className="community-video-group" key={group.id}>
      <h3 className="display">{group.title}</h3>
      <div className="community-video-grid">{groupVideos.map((video, index) => {
        const videoId = youtubeVideoId(video.url);
        const poster = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined;
        const isActive = activeVideoId === video.id;
        const aspectRatio = video.aspectRatio ?? "16 / 9";
        const videoResource = { url: video.url, title: video.title, poster, aspectRatio };

        return <article className="community-video-card" data-current={index === activeIndex} key={video.id}>
          {isActive ? <VideoPlayer key={video.id} video={videoResource} aspectRatio={aspectRatio} autoPlayOnMount /> : <div className="video-frame" style={{ aspectRatio }}>
            <button className="video-poster" type="button" onClick={() => setActiveVideoId(video.id)} aria-label={`Reproducir ${video.title}`}>
              {poster && <span className="video-poster-image" style={{ backgroundImage: `url("${poster}")` }} aria-hidden="true" />}
              <span className="video-poster-title">{video.title}</span>
              <span className="play-mark" aria-hidden="true">▶</span>
            </button>
            <a className="video-youtube-link" href={youtubeWatchUrl(video.url)} target="_blank" rel="noreferrer">Ver en YouTube</a>
          </div>}
          <div className="community-video-copy"><span className="tag">{video.category}</span><h4>{video.title}</h4></div>
        </article>;
      })}</div>
      {groupVideos.length > 1 && <div className="community-video-navigation" aria-label={`Navegación de ${group.title}`}>
        <button className="icon-button" type="button" aria-label={`Video anterior de ${group.title}`} onClick={() => navigate(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
        <span aria-live="polite">{activeIndex + 1} / {groupVideos.length}</span>
        <button className="icon-button" type="button" aria-label={`Video siguiente de ${group.title}`} onClick={() => navigate(1)}><ArrowRight size={18} aria-hidden="true" /></button>
      </div>}
    </section>;
  })}</div>;
}

export function VideoGallery({ videos, label }: { videos: VideoResource[]; label: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!videos.length) return null;
  const activeVideo = videos[activeIndex];

  return <section className="video-gallery" aria-label={label}>
    <VideoPlayer key={activeVideo.url} video={activeVideo} aspectRatio={activeVideo.aspectRatio ?? "16 / 9"} />
    <h3>{activeVideo.title}</h3>
    {videos.length > 1 && <div className="video-gallery-controls" role="group" aria-label="Seleccionar video">
      {videos.map((video, index) => <button className="filter-button" type="button" aria-pressed={index === activeIndex} key={video.url} onClick={() => setActiveIndex(index)}>
        {String(index + 1).padStart(2, "0")} · {video.title}
      </button>)}
    </div>}
  </section>;
}

export function PodcastPlayer({ videoId, image, title }: { videoId: string; image: string; title: string }) {
  return <VideoPlayer video={{ url: `https://www.youtube.com/watch?v=${videoId}`, poster: image, title }} />;
}

export function StudentClipGallery({ clips }: { clips: StudentClip[] }) {
  const completeClips = clips.filter((clip) => clip.published && clip.video);
  const [activeIndex, setActiveIndex] = useState(0);
  if (!completeClips.length) return <p className="empty-state">Los clips se publicarán cuando estén disponibles y cuenten con los datos y permisos necesarios.</p>;
  const activeClip = completeClips[activeIndex];
  const aspectRatio = activeClip.video?.aspectRatio ?? "16 / 9";
  return <div className="student-clip-gallery"><div className="student-clip-stage"><VideoPlayer key={activeClip.name} video={{ ...activeClip.video!, title: `${activeClip.name}: ${activeClip.topic}`, poster: activeClip.poster ?? activeClip.video!.poster, aspectRatio, subtitlesUrl: activeClip.subtitlesUrl ?? activeClip.video!.subtitlesUrl }} aspectRatio={aspectRatio} /><div className="student-clip-copy"><span className="tag">{activeClip.topic}</span><h3>{activeClip.name}</h3>{activeClip.semester && <p>{activeClip.semester}</p>}{activeClip.quote && activeClip.quoteSource && <blockquote cite={activeClip.quoteSource}>{activeClip.quote}</blockquote>}</div></div><div className="clip-navigation"><button className="icon-button" type="button" aria-label="Clip anterior" onClick={() => setActiveIndex((index) => (index - 1 + completeClips.length) % completeClips.length)}><ArrowLeft size={18} aria-hidden="true" /></button><span aria-live="polite">{activeIndex + 1} / {completeClips.length}</span><button className="icon-button" type="button" aria-label="Clip siguiente" onClick={() => setActiveIndex((index) => (index + 1) % completeClips.length)}><ArrowRight size={18} aria-hidden="true" /></button></div></div>;
}
