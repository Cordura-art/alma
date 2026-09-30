---
element: Espaciado y grilla
order: 3
tab: Grilla
summary: La escala de 8, la grilla responsive, la densidad y las capas.
---

## Grilla responsive

Mobile first: cada punto de quiebre aplica desde ese ancho hacia arriba. En el teléfono es la grilla de ALMA en Figma; desde tablet, el IBM 2x Grid.

| Punto de quiebre | Desde | Columnas | Margen | Separación |
|---|---|---|---|---|
| `bp-sm` | 320 px | 4, de 76 px | `grid-offset-mobile` 16 px | `grid-gutter-mobile` 8 px |
| `bp-md` | 672 px | 8 | `grid-margin` 16 px | `grid-gutter` 32 px |
| `bp-lg` | 1056 px | 16 | `grid-margin` 16 px | `grid-gutter` 32 px |
| `bp-xlg` | 1312 px | 16 | `grid-margin` 16 px | `grid-gutter` 32 px |
| `bp-max` | 1584 px | 16 | `grid-margin-max` 24 px | `grid-gutter` 32 px |

> **Imagen pendiente:** las columnas de la grilla sobre una pantalla en `bp-sm`, `bp-md` y `bp-lg`.

## Cómo usarla

- Alinea los bloques de contenido a las columnas; el texto de lectura, a un máximo de 48 rem aunque haya más columnas.
- `grid-gutter-condensed` (1 px) solo en mosaicos de imágenes y tablas de datos.
- Los componentes cambian de forma en los mismos cortes: `TabBar` en el teléfono y `Sidebar` desde `bp-lg`; `Sheet` abajo en el teléfono y centrada desde `bp-md`.

## Lo que cambia en cada corte

| Desde | Qué cambia en ALMA |
|---|---|
| 672 px (`bp-md`) | `Sheet` se centra; `TabBar` pone ícono y etiqueta en una fila; la `Toolbar` junta el buscador con el título. |
| 1056 px (`bp-lg`) | La navegación pasa de `TabBar` a `Sidebar`. |
