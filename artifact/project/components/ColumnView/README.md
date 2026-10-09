# ColumnView

Una jerarquía con cada nivel abierto en su propia columna.


## Uso

### Resumen

`ColumnView` muestra la misma jerarquía que un `Outline`, pero con cada nivel en su columna: el camino recorrido queda a la vista. Es la *column view* de Apple.

![ColumnView con tres columnas. En la primera, «Viajes» elegido entre «Viajes», «Medios de pago» y «Avisos». En la segunda, su contenido: «2026» elegido y «2025» con 14. En la tercera, lo que hay en 2026: «Marzo» con 2 y «Abril» con 3. Lo elegido en cada columna queda marcado y dice el camino.](assets/Componentes/column-view-ruta.png)

### Cómo se lee

- **Una columna por nivel.** Elegir algo en una columna abre su contenido en la siguiente.
- **Lo elegido queda marcado en cada columna:** el camino se lee de izquierda a derecha, sin migas de pan.
- **La flecha al final** dice que hay algo adentro. Lo que no la tiene es un final.
- **Un dato al final de la fila** (cuántos hay adentro), en texto secundario.
- **Si no caben todas,** las columnas se desplazan hacia el lado y la última elegida queda a la vista.

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
| `items` | `[{ id, label, icon, trailing, children }]` | El árbol. `trailing` es un dato corto al final de la fila, como cuántos hay adentro. |
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
