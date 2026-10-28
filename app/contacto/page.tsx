import type { Metadata } from "next";
import { ArrowUpRight, Camera, Mail } from "lucide-react";
import { siteConfig } from "../content";

export const metadata: Metadata = { title: "Contacto ICC" };
export default function ContactPage() {
  const { coordination, foxcoding } = siteConfig.contacts;
  return <main className="page-shell"><header className="page-intro"><p className="eyebrow">Estamos para conversar</p><h1 className="page-title display">¿Qué te gustaría construir?</h1><p>Escríbenos para conocer la carrera, acercarte a la comunidad o resolver tus dudas sobre ICC en CETYS Mexicali.</p></header><section className="page-content"><div className="contact-grid">
    <article className="contact-card"><span className="tag">Coordinación</span><h2>{coordination.name}</h2><p>{coordination.role}</p><p>{coordination.campus}</p><a href={`mailto:${coordination.email}`}><Mail size={17} aria-hidden="true" /> {coordination.email}</a></article>
    <article className="contact-card fox-card"><span className="tag">Comunidad estudiantil</span><h2>FoxCoding</h2><p>Proyectos, competencias de programación y aprendizaje colaborativo.</p><a href={`mailto:${foxcoding.email}`}><Mail size={17} aria-hidden="true" /> {foxcoding.email}</a><a href={foxcoding.website} target="_blank" rel="noreferrer">Sitio de FoxCoding <ArrowUpRight size={16} aria-hidden="true" /></a><a href={foxcoding.instagram} target="_blank" rel="noreferrer"><Camera size={17} aria-hidden="true" /> Instagram FoxCoding</a></article>
    <article className="contact-card social-card"><span className="tag">Instagram ICC</span><h2>@iccmxl</h2><p>Comunidad y actividades de Ingeniería en Ciencias Computacionales.</p><a href={siteConfig.contacts.instagram} target="_blank" rel="noreferrer"><Camera size={17} aria-hidden="true" /> Abrir perfil ICC <ArrowUpRight size={16} aria-hidden="true" /></a></article>
    <article className="contact-card social-card"><span className="tag">Instagram FoxCoding</span><h2>@foxcoding.cpp</h2><p>Proyectos, retos y experiencias del club.</p><a href={foxcoding.instagram} target="_blank" rel="noreferrer"><Camera size={17} aria-hidden="true" /> Abrir perfil FoxCoding <ArrowUpRight size={16} aria-hidden="true" /></a></article>
  </div></section></main>;
}
