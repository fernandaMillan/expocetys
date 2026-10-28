import type { Metadata } from "next";
import { projects } from "../content";
import { ProjectGallery } from "../interactions";

export const metadata: Metadata = { title: "Proyectos ICC" };
export default function ProjectsPage() {
  return <main className="page-shell"><header className="page-intro"><p className="eyebrow">Ideas en movimiento</p><h1 className="page-title display">Proyectos que empiezan con una pregunta.</h1><p>Historias documentadas de estudiantes de ICC Mexicali y equipos interdisciplinarios. Cada ficha muestra el video y la explicación cuando esos recursos están disponibles.</p></header><section className="page-content"><ProjectGallery projects={projects.filter((project) => project.published)} /><p className="quiet-note">El semestre de desarrollo solo se indica cuando está documentado. El semestre actual de cada integrante no se usa como sustituto.</p></section></main>;
}
