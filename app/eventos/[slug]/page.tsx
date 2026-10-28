import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { allEvents } from "../../content";
import { EventPresentation, EventRegistration, formatEventDateRange } from "../../event-status";
import { VideoGallery, VideoPlayer } from "../../interactions";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: allEvents.find((item) => item.id === slug)?.name ?? "Evento ICC" };
}
export function generateStaticParams() { return allEvents.map(({ id }) => ({ slug: id })); }
export default function EventDetailPage({ params }: Props) {
  return <Suspense fallback={<main className="page-shell"><section className="page-content"><p>Cargando evento...</p></section></main>}><EventDetails params={params} /></Suspense>;
}

async function EventDetails({ params }: Props) {
  const { slug } = await params;
  const event = allEvents.find((item) => item.id === slug);
  if (!event) notFound();
  const relatedEvent = allEvents.find((item) => item.id === event.relatedEventId || item.relatedEventId === event.id);
  const dateLabel = formatEventDateRange(event)
    ?? (event.proposedDate ? `Fecha propuesta: ${new Date(`${event.proposedDate}T12:00:00Z`).toLocaleDateString("es-MX", { dateStyle: "long", timeZone: "UTC" })} · por confirmar` : event.state === "Realizado" ? "Fecha no especificada" : "Fecha por confirmar");

  return (
    <main className="page-shell">
      <header className="page-intro"><p className="eyebrow">{event.edition}</p><h1 className="page-title display">{event.name}</h1><Suspense fallback={<p>{event.summary}</p>}><EventPresentation event={event} includeSummary /></Suspense></header>
      <section className="page-content">
        {event.videos?.length ? <section className="event-video"><VideoGallery videos={event.videos} label={`Galería audiovisual de ${event.name} ${event.edition}`} /></section> : event.video && <section className="event-video"><VideoPlayer video={event.video} /><h2>{event.video.title}</h2></section>}
        <div className="split-section"><div><h2>Papel de CETYS / ICC</h2><p>{event.role}</p><h2>Fecha y ubicación</h2><p>{dateLabel} · {event.location}</p>{event.state === "Por confirmar" && <p className="quiet-note">Los datos pendientes no se infieren de la fecha de publicación de una noticia.</p>}</div><div><h2>Información</h2><Suspense fallback={null}><EventRegistration event={event} /></Suspense>{event.materialsUrl && <a className="link-arrow" href={event.materialsUrl} target="_blank" rel="noreferrer">Materiales del evento <ArrowUpRight size={16} aria-hidden="true" /></a>}{event.link && <a className="link-arrow" href={event.link} target="_blank" rel="noreferrer">Sitio oficial o información <ArrowUpRight size={16} aria-hidden="true" /></a>}</div></div>
        {event.source && <a className="link-arrow" href={event.source} target="_blank" rel="noreferrer">Fuente y contexto <ArrowUpRight size={16} aria-hidden="true" /></a>}
        {relatedEvent && <p><Link className="link-arrow" href={`/eventos/${relatedEvent.id}`}>Evento relacionado: {relatedEvent.name} · {relatedEvent.edition} <ArrowUpRight size={16} aria-hidden="true" /></Link></p>}
        <p><Link className="link-arrow" href="/eventos">← Volver a eventos</Link></p>
      </section>
    </main>
  );
}
