import type { Metadata } from "next";
import AlumniExperience from "../alumni-experience";
import { graduateSource } from "../content";

export const metadata: Metadata = { title: "Egresados ICC | Preguntas y experiencias" };
export default function AlumniPage() {
  return <main className="page-shell"><header className="page-intro"><p className="eyebrow">Comunidad Alumni</p><h1 className="page-title display">Preguntas que tú también podrías tener</h1><p>Escucha las experiencias de nuestros egresados sobre el mundo laboral, la tecnología y las decisiones que han marcado su trayectoria.</p></header><section className="page-content alumni-content"><AlumniExperience /><div className="alumni-source"><p className="quiet-note">Las trayectorias se documentaron el {graduateSource.referenceDate}; los puestos y ubicaciones no indican vigencia actual.</p><a className="link-arrow" href={graduateSource.url} target="_blank" rel="noreferrer">Leer la historia original</a></div></section></main>;
}
