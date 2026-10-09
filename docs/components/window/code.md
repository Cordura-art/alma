---
component: Window
tab: Código
summary: Cómo usar Window en React.
---


## Uso

```js
const { Desktop, Window } = window.AlmaDS;

h(Desktop, { label: 'Escritorio' },
  h(Window, {
    title: 'Viajes',
    defaultPosition: { x: 40, y: 32 }, defaultSize: { w: 420, h: 360 },
    minimized: minimizada,
    onClose: cerrar, onMinimize: minimizar,
    bottomBar: '2 viajes'
  }, contenido))
```

La ventana guarda su lugar y su tamaño. Quién está abierta o minimizada lo decide tu app: `Window` avisa con `onClose` y `onMinimize`.

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | texto | — | El título. Obligatorio: es el nombre de la ventana. |
| `children` | contenido | — | El cuerpo. |
| `open` | sí o no | sí | Si existe. |
| `minimized` | sí o no | no | Si está minimizada. |
| `onClose` | función | — | Muestra el control de cerrar. |
| `onMinimize` | función | — | Muestra el control de minimizar. |
| `zoomable` | sí o no | sí | Con `false`, no se puede ampliar. |
| `resizable` | sí o no | sí | Con `false`, no cambia de tamaño. |
| `kind` | `panel`, `stage` | — | `panel`: menor y de vidrio. `stage`: la ventana de un asistente; ampliada y al frente, deja ver la luz del escritorio. |
| `defaultPosition` | `{ x, y }` | En cascada | Dónde aparece, en px desde la esquina del escritorio. |
| `defaultSize` | `{ w, h }` | 480 × 360 | Su tamaño inicial. |
| `minSize` | `{ w, h }` | 240 × 160 | El menor tamaño. |
| `defaultZoomed` | sí o no | no | Si aparece ampliada. |
| `frontKey` | cualquiera | — | Cuando cambia, la ventana pasa al frente. Para traerla desde el dock o un menú. |
| `onZoomChange` | función | — | Avisa con `true` cuando la ventana llena el escritorio (ampliada, o sola en una pantalla angosta) y con `false` cuando deja de hacerlo. |
| `onActiveChange` | función | — | Avisa con `true` cuando la ventana pasa al frente y con `false` cuando deja de estarlo o se oculta. |
| `toolbar` | contenido | — | Herramientas, al final de la barra. |
| `bottomBar` | contenido | — | El pie. |
| `onChange` | función | — | Recibe `{ x, y, w, h }` al mover o cambiar de tamaño. |
| `active` | sí o no | sí | Fuera de un `Desktop`: si se dibuja activa. |

## Fuera de un escritorio

Sin un `Desktop` alrededor, `Window` es una ventana quieta: ni se mueve ni cambia de tamaño. Sirve para mostrar una en un documento.
