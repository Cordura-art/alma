# ImageView

Una imagen que guarda su lugar mientras llega, y muestra algo si no llega.


## Uso

### Resumen

`ImageView` muestra una imagen con su proporción reservada: nada salta cuando carga. Si no carga, lo dice. Es la *image view* de Apple.

### Cuándo usarla

- Para toda imagen de contenido: una foto, un mapa, una ilustración.

### Cuándo no

- Para un ícono: `Icon`. Para un dibujo de la entidad: `Pictogram`.
- Para una imagen de adorno que no informa: va de fondo, sin texto alternativo.

### Estados

| Estado | Qué se ve |
|---|---|
| **En espera** | El lugar de la imagen, en `ui-03`. |
| **Cargada** | La imagen. |
| **No cargó** | Un ícono y «No se pudo cargar». El lugar no se pierde. |

### Reglas

- **Siempre con su proporción** (`ratio`). Sin ella, la página salta al cargar.
- **Sin texto encima.** Si hace falta un rótulo, va debajo, como pie.
- **No la deformes:** se recorta para llenar su lugar (`cover`) o se muestra entera (`contain`).
- **Una imagen generada lleva la marca de IA** en la esquina inferior izquierda (`ai`), y su texto alternativo empieza con «Imagen generada:».

### Relacionados

`Card` · `Collection` · `AILabel` · `Skeleton` · Interfaces de IA.

### Referencias

- Apple, Human Interface Guidelines: Image views.

## Estilo

### Color y estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Lugar de la imagen | fondo | `ui-03` |
| Aviso de falla | color | `text-02`, con ícono de 24 px |
| Imagen | radio | `radius-panel` |
| Imagen | proporción | 4:3 (`ratio`) |
| Marca de IA | posición | A `space-8` de la esquina inferior izquierda |
| Pie | texto | 12 px, `text-02`, a `space-8` de la imagen |

## Código

### Uso

```js
h(ImageView, { src: foto, alt: 'Un cerro frente al mar, al atardecer', ratio: '16 / 9', caption: 'Viña del Mar' })

h(ImageView, { src: generada, alt: 'un cerro frente al mar', ai: true })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `src` | texto | — | La imagen. |
| `alt` | texto | — | Qué muestra. Vacío solo si es de adorno. |
| `ratio` | texto | `4 / 3` | La proporción. |
| `fit` | `cover`, `contain` | `cover` | Recortar para llenar, o mostrar entera. |
| `position` | texto | centro | Qué parte se conserva al recortar. |
| `caption` | texto | — | Un pie. |
| `ai` | sí o no, o las propiedades de `AILabel` | no | La marca de IA. |
| `lazy` | sí o no | sí | Carga la imagen cuando se acerca a la vista. |

## Accesibilidad

### Qué ofrece ALMA

- **El texto alternativo es de la imagen**, y una generada lo dice primero.
- **La espera y la falla se anuncian:** «Cargando imagen», «No se pudo cargar la imagen».
- **Si falla, el texto alternativo sigue ahí.**

### En tus manos

- Escribe en `alt` lo que la imagen aporta, no «imagen de».
- No pongas en una imagen un texto que solo esté ahí.

Pendiente: VoiceOver y NVDA.
