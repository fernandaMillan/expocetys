import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { alumni, graduateSource } from "../../content";
import { VideoPlayer } from "../../interactions";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: alumni.find((person) => person.slug === slug)?.name ?? "Perfil Alumni" };
}

export function generateStaticParams() {
  return alumni.map(({ slug }) => ({ slug }));
}

export default function AlumniProfilePage({ params }: Props) {
  return <Suspense fallback={<main className="page-shell"><section className="page-content"><p>Cargando perfil...</p></section></main>}><AlumniProfile params={params} /></Suspense>;
}

async function AlumniProfile({ params }: Props) {
  const { slug } = await params;
  const person = alumni.find((item) => item.slug === slug);
  if (!person) notFound();

  return <main className="page-shell"><header className="page-intro"><p className="eyebrow">{person.field} · Egresada/o ICC</p><h1 className="page-title display">{person.name}</h1><p>{person.description ?? `${person.role} · ${person.location}`}</p></header><section className="page-content alumni-profile-content">
    {person.photo && <div className="alumni-profile-photo" role="img" aria-label={`Fotografía de ${person.name}`} style={{ backgroundImage: `url("${person.photo}")` }} />}
    {person.presentationVideo?.url && <section className="alumni-profile-presentation" id="presentacion"><h2>Presentación</h2><VideoPlayer video={{ ...person.presentationVideo, title: `Presentación de ${person.name}` }} /></section>}
    <div className="alumni-profile-trajectory"><h2>Trayectoria</h2><p>{person.role}</p><p>{person.location}</p>{person.generation && <p>Generación {person.generation}</p>}{person.linkedinUrl && <a className="link-arrow alumni-linkedin-link" href={person.linkedinUrl} target="_blank" rel="noreferrer" aria-label={`Abrir LinkedIn de ${person.name}`}>LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>}</div>
    <p className="quiet-note">Referencia de trayectoria: {graduateSource.referenceDate}.</p><Link className="link-arrow" href="/egresados"><ArrowLeft size={16} aria-hidden="true" /> Volver a egresados</Link>
  </section></main>;
}