# Accesibilidad

El piso de ALMA es WCAG 2.2 AA en los cuatro temas, con foco visible, teclado y movimiento reducido.


## Resumen

### El piso

Todo lo que se hace con ALMA cumple **WCAG 2.2 nivel AA** en los cuatro temas, y además:

- **Foco visible** en todo control, con el token `focus`.
- **Teclado completo:** todo lo que se hace con el mouse se hace con el teclado.
- **Movimiento reducido:** si la persona lo pide, ALMA no anima nada.
- **Área de toque de 44 px** (el mínimo de Apple), por encima de los 24 px de WCAG 2.2.
- **Texto escalable al 200 %** sin que nada se recorte.
- Temas de **alto contraste** con texto a 7:1.

### Qué resuelve ALMA y qué resuelves tú

| ALMA resuelve | Tú resuelves |
|---|---|
| Roles, estados y nombres de cada componente (patrones WAI-ARIA). | Que cada campo, botón de ícono y tabla tenga su nombre. |
| El teclado dentro de cada componente. | El orden de la página y a dónde va el foco al cambiar de vista. |
| El contraste de sus colores en los cuatro temas. | No inventar colores y no poner texto sobre imágenes sin velo. |
| El foco atrapado y devuelto en modales. | No abrir diálogos sin que la persona lo pida. |
| El movimiento reducido en todos sus componentes. | Respetarlo en tus propias animaciones. |

### Cómo se verifica

- **axe** en cada componente, en los cuatro temas, y en cada página del sitio de documentación.
- **Contraste:** `npm test` revisa 580 pares de color en los cuatro temas.
- **Teclado:** probado a mano en cada componente.
- **Pendiente:** pruebas con VoiceOver, NVDA y TalkBack reales. Hasta entonces, cada guía dice solo lo que se verificó.

## Color

### Contraste mínimo

| Qué | Oscuro y Claro | Alto contraste |
|---|---|---|
| Texto normal | 4,5:1 | 7:1 |
| Texto grande (24 px, o 19 px en negrita) | 3:1 | 4,5:1 |
| Bordes de controles, anillo de foco, íconos que informan | 3:1 | 3:1 |
| Texto desactivado | Exento | Exento |

Los tokens de ALMA ya cumplen estos mínimos sobre las superficies que su nota indica. Si combinas colores fuera de esas notas, mide.

### Nunca solo color

- Los estados (error, éxito, advertencia, información) llevan palabra o ícono.
- Los gráficos rotulan sus series o usan forma o trama, además del color.
- Lo elegido se distingue también por forma: el indicador de las pestañas, el ícono relleno de la navegación, la casilla marcada.
- Los enlaces dentro de un texto van subrayados.

### Texto sobre imágenes

Pon un velo (`tint-dark-*` o `tint-white-*`) entre la imagen y el texto, y mide el contraste en la parte más clara de la imagen.

### Alto contraste

Los temas `dark-hc` y `light-hc` se activan solos si la persona pide más contraste en su sistema (con `applyTheme()`). Prueba cada pantalla nueva también en ellos.

## Teclado

### Reglas

- Todo lo interactivo se alcanza con Tab, en el orden en que se lee.
- El foco siempre se ve.
- Nada atrapa el foco, salvo un diálogo modal (y siempre se sale con Esc).
- Nada cambia de contexto solo por recibir el foco.

### Teclas de ALMA

| Tecla | Hace |
|---|---|
| Tab / Mayús+Tab | Pasa al control siguiente o anterior. |
| Enter | Activa botones y enlaces; envía formularios. |
| Espacio | Activa botones; marca casillas y switches. |
| Flechas | Se mueven dentro de un grupo: pestañas, radios, menús, calendario. |
| Inicio / Fin | Primera y última opción de un grupo. |
| Esc | Cierra menús, diálogos, popovers y tooltips. |

Cada guía de componente tiene su tabla de teclado en la pestaña **Accesibilidad**.

### Foco al cambiar de vista

- Al navegar a otra página, lleva el foco a su título (`h1`).
- Al abrir un diálogo, el foco entra; al cerrarlo, vuelve al botón que lo abrió (ALMA lo hace).
- Al borrar un elemento de una lista, lleva el foco al siguiente, o al anterior si era el último.
- Ofrece «Saltar al contenido» como primer enlace de la página.

## Desarrollo

### Nombres

- Todo control necesita un nombre: su etiqueta visible o, si no la tiene, `aria-label` (botones de ícono, casillas de tabla).
- Si hay dos regiones del mismo tipo (dos `nav`, dos buscadores), dale a cada una un nombre distinto.
- Toda tabla necesita un nombre: `title` o `caption`.

### Estructura

- Un solo `h1` por página, y los encabezados en orden, sin saltar niveles. `headingLevel` ajusta el nivel en `Accordion`, `Card`, `EmptyState`, `List` y `Table`.
- Regiones: `header`, `nav`, `main` y `footer` para la página; no los uses dentro de componentes.
- Declara el idioma: `<html lang="es">`.

### Anuncios

- Los resultados que aparecen después de cargar se anuncian con `role="status"` (sin urgencia) o `role="alert"` (urgente). `InlineNotification`, `toast` y `Pagination` ya lo hacen.
- No muevas el foco para anunciar algo: usa estas regiones.

### Probar

1. Recorre la pantalla solo con el teclado.
2. Pasa axe en los cuatro temas.
3. Sube el texto al 200 % y mira que nada se recorte ni se desborde.
4. Activa el movimiento reducido.
5. Escucha la pantalla con un lector (VoiceOver en macOS e iOS, NVDA en Windows, TalkBack en Android).
