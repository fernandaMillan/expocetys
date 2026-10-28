import type { Metadata } from "next";
import { NewsGallery } from "../interactions";
import { news } from "../content";

export const metadata: Metadata = { title: "ICC en VoCETYS" };
export default function NewsPage() {
  return <main className="page-shell"><header className="page-intro"><p className="eyebrow">Historias con atribución</p><h1 className="page-title display">ICC en VoCETYS.</h1><p>Experiencias de nuestra comunidad en Mexicali, otras ciudades y espacios multicampus, publicadas por VOCETYS.</p></header><section className="page-content"><NewsGallery articles={news} /></section></main>;
}
