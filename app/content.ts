import newsCatalog from "../data/news-catalog.json";

export type NewsCategory = "Logros" | "Comunidad" | "Industria" | "Investigación" | "Eventos" | "Egresados" | "Impacto social";
export type VideoResource = { url: string; title: string; poster?: string; aspectRatio?: string; subtitlesUrl?: string; subtitlesLabel?: string };
export type NewsItem = {
  id: string; title: string; publishedAt: string; summary: string;
  category: NewsCategory; campusLabel: "Mexicali" | "Multicampus con participación de Mexicali" | "Mexicali en sede externa";
  image: string; source: string; canonicalUrl: string; relatedIds: string[]; published: boolean;
};
export type Project = {
  id: string; slug: string; name: string; area: string; type: string; classification?: string; description: string; problem: string; solution: string;
  members: { name: string; semester?: string }[]; technologies: string[];
  source?: string; recognition?: string; featured: boolean; published: boolean;
  developmentSemester?: number; developmentPeriod?: "Intersemestral";
  course?: string; event?: string; cover: { kind: "typographic"; type: string; summary: string; graphic: "transit" | "sun" | "game" };
  screenshot?: string; video?: VideoResource; githubUrl?: string; productUrl?: string;
};
export type EventRecord = {
  id: string; name: string; edition: string; summary: string; role: string; date?: string;
  location: string; audience?: string; state: "Realizado" | "Próximo" | "Por confirmar";
  link?: string; source?: string;
  startDate?: string; endDate?: string; proposedDate?: string; proposedEndDate?: string; registrationUrl?: string; materialsUrl?: string; video?: VideoResource; videos?: VideoResource[]; relatedEventId?: string;
};
export type StudentClip = {
  name: string; semester?: string; topic: string; video?: VideoResource;
  poster?: string; subtitlesUrl?: string; quote?: string; quoteSource?: string; published: boolean;
};

export const siteConfig = {
  expoBanner: { enabled: true, text: "ExpoCETYS Mexicali · 28 de octubre de 2026", href: "https://www.cetys.mx/expocetys/mexicali/", linkLabel: "Encuentra tu camino" },
  contacts: {
    coordination: { name: "Mtra. María Fernanda Millán Arce", role: "Coordinación de Ingeniería en Ciencias Computacionales", campus: "CETYS Universidad, Campus Mexicali", email: "fernanda.millan@cetys.mx" },
    foxcoding: { email: "foxcoding@cetys.edu.mx", website: "https://foxcoding.com.mx/", instagram: "https://www.instagram.com/foxcoding.cpp/" },
    instagram: "https://www.instagram.com/iccmxl",
    program: "https://www.cetys.mx/programas/ingenieria-en-ciencias-computacionales/",
  },
};

export const news: NewsItem[] = newsCatalog.articles
  .map((article) => ({ ...article, category: article.category as NewsCategory, campusLabel: article.campusLabel as NewsItem["campusLabel"], source: article.canonicalUrl, relatedIds: [], published: true }))
  .sort((first, second) => second.publishedAt.localeCompare(first.publishedAt));

function videoProjectCover(name: string): Project["cover"] {
  return { kind: "typographic", type: "Proyecto en video", summary: name, graphic: "game" };
}

export const projects: Project[] = [
  { id: "under-the-lake", slug: "under-the-lake", name: "Under the Lake", area: "Videojuegos e impacto ambiental", type: "Videojuego educativo", description: "Videojuego educativo sobre escenarios futuros de escasez de recursos naturales.", problem: "La escasez de recursos naturales puede sentirse lejana sin experiencias que ayuden a imaginar sus consecuencias.", solution: "Un videojuego educativo que plantea escenarios futuros para crear conciencia sobre la escasez de recursos naturales.", members: [{ name: "Abraham Saldívar", semester: "Sexto semestre, según la nota" }], event: "Climate Change-Maker Hackathon 2025", recognition: "Señalado como ganador en Climate Change-Maker Hackathon 2025.", technologies: ["Desarrollo de videojuegos"], cover: { kind: "typographic", type: "Videojuego educativo", summary: "Escenarios sobre la escasez de recursos naturales.", graphic: "game" }, video: { url: "https://youtu.be/W0IcMzsxUW0", title: "Under the Lake" }, source: "https://www.cetys.mx/noticias/estudiantes-de-cetys-obtienen-reconocimiento-internacional-en-el-hackathon-2025/", featured: true, published: true },
  { id: "fisher", slug: "fisher", name: "Fisher", area: "Redes sociales", type: "Red social", classification: "Red social", description: "El material identifica Fisher como una red social; otros detalles están pendientes de confirmar.", problem: "El problema específico que atiende está pendiente de confirmar.", solution: "El funcionamiento detallado está pendiente de confirmar.", members: [], technologies: [], cover: videoProjectCover("Fisher"), video: { url: "https://youtube.com/shorts/O5N5gOF3rpc", title: "Fisher", aspectRatio: "9 / 16" }, featured: false, published: true },
  { id: "uniplus", slug: "uniplus", name: "UniPlus", area: "Software", type: "Proyecto estudiantil", classification: "Proyecto estudiantil", description: "Plataforma de aprendizaje gamificada con contenidos fuera del área escolar.", problem: "El problema específico que atiende está pendiente de confirmar.", solution: "Plataforma de aprendizaje gamificada con contenidos fuera del área escolar.", members: [], technologies: [], cover: videoProjectCover("UniPlus"), video: { url: "https://youtu.be/3j1_-DQm6II", title: "UniPlus" }, githubUrl: "https://github.com/EmilioFex20/UNIplus", productUrl: "https://uniplus-six.vercel.app/", featured: false, published: true },
  { id: "foreign-app", slug: "foreign-app", name: "Foreign App", area: "Software", type: "Proyecto estudiantil", classification: "Proyecto estudiantil", description: "Red social pensada para estudiantes internacionales de CETYS.", problem: "El problema específico que atiende está pendiente de confirmar.", solution: "Red social pensada para estudiantes internacionales de CETYS.", members: [], technologies: [], cover: videoProjectCover("Foreign App"), video: { url: "https://youtu.be/dIxU1GUn7pA", title: "Foreign App" }, productUrl: "https://drive.google.com/file/d/1rEwyxak9DFuKLcjw_3K8qbte5Kstr1BJ/view?usp=sharing", featured: false, published: true },
  { id: "estudia-app", slug: "estudia-app", name: "EstudIA App", area: "Software", type: "Proyecto estudiantil", classification: "Proyecto estudiantil", description: "Proyecto estudiantil presentado en video; descripción detallada pendiente de confirmar.", problem: "El problema específico que atiende está pendiente de confirmar.", solution: "El funcionamiento detallado está pendiente de confirmar.", members: [], technologies: [], cover: videoProjectCover("EstudIA App"), video: { url: "https://youtu.be/fftc8Vd_F8k", title: "EstudIA App" }, featured: false, published: true },
  { id: "equilibrium", slug: "equilibrium", name: "Equilibrium", area: "Software", type: "Proyecto estudiantil", classification: "Proyecto estudiantil", description: "Proyecto estudiantil presentado en video; descripción detallada pendiente de confirmar.", problem: "El problema específico que atiende está pendiente de confirmar.", solution: "El funcionamiento detallado está pendiente de confirmar.", members: [], technologies: [], cover: videoProjectCover("Equilibrium"), video: { url: "https://www.youtube.com/watch?v=nyeLWqwTSIU", title: "Equilibrium" }, featured: false, published: true },
  { id: "mindclash", slug: "mindclash", name: "MindClash", area: "Software", type: "Proyecto estudiantil", classification: "Proyecto estudiantil", description: "Proyecto estudiantil presentado en video; descripción detallada pendiente de confirmar.", problem: "El problema específico que atiende está pendiente de confirmar.", solution: "El funcionamiento detallado está pendiente de confirmar.", members: [], technologies: [], cover: videoProjectCover("MindClash"), video: { url: "https://youtube.com/shorts/CQu4P7WLLOY", title: "MindClash", aspectRatio: "9 / 16" }, featured: false, published: true },
  { id: "mi-primer-capital", slug: "mi-primer-capital", name: "Mi Primer Capital", area: "Software", type: "Proyecto estudiantil", classification: "Proyecto estudiantil", description: "Proyecto estudiantil presentado en video; descripción detallada pendiente de confirmar.", problem: "El problema específico que atiende está pendiente de confirmar.", solution: "El funcionamiento detallado está pendiente de confirmar.", members: [], technologies: [], cover: videoProjectCover("Mi Primer Capital"), video: { url: "https://youtu.be/9USq-ul_yi8", title: "Mi Primer Capital" }, featured: false, published: true },
  { id: "fiscai", slug: "fiscai", name: "FiscAI", area: "Software", type: "Proyecto estudiantil", classification: "Proyecto estudiantil", description: "Proyecto estudiantil presentado en video; descripción detallada pendiente de confirmar.", problem: "El problema específico que atiende está pendiente de confirmar.", solution: "El funcionamiento detallado está pendiente de confirmar.", members: [], technologies: [], cover: videoProjectCover("FiscAI"), video: { url: "https://youtu.be/W9DTHJN18sU", title: "FiscAI" }, recognition: "Ganador en HackMTY.", event: "HackMTY", featured: false, published: true },
  { id: "eco-quiz", slug: "eco-quiz", name: "Eco-Quiz", area: "Sostenibilidad", type: "Proyecto estudiantil", classification: "Proyecto estudiantil", description: "Aplicación móvil con enfoque en conciencia ambiental y gamificación, presentada como finalista en Climate Change-Maker Hackathon 2025.", problem: "Busca promover conciencia ambiental; la problemática ambiental específica no está identificada en la fuente.", solution: "Aplicación móvil que combina conciencia ambiental y gamificación.", members: [], technologies: [], cover: videoProjectCover("Eco-Quiz"), video: { url: "https://youtu.be/cwbrVtRL390", title: "Eco-Quiz" }, event: "Climate Change-Maker Hackathon 2025", featured: true, published: true },
  { id: "desert-flower", slug: "desert-flower", name: "Desert Flower", area: "Sostenibilidad", type: "Proyecto estudiantil", classification: "Proyecto estudiantil", description: "Proyecto presentado en Climate Change-Maker Hackathon 2025; descripción detallada pendiente de confirmar.", problem: "El problema específico que atiende está pendiente de confirmar.", solution: "El funcionamiento detallado está pendiente de confirmar.", members: [], technologies: [], cover: videoProjectCover("Desert Flower"), video: { url: "https://youtu.be/C0JsiH-fKXk", title: "Desert Flower" }, recognition: "Señalado como ganador en Climate Change-Maker Hackathon 2025.", event: "Climate Change-Maker Hackathon 2025", featured: false, published: true },
  { id: "cruzhacks-project", slug: "proyecto-cruzhacks", name: "Proyecto presentado en CruzHacks", area: "Software", type: "Proyecto estudiantil", classification: "Proyecto estudiantil", description: "El nombre específico y la descripción del proyecto están pendientes de confirmar.", problem: "Pendiente de confirmar.", solution: "Pendiente de confirmar.", members: [], technologies: [], cover: videoProjectCover("Proyecto presentado en CruzHacks"), video: { url: "https://youtu.be/kAjsQtYulf8", title: "Proyecto presentado en CruzHacks" }, event: "CruzHacks", featured: false, published: true },
];
export const foxcodingProjectIds = ["uniplus", "foreign-app"];

export const events: EventRecord[] = [
  { id: "hackfox-2026", name: "HackFox", edition: "2026 · edición estatal", summary: "Edición estatal de HackFox, con retos de tecnología emergente y participación de CETYS y FoxCoding.", role: "Coorganización de CETYS; participación de FoxCoding", startDate: "2026-05-28", endDate: "2026-05-29", location: "Pixeland Arcade, Tijuana", state: "Realizado", link: "https://www.cetys.mx/noticias/hackfox-2026-impulsa-la-innovacion-y-el-talento-tecnologico-para-transformar-la-movilidad-en-baja-california/", source: "https://www.cetys.mx/noticias/hackfox-2026-impulsa-la-innovacion-y-el-talento-tecnologico-para-transformar-la-movilidad-en-baja-california/" },
  { id: "hackhexa-2026", name: "HackHexa", edition: "2026 · segunda edición", summary: "Experiencia práctica de acercamiento a STEM para jóvenes, con retos, colaboración y conversación con estudiantes, mentoras e ingenieras.", role: "Iniciativa impulsada por la Coordinación ICC", startDate: "2026-05-09", location: "CETYS Universidad, Campus Mexicali", state: "Realizado", link: "https://www.cetys.mx/noticias/hackhexa-2026-fortalece-el-interes-de-jovenes-por-las-ingenierias-y-areas-stem/", source: "https://www.cetys.mx/noticias/hackhexa-2026-fortalece-el-interes-de-jovenes-por-las-ingenierias-y-areas-stem/" },
  { id: "icpc-local", name: "ICPC · actividad local", edition: "Sede local · calendario por confirmar", summary: "La actividad de sede local de CETYS Mexicali se mantiene separada de la Final Mexicana ICPC. Su fecha y fase se incorporarán cuando aparezcan en el calendario oficial correspondiente.", role: "Actividad local de CETYS Mexicali", location: "CETYS Mexicali", state: "Por confirmar" },
  { id: "hackhexa-stem-2025", name: "HackHexa", edition: "2025 · primera edición documentada", summary: "Jornada con rally de retos lógicos, encuentro con equipos tecnológicos y panel de coordinadoras y docentes de carreras STEM.", role: "Organización de ICC con colaboración interdisciplinaria", startDate: "2025-03-28", location: "CETYS Universidad, Campus Mexicali", state: "Realizado", link: "https://www.cetys.mx/noticias/hackhexa-rompiendo-esquemas-y-construyendo-futuro-para-mujeres-en-stem/", source: "https://www.cetys.mx/noticias/hackhexa-rompiendo-esquemas-y-construyendo-futuro-para-mujeres-en-stem/" },
  { id: "space-apps-mexicali-2025", name: "NASA Space Apps · Mexicali", edition: "2025 · recuerdos de la edición local", summary: "Recapitulaciones audiovisuales de NASA Space Apps 2025.", role: "Sede local", location: "Mexicali", state: "Realizado", videos: [{ url: "https://youtu.be/fDg8gVaW5SM", title: "Recapitulación de Space Apps 2025, parte 1" }, { url: "https://youtu.be/wA18lshs_5M", title: "Recapitulación de Space Apps 2025, parte 2" }], relatedEventId: "space-apps-mexicali-2026" },
  { id: "dia-del-icc-2025", name: "Día del ICC", edition: "2025 · encuentro de comunidad", summary: "Encuentro de estudiantes, docentes, egresados y aliados para compartir experiencias y fortalecer la comunidad ICC.", role: "Encuentro de la comunidad ICC", startDate: "2025-11-13", location: "CETYS Mexicali", state: "Realizado", relatedEventId: "minihackfox-2025" },
  { id: "minihackfox-2025", name: "MiniHackFox", edition: "2025 · continuación del Día del ICC", summary: "Actividad realizada como continuación del Día del ICC 2025. La descripción específica de esta edición puede ampliarse con los materiales del evento.", role: "Experiencia de colaboración vinculada al Día del ICC", startDate: "2025-11-14", location: "CETYS Mexicali", state: "Realizado", relatedEventId: "dia-del-icc-2025" },
  { id: "icpc-final-2026", name: "Final Mexicana ICPC", edition: "2026 · final nacional", summary: "Final nacional del circuito ICPC México; corresponde a una etapa distinta de las actividades locales de cada sede.", role: "Final nacional · no corresponde a la actividad local de CETYS Mexicali", startDate: "2026-11-06", endDate: "2026-11-07", location: "ESCOM IPN, Ciudad de México", state: "Próximo", link: "https://finals2026.icpcmexico.org/", source: "https://finals2026.icpcmexico.org/" },
];

export const upcomingEvents: EventRecord[] = [
  { id: "dia-del-icc-2026", name: "Día del ICC", edition: "2026 · encuentro de comunidad", summary: "Encuentro habitual del segundo jueves de noviembre; la fecha de esta edición se registra por separado para mantener cada año configurable.", role: "Encuentro de la comunidad ICC", startDate: "2026-11-12", location: "CETYS Mexicali · por confirmar", state: "Próximo", link: "https://iccday.vercel.app/" },
  { id: "space-apps-mexicali-2026", name: "NASA Space Apps · Mexicali 2026", edition: "14 y 15 de noviembre de 2026", summary: "NASA Space Apps · Mexicali se celebrará el 14 y 15 de noviembre de 2026 en la sede local de CETYS Universidad, Campus Mexicali.", role: "Sede local: CETYS Universidad, Campus Mexicali", startDate: "2026-11-14", endDate: "2026-11-15", location: "CETYS Universidad, Campus Mexicali", state: "Próximo", link: "https://www.spaceappschallenge.org/2026/local-events/mexicali/" },
];
export const allEvents = [...events, ...upcomingEvents];

export function getEventState(event: EventRecord, now = new Date()) {
  const startDate = event.startDate;
  const endDate = event.endDate ?? startDate;
  if (!startDate || !endDate) return event.state;
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Tijuana", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const localDate = `${parts.find((part) => part.type === "year")?.value}-${parts.find((part) => part.type === "month")?.value}-${parts.find((part) => part.type === "day")?.value}`;
  return localDate > endDate ? "Realizado" : "Próximo";
}

export function getEventMessage(event: EventRecord, now = new Date()) {
  return getEventState(event, now) === "Realizado"
    ? "Este evento ya se realizó. Consulta la información y los materiales disponibles."
    : event.summary;
}

export type AlumniRecord = { id: string; slug: string; name: string; field: string; role: string; location: string; description?: string; generation?: string; presentationVideo?: VideoResource; presentationOrder?: number; photo?: string; linkedinUrl?: string };
export type AlumniQuestion = { id: string; text: string; order: number; video: VideoResource };
export const alumniQuestions: AlumniQuestion[] = [
  { id: "trayectoria-suerte-perseverancia", text: "En su trayectoria profesional, ¿qué ha tenido más peso: la suerte o la perseverancia?", order: 1, video: { url: "https://youtu.be/lzdPVMzGHCE", title: "En su trayectoria profesional, ¿qué ha tenido más peso: la suerte o la perseverancia?" } },
  { id: "oportunidades-laborales-estados-unidos", text: "¿Qué caminos recomiendan para que un profesional mexicano pueda acceder a oportunidades laborales en la industria de los videojuegos en Estados Unidos?", order: 2, video: { url: "https://youtu.be/G_LDAQ-hOwI", title: "¿Qué caminos recomiendan para que un profesional mexicano pueda acceder a oportunidades laborales en la industria de los videojuegos en Estados Unidos?" } },
  { id: "entrevista-big-tech", text: "¿Cómo puede prepararse un profesional de ICC para una entrevista en una big tech?", order: 3, video: { url: "https://youtu.be/vpAxjWBh02s", title: "¿Cómo puede prepararse un profesional de ICC para una entrevista en una big tech?" } },
  { id: "habilidades-entrevista-trabajo", text: "Más allá del conocimiento técnico, ¿qué habilidades y actitudes ayudan a destacar en una entrevista de trabajo?", order: 4, video: { url: "https://youtu.be/wC3kUVEZxEA", title: "Más allá del conocimiento técnico, ¿qué habilidades y actitudes ayudan a destacar en una entrevista de trabajo?" } },
  { id: "oportunidades-inteligencia-artificial", text: "¿Qué oportunidades profesionales les ha abierto involucrarse en el campo de la inteligencia artificial?", order: 5, video: { url: "https://youtu.be/XTmRzNR-JXc", title: "¿Qué oportunidades profesionales les ha abierto involucrarse en el campo de la inteligencia artificial?" } },
  { id: "hardware-modelos-inteligencia-artificial", text: "¿Qué tipo de hardware se utiliza para entrenar y ejecutar modelos de inteligencia artificial? ¿Qué papel desempeñan las supercomputadoras en estos procesos?", order: 6, video: { url: "https://youtu.be/phE_UsJmWlI", title: "¿Qué tipo de hardware se utiliza para entrenar y ejecutar modelos de inteligencia artificial? ¿Qué papel desempeñan las supercomputadoras en estos procesos?" } },
  { id: "crecimiento-profesional", text: "Para crecer profesionalmente, ¿qué les ha funcionado mejor: permanecer en una empresa y buscar ascender o cambiar de empresa para acceder a nuevas oportunidades?", order: 7, video: { url: "https://youtu.be/13eq_416GAE", title: "Para crecer profesionalmente, ¿qué les ha funcionado mejor: permanecer en una empresa y buscar ascender o cambiar de empresa para acceder a nuevas oportunidades?" } },
  { id: "freelance-estabilidad-economica", text: "Para quienes trabajan como freelancers o tienen un emprendimiento, ¿cómo han enfrentado el miedo a la inestabilidad económica? ¿Cómo equilibran la búsqueda de estabilidad con el deseo de dedicarse a lo que les gusta?", order: 8, video: { url: "https://youtu.be/sqxwxjD9v3w", title: "Para quienes trabajan como freelancers o tienen un emprendimiento, ¿cómo han enfrentado el miedo a la inestabilidad económica? ¿Cómo equilibran la búsqueda de estabilidad con el deseo de dedicarse a lo que les gusta?" } },
  { id: "proyectos-codigo-abierto", text: "¿Han participado en proyectos de código abierto (open source)? ¿Cómo fue su experiencia y qué aprendizajes les dejó?", order: 9, video: { url: "https://youtu.be/6WcAyI_HpYs", title: "¿Han participado en proyectos de código abierto (open source)? ¿Cómo fue su experiencia y qué aprendizajes les dejó?" } },
  { id: "consejo-inicio-carrera-tecnologia", text: "¿Qué consejo les gustaría compartir con quienes están comenzando su carrera en tecnología?", order: 10, video: { url: "https://youtu.be/Hl9lBGbTbmw", title: "¿Qué consejo les gustaría compartir con quienes están comenzando su carrera en tecnología?" } },
];
export const alumni: AlumniRecord[] = [
  { id: "pablo-aguilar", slug: "pablo-aguilar", name: "Pablo Aguilar", field: "Software", role: "Software Engineer en Waymo", location: "California, Estados Unidos", presentationVideo: { url: "https://youtu.be/5nJfk1ZtXLI", title: "Presentación de Pablo Aguilar" }, presentationOrder: 8, linkedinUrl: "https://www.linkedin.com/in/pablo-aguilar-a6649538/" },
  { id: "alan-diaz", slug: "alan-diaz", name: "Alan Díaz", field: "Investigación", role: "Investigador en Nathan S. Kline Institute for Psychiatric Research", location: "Nueva York, Estados Unidos", presentationVideo: { url: "https://youtu.be/K2as0jq2Hcg", title: "Presentación de Alan Díaz" }, presentationOrder: 4, linkedinUrl: "https://www.linkedin.com/in/alan-diaz/" },
  { id: "guillermo-magdaleno", slug: "guillermo-magdaleno", name: "Guillermo Magdaleno", field: "Software", role: "Software Engineer en Google", location: "San Francisco, Estados Unidos", presentationVideo: { url: "https://youtu.be/PnHixN7zAhI", title: "Presentación de Guillermo Magdaleno" }, presentationOrder: 5, linkedinUrl: "https://www.linkedin.com/in/gmomagdaleno/" },
  { id: "celia-marquez", slug: "celia-marquez", name: "Celia Márquez", field: "Software", role: "Software Engineer en Meta", location: "Los Ángeles, Estados Unidos", presentationVideo: { url: "https://youtu.be/Vd-tRDC0gm4", title: "Presentación de Celia Márquez" }, presentationOrder: 9, linkedinUrl: "https://www.linkedin.com/in/celiamarquez/" },
  { id: "angelica-arteaga", slug: "angelica-arteaga", name: "Angélica Arteaga", field: "Emprendimiento", role: "Emprendimiento en comercio electrónico de joyería en plata", location: "Presencia internacional", presentationVideo: { url: "https://youtu.be/PJ9rLkwFZdc", title: "Presentación de Angélica Arteaga" }, presentationOrder: 2 },
  { id: "rafael-escoto", slug: "rafael-escoto", name: "Rafael Escoto", field: "Datos e IA", role: "Sr. Architect en Data + AI, Slalom Build", location: "Alemania", presentationVideo: { url: "https://youtu.be/joug8i4hHnA", title: "Presentación de Rafael Escoto" }, presentationOrder: 7, linkedinUrl: "https://www.linkedin.com/in/raescoto/" },
  { id: "fernando-mora", slug: "fernando-mora", name: "Fernando Mora", field: "Software", role: "Sr. Software Engineer en Zillow", location: "Guadalajara, México", linkedinUrl: "https://www.linkedin.com/in/fernando-mora-92983b107/" },
  { id: "francisco-echeverria", slug: "francisco-echeverria", name: "Francisco Echeverría", field: "Software", role: "Sr. Software Engineer en Dexcom", location: "San Diego, Estados Unidos", presentationVideo: { url: "https://youtu.be/UBAmw-LwNmo", title: "Presentación de Francisco Echeverría" }, presentationOrder: 3, linkedinUrl: "https://www.linkedin.com/in/francisco-ruiz-echeverria-b95031a2/" },
  { id: "luciano-melendrez", slug: "luciano-melendrez", name: "Luciano Melendrez", field: "Datos", role: "Sr. Data Engineer en PetSmart", location: "Phoenix, Estados Unidos", presentationVideo: { url: "https://youtu.be/pIKSWy5VS2Y", title: "Presentación de Luciano Melendrez" }, presentationOrder: 6, linkedinUrl: "https://www.linkedin.com/in/luciano-melendrez-3a9b1682/" },
  { id: "edwin-salinas", slug: "edwin-salinas", name: "Edwin Salinas", field: "Software", role: "Sr. BackEnd Developer en Oshi Health", location: "Remoto desde México para Estados Unidos", linkedinUrl: "https://www.linkedin.com/in/edwin-salinas-licea-20149431/" },
  { id: "mariela-castillo", slug: "mariela-castillo", name: "Mariela Castillo", field: "Software", role: "iOS Developer en Structured", location: "Alemania", presentationVideo: { url: "https://youtu.be/OX2c-es3TKI", title: "Presentación de Mariela Castillo" }, presentationOrder: 1, linkedinUrl: "https://www.linkedin.com/in/marielacastilloc/" },
];
export const graduateSource = { url: "https://www.cetys.mx/noticias/egresados-de-ciencias-computacionales-cetys-inspiran-con-su-experiencia-global-durante-panel-conectando-saberes/", referenceDate: "28 de mayo de 2025" };

export type Achievement = { id: string; title: string; since?: number; description: string; relatedId?: string; source?: string };
export const achievements: Achievement[] = [
  { id: "nasa-space-apps", title: "NASA Space Apps", since: 2025, description: "Sede desde 2025. Una experiencia local de colaboración en torno a retos y recursos abiertos de NASA." },
  { id: "icpc", title: "ICPC", since: 2026, description: "Sede local desde 2026. La actividad de CETYS Mexicali se distingue de la Final Mexicana ICPC, cuya sede nacional cambia según el calendario oficial." },
  { id: "icc-awards", title: "ICC Awards", since: 2025, description: "Desde 2025. Un espacio de reconocimiento a nuestra comunidad. Categorías, personas y materiales se incorporarán cuando estén confirmados.", relatedId: "dia-del-icc" },
  { id: "dia-del-icc", title: "Día del ICC", since: 2024, description: "Desde 2024. Un encuentro de estudiantes, docentes, egresados y aliados para compartir experiencias y fortalecer la comunidad." },
  { id: "hackfox", title: "HackFox", since: 2025, description: "Desde 2025 con MiniHackFox, como continuación del Día del ICC; en 2026 continuó con la edición estatal de HackFox." },
  { id: "cacei", title: "Acreditación CACEI", description: "La acreditación evalúa la calidad académica de programas de ingeniería y orienta la mejora continua de la formación." },
];

export const communitySpaces = [
  { id: "foxcoding", title: "FoxCoding", description: "Una comunidad estudiantil para desarrollar proyectos, competir y aprender en equipo.", href: "/foxcoding" },
  { id: "dnd", title: "Club de D&D", description: "Un espacio de intereses compartidos que favorece la convivencia, la colaboración y la pertenencia." },
  { id: "research", title: "Investigación", description: "Las visitas académicas acercan a estudiantes a especialistas y áreas como visión artificial y aprendizaje profundo.", href: "/ser-icc" },
  { id: "culture", title: "Participación cultural", description: "La música y las actividades culturales amplían las formas de expresión y conexión dentro de la comunidad CETYS." },
];

export type CommunityVideoGroupId = "cultural" | "academic" | "international";
export type CommunityVideoRecord = { id: string; title: string; category: string; groupId: CommunityVideoGroupId; url: string; aspectRatio?: string };
export const communityVideoGroups: { id: CommunityVideoGroupId; title: string }[] = [
  { id: "cultural", title: "Actividades culturales" },
  { id: "academic", title: "Equipos académicos y clubes" },
  { id: "international", title: "Experiencias internacionales" },
];
export const communityVideos: CommunityVideoRecord[] = [
  { id: "voces-al-aire", title: "Coro Voces al Aire", category: "Cultura", groupId: "cultural", url: "https://www.youtube.com/shorts/jOyURrtA35g", aspectRatio: "9 / 16" },
  { id: "contra-tiempo", title: "Orquesta Contra Tiempo", category: "Cultura", groupId: "cultural", url: "https://www.youtube.com/shorts/GSxbNwS_M-U", aspectRatio: "9 / 16" },
  { id: "seafox-inventive", title: "SEAFOX Inventive", category: "Equipo académico", groupId: "academic", url: "https://www.youtube.com/shorts/kj1d6cAMryI", aspectRatio: "9 / 16" },
  { id: "foxdev", title: "FoxDev", category: "Clubes", groupId: "academic", url: "https://www.youtube.com/shorts/GIgtFliY1vQ", aspectRatio: "9 / 16" },
  { id: "doble-grado-gabriel-pereira", title: "Doble Grado: experiencia de Gabriel Pereira en Seattle", category: "Experiencia internacional", groupId: "international", url: "https://www.youtube.com/watch?v=YQYueLcLP7Q", aspectRatio: "16 / 9" },
];

export const podcast = { title: "Rompiendo mitos: los hackathons también son para ti", series: "VoCETYS Podcast", videoId: "hNtyxWO8hxk", url: "https://www.youtube.com/watch?v=hNtyxWO8hxk", description: "Conoce otra perspectiva sobre los hackatones y descubre cómo acercarte a estas experiencias de aprendizaje y colaboración.", image: "https://i.ytimg.com/vi/hNtyxWO8hxk/hqdefault.jpg" };

export const homeVideo: VideoResource = { url: "https://www.youtube.com/shorts/LFacAyTU958", title: "Encontré mi camino en CETYS Universidad | Abraham Saldivar comparte su historia" };
export const foxcodingVideo: VideoResource = { url: "https://www.youtube.com/shorts/Wo4i2DjY-Xo", title: "Fox Coding: Talento CETYS que programa el futuro" };
export type FoxCodingWorkRecord = { title: string; category: string; description?: string; url?: string; repo?: string; organizationUrl?: string; scopeNote?: string };
export const foxcodingWork: FoxCodingWorkRecord[] = [
  { title: "Gente por los Animales", category: "Colaboración", organizationUrl: "https://www.genteporlosanimales.org/", scopeNote: "FoxCoding documenta una colaboración con la organización; el alcance específico de las actividades aún está pendiente de confirmar." },
];
export const studentClips: StudentClip[] = [
  { name: "Testimonio de Paola", topic: "Experiencia estudiantil", video: { url: "https://youtu.be/Od5hRAJuSqw", title: "Testimonio de Paola", aspectRatio: "16 / 9" }, published: true },
  { name: "Testimonio de Brissa", topic: "Experiencia estudiantil", video: { url: "https://youtube.com/shorts/9wj5XPZE66o", title: "Testimonio de Brissa", aspectRatio: "9 / 16" }, published: true },
  { name: "Testimonio de Anahí", topic: "Experiencia estudiantil", video: { url: "https://youtube.com/shorts/lkyHCv1iuIE", title: "Testimonio de Anahí", aspectRatio: "9 / 16" }, published: true },
  { name: "Experiencias de estudiantes ICC", topic: "Experiencia estudiantil", video: { url: "https://youtube.com/shorts/6ee4u77RAIQ", title: "Experiencias de estudiantes ICC", aspectRatio: "9 / 16" }, published: true },
];
export const hackathonShowcase: { title: string; video?: VideoResource; sourceUrl: string } = {
  title: "Lo que construimos en los hackatones",
  sourceUrl: "https://canva.link/9r6i1lrmufyqx2o",
};
export const programStrengths = [
  { title: "Acreditación CACEI", text: "El programa cuenta con acreditación CACEI, un marco de evaluación y mejora continua de la formación." },
  { title: "Preparación para el EGEL", text: "La preparación puede incluir cursos de repaso, recursos académicos y seguimiento del aprendizaje. La presentación documenta reconocimientos CENEVAL de personas egresadas, no un resultado general para todas las generaciones." },
  { title: "Investigación y CICESE", text: "Las visitas académicas han acercado a estudiantes a especialistas y a temas como visión artificial, aprendizaje profundo e investigación." },
  { title: "Vinculación con la industria", text: "Conecta lo que aprendes en clase con retos del entorno profesional mediante proyectos y experiencias con la industria." },
  { title: "Nube y AWS Academy", text: "Hay oportunidades de aprendizaje en tecnologías de nube. Las actividades realizadas se distinguen de la ruta curricular propuesta; no se atribuyen certificaciones a todo el estudiantado." },
  { title: "Portafolio y colaboración", text: "Proyecto Destacado y experiencias interdisciplinarias permiten desarrollar y compartir propuestas propias." },
];