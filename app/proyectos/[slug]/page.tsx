import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../content";
import { ProjectCover, VideoPlayer } from "../../interactions";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug && item.published);
  return { title: project?.name ?? "Proyecto ICC" };
}
export function generateStaticParams() { return projects.filter((project) => project.published).map(({ slug }) => ({ slug })); }
export default function ProjectDetailPage({ params }: Props) {
  return <Suspense fallback={<main className="page-shell"><section className="page-content"><p>Cargando proyecto...</p></section></main>}><ProjectDetails params={params} /></Suspense>;
}

async function ProjectDetails({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug && item.published);
  if (!project) notFound();
  return <main className="page-shell"><header className="page-intro"><p className="eyebrow">{project.classification ?? project.type}{project.event && ` · ${project.event}`}</p><h1 className="page-title display">{project.name}</h1><p>{project.description}</p></header><section className="page-content">{project.video ? <section className="project-demo"><VideoPlayer video={project.video} aspectRatio={project.video.aspectRatio ?? "16 / 9"} /><h2>Video del proyecto</h2></section> : <ProjectCover project={project} />}<div className="split-section"><div><h2>Qué es</h2><p>{project.description}</p><h2>Problema que atiende</h2><p>{project.problem}</p><span className="tag">{project.classification ?? project.area}</span>{project.recognition && <p className="project-recognition"><strong>Reconocimiento documentado:</strong> {project.recognition}</p>}</div><div><h2>Solución y funcionamiento</h2><p>{project.solution}</p></div></div><section className="split-section"><div><h2>Equipo</h2>{project.members.length ? <ul className="member-list">{project.members.map((member) => <li key={member.name}><strong>{member.name}</strong>{member.semester && <span> · {member.semester} (referencia de la fuente)</span>}</li>)}</ul> : <p>Integrantes pendientes de confirmar.</p>}{project.developmentSemester && <p>Desarrollado en semestre {project.developmentSemester}.</p>}{project.developmentPeriod && <p>Desarrollado durante periodo {project.developmentPeriod.toLowerCase()}.</p>}</div><div><h2>Tecnologías</h2>{project.technologies.length ? <p>{project.technologies.join(" · ")}</p> : <p>Tecnologías pendientes de confirmar.</p>}{project.githubUrl && <a className="link-arrow" href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>}{project.productUrl && <a className="link-arrow" href={project.productUrl} target="_blank" rel="noreferrer">Abrir producto <ArrowUpRight size={16} aria-hidden="true" /></a>}</div></section>{project.source && <a className="link-arrow" href={project.source} target="_blank" rel="noreferrer">Fuente y contexto <ArrowUpRight size={17} aria-hidden="true" /></a>}<p><Link className="link-arrow" href="/proyectos">← Volver a proyectos</Link></p></section></main>;
}
