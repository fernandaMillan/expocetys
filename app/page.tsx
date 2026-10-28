import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allEvents, foxcodingWork, homeVideo, news, programStrengths, projects, siteConfig } from "./content";
import { EventPresentation, EventRegistration, formatEventDateRange } from "./event-status";
import { ProjectCover, VideoPlayer } from "./interactions";

const featureLinks = [
  ["01 / La carrera", "Ser ICC", "/ser-icc"],
  ["02 / Lo que hacemos", "Proyectos", "/proyectos"],
  ["03 / Aprender en equipo", "FoxCoding", "/foxcoding"],
  ["04 / Somos sede", "Eventos", "/eventos"],
  ["05 / Lo que nos mueve", "Logros", "/logros"],
  ["06 / Después de ICC", "Egresados", "/egresados"],
  ["07 / Mira y escucha", "Multimedia", "/multimedia"],
  ["08 / Historias", "Noticias", "/noticias"],
  ["09 / Estamos cerca", "Contacto", "/contacto"],
];

export default function HomePage() {
  const featuredNews = news.slice(0, 6);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Ingeniería en Ciencias Computacionales · Mexicali</p>
          <h1 className="display">
            <span>Tu próxima</span>
            <span>gran idea</span>
            <span>empieza aquí.</span>
          </h1>
          <p>
            Descubre Ingeniería en Ciencias Computacionales en CETYS Mexicali: una
            comunidad donde la curiosidad se convierte en proyectos y la tecnología
            en soluciones.
          </p>
          <div className="actions">
            <Link className="button" href="/ser-icc">
              Descubre qué es ser ICC <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link className="button secondary" href="/proyectos">Explora proyectos</Link>
          </div>
        </div>
        <div className="hero-art hero-video"><VideoPlayer video={homeVideo} aspectRatio="9 / 16" /></div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Un vistazo a la comunidad</p>
            <h2 className="display">Encuentra tu lugar en la tecnología.</h2>
          </div>
          <p>Desde tu primera idea hasta compartirla con el mundo: conoce las experiencias que forman parte de ICC.</p>
        </div>
        <div className="feature-grid">
          {featureLinks.map(([label, title, href]) => (
            <Link className="feature-tile" href={href} key={href}>
              <small>{label}</small><strong>{title}</strong>
              <span className="tile-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section paper-band">
        <div className="section-head">
          <div>
            <p className="eyebrow">De una pregunta a una solución</p>
            <h2 className="display">Proyectos con propósito.</h2>
          </div>
          <Link className="link-arrow" href="/proyectos">Ver todos los proyectos <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="story-grid">
          {foxcodingWork.map((work) => (
            <article className="story-card" key={work.title}>
              <div className="project-cover project-cover-game"><span className="project-cover-name">{work.title}</span><strong>Colaboración de FoxCoding</strong><p>El alcance específico de las actividades está pendiente de confirmar.</p></div>
              <div className="story-body"><span className="tag">{work.category}</span><h3>{work.title}</h3><p>{work.scopeNote}</p><a className="button yellow" href={work.organizationUrl} target="_blank" rel="noreferrer">Conocer la organización <ArrowUpRight size={17} aria-hidden="true" /></a></div>
            </article>
          ))}
          {projects.filter((project) => project.featured).map((project) => (
            <article className="story-card" key={project.id}>
              <ProjectCover project={project} />
              <div className="story-body">
                <span className="tag">{project.event ?? project.area}</span><h3>{project.name}</h3><p>{project.description}</p><p><strong>Problema que atiende:</strong> {project.problem}</p>
                <Link className="link-arrow" href={`/proyectos/${project.slug}`}>Conoce el proyecto <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section upcoming-section">
        <div className="section-head"><div><p className="eyebrow">Próximos encuentros</p><h2 className="display">La comunidad se encuentra.</h2></div><Link className="link-arrow" href="/eventos">Todos los eventos <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        <div className="upcoming-grid">{allEvents.filter((event) => ["dia-del-icc-2026", "space-apps-mexicali-2026"].includes(event.id)).map((event) => <article className="upcoming-item" key={event.id}><h3>{event.name}</h3><Suspense fallback={<><span className="event-state">{event.state}</span><p>{event.summary}</p></>}><EventPresentation event={event} includeSummary /></Suspense>{event.startDate && <p className="quiet-note">{formatEventDateRange(event)} · {event.location}</p>}<div className="actions"><Link className="link-arrow" href={`/eventos/${event.id}`}>Información <ArrowUpRight size={16} aria-hidden="true" /></Link>{event.link && <a className="link-arrow" href={event.link} target="_blank" rel="noreferrer">Información oficial <ArrowUpRight size={16} aria-hidden="true" /></a>}<Suspense fallback={null}><EventRegistration event={event} /></Suspense></div></article>)}</div>
      </section>
      <section className="section paper-band home-strengths">
        <div className="section-head"><div><p className="eyebrow">Dentro y fuera del aula</p><h2 className="display">Una formación que también se vive.</h2></div><Link className="link-arrow" href="/ser-icc">Conoce Ser ICC <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        <div className="strength-preview">{programStrengths.slice(0, 3).map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>
      <section className="section">
        <div className="section-head">
          <div><p className="eyebrow">Voces de nuestra comunidad</p><h2 className="display">ICC en VoCETYS.</h2></div>
          <Link className="link-arrow" href="/noticias">Ver todas las noticias <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="story-grid">
          {featuredNews.map((item) => (
            <article className="story-card" key={item.id}>
              {item.image ? <div className="story-image"><Image src={item.image} alt={`Imagen destacada de ${item.title}`} fill sizes="(max-width: 650px) 100vw, 33vw" /></div> : <div className="story-image news-cover-fallback"><span>{item.category}</span><strong>{item.title}</strong></div>}
              <div className="story-body">
                <span className="tag">{item.category} · {item.campusLabel}</span><h3>{item.title}</h3><p>{item.summary}</p>
                <p className="news-source">Fuente: VOCETYS</p><a className="link-arrow" href={item.source} target="_blank" rel="noreferrer">Leer nota completa <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section paper-band">
        <div className="section-head">
          <div><p className="eyebrow">Una carrera se conoce viviéndola</p><h2 className="display">¿Nos vemos en ExpoCETYS?</h2></div>
          <Link className="button yellow" href="/contacto">Habla con ICC <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <p>{siteConfig.expoBanner.text}. Ven a conocer las carreras, actividades y espacios del campus.</p>
        <a className="link-arrow" href={siteConfig.expoBanner.href} target="_blank" rel="noreferrer">Información de ExpoCETYS Mexicali <ArrowUpRight size={17} aria-hidden="true" /></a>
      </section>
    </main>
  );
}
