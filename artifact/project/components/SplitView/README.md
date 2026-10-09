# SplitView

Una lista y su detalle, lado a lado, con un divisor que se mueve.


## Uso

### Resumen

`SplitView` pone una lista y el detalle de lo elegido uno junto al otro. Es la *split view* de Apple.

### Cuándo usarlo

- Cuando se pasa seguido de un ítem a otro: correos, viajes, ajustes.
- Dentro de una `Window`, o como estructura de una pantalla ancha.

### Cuándo no

- Si el detalle es toda la tarea: ábrelo en su propia vista.
- Con más de tres paneles. Dos es lo normal; el tercero es un inspector.

### Cómo se comporta

- **El divisor se mueve** arrastrándolo o con las flechas, entre un ancho mínimo y uno máximo.
- **La lista marca lo elegido** y lo mantiene marcado: dice dónde estás. Usa `List` con `selection: 'single'`.
- **Angosto** (menos de 672 px), muestra un panel a la vez: la lista, y al elegir, el detalle con «Volver».
- **Lo importante va al inicio:** la lista a la izquierda, el detalle a la derecha.

### Relacionados

`List` · `Window` · `Sidebar` · `ColumnView` · Diseño adaptable.

### Referencias

- Apple, Human Interface Guidelines: Split views.

## Estilo

### Color y estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Panel de la lista | fondo | `ui-01` |
| Panel del detalle | fondo | `ui-02` |
| Divisor | color | `border-subtle`; `interactive-01` bajo el cursor o con el foco |
| Divisor | ancho | 1 px a la vista, 9 px para tocar |
| Lista | ancho | 280 px; entre 200 y 480 |
| Borde y radio | — | `border-subtle` y `radius-panel` |
| Cambio a un panel | ancho | Menos de 672 px |

## Código

### Uso

```js
h(SplitView, {
  primaryLabel: 'Mis viajes', detailLabel: 'Detalle del viaje',
  primary: h(List, { selection: 'single', selected: id, onSelect: elegir, items: viajes }),
  detail: detalle,
  showDetail: viendo, onBack: volver
})
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `primary`, `detail` | contenido | — | Los dos paneles. |
| `primaryLabel`, `detailLabel` | texto | «Lista», «Detalle» | Sus nombres. |
| `defaultWidth`, `minWidth`, `maxWidth` | número | 280, 200, 480 | El ancho de la lista, en px. |
| `showDetail` | sí o no | no | Angosto: muestra el detalle en vez de la lista. |
| `onBack`, `backLabel` | función, texto | —, «Volver» | Angosto: el botón para volver a la lista. |

## Accesibilidad

### Qué ofrece ALMA

- **Cada panel es una región con nombre.**
- **El divisor es un separador que se opera con el teclado** y dice su ancho.
- **Angosto, el panel que no se ve no existe** para el teclado ni para un lector.

### Teclado

| Tecla | Qué hace |
|---|---|
| ← → | En el divisor: angosta o ensancha la lista, de a 16 px. |
| Inicio, Fin | El ancho mínimo o el máximo. |

### En tus manos

- Al elegir un ítem en pantalla angosta, lleva el foco al detalle; al volver, a la fila de la que se salió.

Pendiente: VoiceOver y NVDA.
