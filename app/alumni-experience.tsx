"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { alumni, alumniQuestions, type AlumniRecord, type VideoResource } from "./content";
import { VideoPlayer, youtubeWatchUrl } from "./interactions";

function youtubePoster(url: string) {
  try {
    const parsed = new URL(url);
    const videoId = parsed.hostname === "youtu.be"
      ? parsed.pathname.split("/").filter(Boolean)[0]
      : parsed.hostname.endsWith("youtube.com")
        ? parsed.searchParams.get("v") ?? parsed.pathname.match(/^\/(?:shorts|embed|live)\/([^/?]+)/)?.[1]
        : undefined;
    return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined;
  } catch {
    return undefined;
  }
}

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("");
}

function AlumniVideoControl({ video, playbackId, active, label, onPlay }: {
  video: VideoResource;
  playbackId: string;
  active: boolean;
  label: string;
  onPlay: (id: string) => void;
}) {
  const poster = video.poster ?? youtubePoster(video.url);
  const aspectRatio = video.aspectRatio ?? "16 / 9";

  if (active) return <VideoPlayer key={playbackId} video={{ ...video, poster }} aspectRatio={aspectRatio} autoPlayOnMount />;

  return <>
    <div className="video-frame alumni-video-cover" style={{ aspectRatio, backgroundImage: poster ? `url("${poster}")` : undefined }}>
      <button className="alumni-video-action" type="button" onClick={() => onPlay(playbackId)} aria-label={`${label}: ${video.title}`}>
        <span className="play-mark" aria-hidden="true">▶</span>
        <span>{label}</span>
      </button>
    </div>
    <a className="link-arrow alumni-youtube-link" href={youtubeWatchUrl(video.url)} target="_blank" rel="noreferrer">Ver en YouTube <ArrowUpRight size={16} aria-hidden="true" /></a>
  </>;
}

function AlumniPortrait({ person }: { person: AlumniRecord }) {
  if (person.photo) return <div className="alumni-portrait" role="img" aria-label={`Fotografía de ${person.name}`} style={{ backgroundImage: `url("${person.photo}")` }} />;
  return <div className="alumni-portrait alumni-portrait-fallback" aria-hidden="true">{initials(person.name)}</div>;
}

export default function AlumniExperience() {
  const sortedQuestions = [...alumniQuestions].sort((first, second) => first.order - second.order);
  const [selectedQuestionId, setSelectedQuestionId] = useState(sortedQuestions[0]?.id ?? "");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const selectedQuestion = sortedQuestions.find((question) => question.id === selectedQuestionId) ?? sortedQuestions[0];
  const presenters = alumni.filter((person) => person.presentationVideo?.url).sort((first, second) => (first.presentationOrder ?? Number.MAX_SAFE_INTEGER) - (second.presentationOrder ?? Number.MAX_SAFE_INTEGER));

  const selectQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setActiveVideoId(`question:${questionId}`);
    requestAnimationFrame(() => {
      const heading = document.getElementById("selected-alumni-question");
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    });
  };

  return <>
    <section className="alumni-questions" id="preguntas" aria-labelledby="alumni-questions-heading">
      <div className="alumni-section-heading">
        <div>
          <p className="eyebrow">Experiencias en primera persona</p>
          <h2 id="alumni-questions-heading">Preguntas</h2>
        </div>
        <p>Selecciona una pregunta para ver el video.</p>
      </div>
      <div className="alumni-question-list" aria-label="Preguntas para egresados">
        {sortedQuestions.map((question) => (
          <button
            className="alumni-question-button"
            id={`pregunta-${question.id}`}
            key={question.id}
            type="button"
            aria-pressed={selectedQuestionId === question.id}
            onClick={() => selectQuestion(question.id)}
            aria-label={`Seleccionar pregunta ${String(question.order).padStart(2, "0")}: ${question.text}`}
          >
            <span className="alumni-question-number">{String(question.order).padStart(2, "0")}</span>
            <span>{question.text}</span>
          </button>
        ))}
      </div>
      {selectedQuestion && <section className="alumni-selected-question" aria-labelledby="selected-alumni-question">
        <p className="eyebrow">Pregunta {String(selectedQuestion.order).padStart(2, "0")}</p>
        <h3 id="selected-alumni-question" tabIndex={-1}>{selectedQuestion.text}</h3>
        <AlumniVideoControl video={selectedQuestion.video} playbackId={`question:${selectedQuestion.id}`} active={activeVideoId === `question:${selectedQuestion.id}`} label="Ver video" onPlay={setActiveVideoId} />
      </section>}
    </section>

    <section className="alumni-people" aria-labelledby="alumni-people-heading">
      <div className="alumni-section-heading">
        <div>
          <p className="eyebrow">Trayectorias ICC</p>
          <h2 id="alumni-people-heading">Conoce a quienes comparten su experiencia</h2>
        </div>
        <p>Una presentación breve de cada egresado, independiente de los videos por pregunta.</p>
      </div>
      <div className="alumni-people-grid">
        {presenters.map((person) => (
          <article className="alumni-person-card" key={person.id}>
            <AlumniPortrait person={person} />
            <div className="alumni-person-copy">
              <span className="tag">{person.field}</span>
              <h3><Link href={`/egresados/${person.slug}`}>{person.name}</Link></h3>
              <p>{person.description ?? `${person.role} · ${person.location}`}</p>
              {person.generation && <p className="quiet-note">Generación {person.generation}</p>}
              {person.presentationVideo && <div className="alumni-presentation">
                <AlumniVideoControl
                  video={{ ...person.presentationVideo, title: `Presentación de ${person.name}` }}
                  playbackId={`presentation:${person.id}`}
                  active={activeVideoId === `presentation:${person.id}`}
                  label="Ver presentación"
                  onPlay={setActiveVideoId}
                />
              </div>}
              <div className="alumni-person-links">
                <Link className="link-arrow" href={`/egresados/${person.slug}#presentacion`}>Ver presentación <ArrowUpRight size={16} aria-hidden="true" /></Link>
                {person.linkedinUrl && <a className="link-arrow" href={person.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>;
}