import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { programStrengths, siteConfig, studentClips } from "../content";
import { StudentClipGallery } from "../interactions";

export const metadata: Metadata = { title: "Qué significa ser ICC" };
const areas = [
  ["Inteligencia artificial", "Sistemas que reconocen patrones y apoyan decisiones: por ejemplo, detectar anomalías en datos."],
  ["Ciencia de datos", "Convertir información en señales claras para responder preguntas concretas."],
  ["Software", "Diseñar aplicaciones y plataformas que ayuden a personas y organizaciones."],
  ["Redes y seguridad", "Conectar dispositivos y proteger la información que circula entre ellos."],
  ["Internet de las cosas", "Hacer que sensores y objetos compartan datos para responder al entorno."],
  ["Visión por computadora", "Interpretar imágenes para apoyar tareas de inspección o accesibilidad."],
  ["Sistemas interactivos", "Crear experiencias digitales que respondan de forma útil a las personas."],
];
export default function SerIccPage() {
  return <main className="page-shell"><header className="page-intro"><p className="eyebrow">Ingeniería en Ciencias Computacionales</p><h1 className="page-title display">Aprender a imaginar y construir soluciones.</h1><p>Ser ICC es aprender a comprender problemas, explorar posibilidades y crear tecnología que tenga sentido para las personas.</p></header><div className="page-content">
    <section className="split-section"><div><p className="eyebrow">No se trata solo de programar</p><h2>Una pregunta puede convertirse en algo que mejora la vida diaria.</h2><p>En la carrera conectas pensamiento lógico y creatividad. Aprendes a programar, construir sistemas, experimentar, colaborar y tomar decisiones con responsabilidad ética y social.</p></div><ul className="number-list"><li><b>01</b><span>Comprender problemas antes de proponer respuestas.</span></li><li><b>02</b><span>Diseñar soluciones con lógica e imaginación.</span></li><li><b>03</b><span>Probar ideas, aprender de los resultados y volver a intentar.</span></li><li><b>04</b><span>Construir sistemas en colaboración con otras disciplinas.</span></li><li><b>05</b><span>Considerar el impacto social, ambiental y ético de la tecnología.</span></li></ul></section>
    <section className="student-voices"><p className="eyebrow">Experiencias de estudiantes</p><h2>¿Qué es ser ICC? Te lo cuentan quienes lo viven.</h2><p>Conoce cómo nuestros estudiantes viven la carrera, lo que han descubierto y lo que significa para ellos ser ICC.</p><StudentClipGallery clips={studentClips} /></section>
    <section className="split-section"><div><p className="eyebrow">Campos para explorar</p><h2>La computación aparece en muchos lugares.</h2><p>El plan oficial describe una formación de ocho semestres y trabajo en áreas emergentes. Estas son algunas formas concretas de verlas en acción.</p></div><div className="card-grid">{areas.map(([name, text]) => <article className="contact-card" key={name}><span className="tag">Área ICC</span><h3>{name}</h3><p>{text}</p></article>)}</div></section>
    <section className="program-strengths"><p className="eyebrow">Experiencias de formación</p><h2>Una formación que también se vive fuera del aula</h2><div className="strength-grid">{programStrengths.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="callout"><h2>Explora el plan oficial</h2><p>Consulta materias, perfiles y opciones profesionales directamente en CETYS.</p><Link className="link-arrow" href={siteConfig.contacts.program} target="_blank">Programa y plan de estudios <ArrowUpRight size={17} aria-hidden="true" /></Link></section>
  </div></main>;
}
