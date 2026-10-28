# ICC CETYS Mexicali

Sitio público de Ingeniería en Ciencias Computacionales de CETYS Universidad, Campus Mexicali. El contenido público se mantiene independiente de VOCETYS; las notas completas permanecen en sus fuentes originales.

## Requisitos y comandos

Requiere Node.js 20.9 o posterior y npm.

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>. Para verificar o ejecutar la versión de producción:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

En PowerShell de Windows puede ser necesario invocar `npm.cmd` y `npx.cmd` si la política local bloquea los scripts `.ps1`.

## Contenidos

Los registros tipados están en `app/content.ts`:

- `siteConfig`: contactos, enlaces oficiales y franja ExpoCETYS. Cambia `expoBanner.enabled` para ocultarla; actualiza su texto, enlace o etiqueta para editarla.
- `projects`: nombre, problema, solución, integrantes con semestre individual opcional, semestre/periodo de desarrollo, tipo, área, tecnologías, recursos, enlaces y fuente. Las portadas tipográficas no representan capturas del producto; al agregar `screenshot` se usa primero la captura real. Los slugs crean `/proyectos/[slug]`.
- `allEvents`: eventos históricos y próximos, videos opcionales, enlaces de registro, fechas confirmadas y fechas propuestas. Las fechas sugeridas para Día del ICC y Space Apps se muestran como pendientes hasta confirmar la sede local.
- `news`: resumen editorial, fecha de publicación, categoría, campus, imagen, enlace original y `relatedIds` para vincular proyectos, eventos o logros.
- `studentClips`: clips de alumnas con nombre, semestre, tema, video, portada, subtítulos, cita y aprobación. Solo aparecen registros publicados que tengan video.
- `alumni`, `graduateSource`, `achievements`, `podcast`, `programStrengths` y `multimediaCategories`: trayectorias con fecha de referencia, LinkedIn opcional, hitos de comunidad y contenidos agrupados.

Cada colección debe marcar de forma explícita `published` cuando aplique. Las noticias candidatas no se importan automáticamente a la navegación pública.

## Imágenes, videos y clips

Guarda recursos propios en `public/images/` y usa rutas como `/images/mi-foto.webp`. Describe la imagen con texto alternativo útil; usa `alt=""` si es decorativa. Las imágenes remotas autorizadas para el componente `next/image` se configuran en `next.config.ts`.

No se encontró el adjunto `4.png` en el workspace. La página de FoxCoding usa el logotipo que su sitio oficial sirve actualmente; reemplázalo por el archivo autorizado en `public/images/foxcoding.png` cuando esté disponible, manteniendo su composición y colores sobre fondo oscuro. No se creó un logotipo de ICC ni un escudo.

`VideoPlayer` admite URLs de YouTube (incluidos Shorts) y archivos locales, respeta la proporción indicada y monta el reproductor solo tras una interacción. Añade subtítulos de archivo cuando estén disponibles. Los enlaces a YouTube abren en otra pestaña. Para que un video o clip aparezca, proporciona URL, título accesible y aprobación editorial.

## Material pendiente

- Clips autorizados de alumnas, con nombres, temas y subtítulos/citas solo cuando estén confirmados.
- Capturas reales de ViaLibre, Parasoles inteligentes y Under the Lake; los gráficos tipográficos actuales describen la solución y no simulan pantallas de producto.
- URL del recopilatorio de hackatones, demostraciones de proyectos y videos por evento.
- URL de LinkedIn verificadas por cada egresado, y materiales/categorías/personas reconocidas de ICC Awards.
- Fecha, sede, registro y papel de CETYS Mexicali para Día del ICC y NASA Space Apps. Las fechas del 12 y 14–15 de noviembre de 2026 provienen de la presentación referida y siguen pendientes de confirmación.
- La presentación `Presentacion_Evolucion_ICC_2024-2_2026-2_sin_fotos(1).pptx` no está en el workspace. El enlace de Canva permite leer la portada “Logros y actividades · 2025-2”, pero no fue posible extraer las diapositivas ni sus datos de proyectos; por eso no se añadieron nombres ni datos de ese material.
- El adjunto `4.png` de FoxCoding no está en el workspace. La página conserva el logotipo que su sitio oficial sirve actualmente, en un lugar secundario.
- Dominio oficial de producción para ajustar `metadataBase` en `app/layout.tsx`.

## Sincronización de noticias

Ejecuta manualmente:

```bash
npm run sync
```

`data/news-catalog.json` es la fuente única para `/noticias` y el bloque de noticias del home. Contiene exactamente las 21 URL seleccionadas editorialmente; no se rastrean etiquetas ni se agregan publicaciones nuevas. El sincronizador actualiza título, fecha real, imagen destacada y URL canónica desde la API REST de VOCETYS, y conserva resumen, categoría y etiqueta editorial.

Las URL canónicas se deduplican y se verifica que sigan siendo 21 antes de escribir. Si una fuente no responde o devuelve metadatos incompletos, el artículo y su enlace permanecen en el catálogo; `metadataPending`, `metadataNote` y `syncError` documentan lo que falta o falló. Revisa esos campos antes de afirmar que los metadatos cambiaron. No se publica automáticamente ningún otro artículo.

`data/news-registry.json` puede existir como registro generado de una sincronización anterior; ya no se usa para la selección pública ni para el comando `sync`.

## Recursos pendientes

- Recursos audiovisuales y datos listados en “Material pendiente”.
- Fecha, ubicación y papel exacto de CETYS Mexicali para las sedes locales de NASA Space Apps 2026 e ICPC.
- Dominio oficial de producción para ajustar `metadataBase` en `app/layout.tsx`.
