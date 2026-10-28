import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { podcast } from "../content";
import { PodcastPlayer } from "../interactions";

export const metadata: Metadata = { title: "Multimedia" };
export default function MultimediaPage() {
  return <main className="page-shell"><header className="page-intro"><p className="eyebrow">Podcast</p><h1 className="page-title display">Multimedia</h1><p>Conversaciones de la comunidad CETYS sobre aprendizaje y tecnología.</p></header><section className="page-content"><section className="media-section"><p className="eyebrow">{podcast.series}</p><div className="split-section"><div><h2>{podcast.title}</h2><p>{podcast.description}</p><a className="link-arrow" href={podcast.url} target="_blank" rel="noreferrer">Ver en YouTube <ArrowUpRight size={16} aria-hidden="true" /></a></div><PodcastPlayer videoId={podcast.videoId} image={podcast.image} title={podcast.title} /></div></section></section></main>;
}
