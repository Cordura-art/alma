# ColumnView

Una jerarquía con cada nivel abierto en su propia columna.


## Uso

### Resumen

`ColumnView` muestra la misma jerarquía que un `Outline`, pero con cada nivel en su columna: el camino recorrido queda a la vista. Es la *column view* de Apple.

### Cuándo usarla

- Para jerarquías profundas, donde importa ver por dónde se vino.
- Para explorar archivos o categorías con muchos niveles.

### Cuándo no

- Con dos niveles: `SplitView`.
- En pantalla angosta: no caben las columnas. Usa una `List` que avanza y vuelve.

### Reglas

- **Lo elegido en cada columna queda marcado:** es el camino.
- **Lo que tiene adentro lleva flecha.**
- **Las columnas miden lo mismo.** Si no caben, se desplaza hacia el lado y la última queda a la vista.
- **La última columna puede ser el detalle** de lo elegido.

### Relacionados

`Outline` · `SplitView` · `Breadcrumb` · `List`.

### Referencias

- Apple, Human Interface Guidelines: Column views.

## Estilo

### Color y estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Fondo | — | `ui-01` |
| Fila elegida | fondo | `hover-ui`, con peso en el texto |
| Entre columnas | línea | `border-subtle` |
| Columna | ancho | 14 rem |
| Fila | alto | El de un control |
| Fila | radio | `radius-nav` |
| Borde y radio | — | `border-subtle` y `radius-panel` |

## Código

### Uso

```js
h(ColumnView, { label: 'Mi cuenta', items: arbol, path: camino, onPathChange: setCamino, onOpen: abrir })
```

### Propiedades

| Propiedad | Tipo | Uso |
|---|---|---|
| `items` | `[{ id, label, icon, children }]` | El árbol. |
| `label` | texto | Su nombre. |
| `path`, `defaultPath`, `onPathChange` | lista de `id` | Lo elegido en cada columna. |
| `onOpen` | función | Recibe el ítem final al elegirlo. |

## Accesibilidad

### Qué ofrece ALMA

- **Cada columna es una lista de opciones con el nombre de lo que la abrió.**
- **Lo elegido en cada columna se anuncia como elegido.**
- **Al entrar a una columna, el foco va a su primera fila;** al volver, a la que estaba elegida.

### Teclado

| Tecla | Qué hace |
|---|---|
| ↓ ↑ | Fila siguiente o anterior. |
| Enter, Espacio | Elige, y entra a su columna si tiene. |
| → | Entra a la columna siguiente. |
| ← | Vuelve a la anterior. |

Pendiente: VoiceOver y NVDA.
