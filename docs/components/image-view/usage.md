---
component: ImageView
tab: Uso
summary: Una imagen que guarda su lugar mientras llega, y muestra algo si no llega.
---


## Resumen

`ImageView` muestra una imagen con su proporción reservada: nada salta cuando carga. Si no carga, lo dice. Es la *image view* de Apple.

## Cuándo usarla

- Para toda imagen de contenido: una foto, un mapa, una ilustración.

## Cuándo no

- Para un ícono: `Icon`. Para un dibujo de la entidad: `Pictogram`.
- Para una imagen de adorno que no informa: va de fondo, sin texto alternativo.

## Estados

| Estado | Qué se ve |
|---|---|
| **En espera** | El lugar de la imagen, en `ui-03`. |
| **Cargada** | La imagen. |
| **No cargó** | Un ícono y «No se pudo cargar». El lugar no se pierde. |

## Reglas

- **Siempre con su proporción** (`ratio`). Sin ella, la página salta al cargar.
- **Sin texto encima.** Si hace falta un rótulo, va debajo, como pie.
- **No la deformes:** se recorta para llenar su lugar (`cover`) o se muestra entera (`contain`).
- **Una imagen generada lleva la marca de IA** en la esquina inferior izquierda (`ai`), y su texto alternativo empieza con «Imagen generada:».

## Relacionados

`Card` · `Collection` · `AILabel` · `Skeleton` · Interfaces de IA.

## Referencias

- Apple, Human Interface Guidelines: Image views.
