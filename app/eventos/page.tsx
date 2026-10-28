import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allEvents } from "../content";
import { EventPresentation, EventRegistration, formatEventDateRange } from "../event-status";

export const metadata: Metadata = { title: "Eventos y sedes" };
export default function EventsPage() {
  return <main className="page-shell"><header className="page-intro"><p className="eyebrow">Experiencias que conectan</p><h1 className="page-title display">Somos sede. Aquí también suceden las ideas.</h1><p>Hackatones, encuentros y competencias acercan a las personas a la tecnología. La participación y la sede se especifican por evento.</p></header><section className="page-content">
    <div className="upcoming-grid">{allEvents.filter((event) => ["dia-del-icc-2026", "space-apps-mexicali-2026"].includes(event.id)).map((event) => <article className="upcoming-item upcoming-featured" key={event.id}><h2>{event.name}</h2><Suspense fallback={<><span className="event-state">{event.state}</span><p>{event.summary}</p></>}><EventPresentation event={event} includeSummary /></Suspense>{event.startDate && <p className="quiet-note">{formatEventDateRange(event)} · {event.location}</p>}<div className="actions"><Link className="link-arrow" href={`/eventos/${event.id}`}>Información <ArrowUpRight size={16} aria-hidden="true" /></Link>{event.link && <a className="link-arrow" href={event.link} target="_blank" rel="noreferrer">Información oficial <ArrowUpRight size={16} aria-hidden="true" /></a>}<Suspense fallback={null}><EventRegistration event={event} /></Suspense></div></article>)}</div>
    {allEvents.map((event) => <article className="event-row" key={event.id}><div><Suspense fallback={<span className="event-state">{event.state}</span>}><EventPresentation event={event} /></Suspense></div><div><h3>{event.name}</h3><p><strong>{event.edition}</strong> · {event.role}</p><Suspense fallback={<p>{event.summary}</p>}><EventPresentation event={event} includeSummary /></Suspense><p>Ubicación: {event.location}{event.startDate ? ` · ${formatEventDateRange(event)}` : event.state === "Realizado" ? " · fecha no especificada" : " · fecha por confirmar"}</p></div><Link className="link-arrow" href={`/eventos/${event.id}`}>Detalles <ArrowUpRight size={16} aria-hidden="true" /></Link></article>)}
    <section className="callout"><h2>Final Mexicana ICPC 2026</h2><p>Esta final nacional se realizará en ESCOM IPN, Ciudad de México. Es una etapa distinta de las actividades locales de CETYS Mexicali.</p><a className="link-arrow" href="https://finals2026.icpcmexico.org/" target="_blank" rel="noreferrer">Información de la final nacional <ArrowUpRight size={16} aria-hidden="true" /></a></section>
    <p className="quiet-note">El registro de sede local ICPC se mantiene separado del calendario de la Final Mexicana.</p>
  </section></main>;
}
