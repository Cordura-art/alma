---
element: Accesibilidad
order: 1
tab: Desarrollo
summary: El piso de ALMA es WCAG 2.2 AA en los cuatro temas, con foco visible, teclado y movimiento reducido.
---

## Nombres

- Todo control necesita un nombre: su etiqueta visible o, si no la tiene, `aria-label` (botones de ícono, casillas de tabla).
- Si hay dos regiones del mismo tipo (dos `nav`, dos buscadores), dale a cada una un nombre distinto.
- Toda tabla necesita un nombre: `title` o `caption`.

## Estructura

- Un solo `h1` por página, y los encabezados en orden, sin saltar niveles. `headingLevel` ajusta el nivel en `Accordion`, `Card`, `EmptyState`, `List` y `Table`.
- Regiones: `header`, `nav`, `main` y `footer` para la página; no los uses dentro de componentes.
- Declara el idioma: `<html lang="es">`.

## Anuncios

- Los resultados que aparecen después de cargar se anuncian con `role="status"` (sin urgencia) o `role="alert"` (urgente). `InlineNotification`, `toast` y `Pagination` ya lo hacen.
- No muevas el foco para anunciar algo: usa estas regiones.

## Probar

1. Recorre la pantalla solo con el teclado.
2. Pasa axe en los cuatro temas.
3. Sube el texto al 200 % y mira que nada se recorte ni se desborde.
4. Activa el movimiento reducido.
5. Escucha la pantalla con un lector (VoiceOver en macOS e iOS, NVDA en Windows, TalkBack en Android).
