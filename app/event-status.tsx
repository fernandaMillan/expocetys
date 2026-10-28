import { io } from "next/cache";
import { getEventMessage, getEventState, type EventRecord } from "./content";

export function formatEventDateRange(event: Pick<EventRecord, "startDate" | "endDate">) {
  if (!event.startDate) return null;
  const start = new Date(`${event.startDate}T12:00:00Z`);
  const formatDate = (date: Date) => date.toLocaleDateString("es-MX", { dateStyle: "long", timeZone: "UTC" });
  if (!event.endDate || event.endDate === event.startDate) return formatDate(start);
  const end = new Date(`${event.endDate}T12:00:00Z`);
  if (start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear()) {
    const monthAndYear = end.toLocaleDateString("es-MX", { month: "long", year: "numeric", timeZone: "UTC" });
    return `${start.getUTCDate()} y ${end.getUTCDate()} de ${monthAndYear}`;
  }
  return `${formatDate(start)} al ${formatDate(end)}`;
}

export async function EventPresentation({ event, includeSummary = false }: { event: EventRecord; includeSummary?: boolean }) {
  if (!event.startDate) {
    return <>{<span className="event-state">{event.state}</span>}{includeSummary && <p>{event.summary}</p>}</>;
  }
  await io();
  const state = getEventState(event, new Date());
  const message = getEventMessage(event, new Date());
  return <><span className="event-state">{state}</span>{includeSummary && <p>{message}</p>}</>;
}

export async function EventRegistration({ event }: { event: EventRecord }) {
  if (!event.registrationUrl) return null;
  if (!event.startDate) return <a className="link-arrow" href={event.registrationUrl} target="_blank" rel="noreferrer">Registro</a>;
  await io();
  if (getEventState(event, new Date()) === "Realizado") return null;
  return <a className="link-arrow" href={event.registrationUrl} target="_blank" rel="noreferrer">Registro</a>;
}
