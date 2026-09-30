---
component: Tag
tab: Uso
summary: Una etiqueta corta que clasifica, filtra o muestra un estado.
---


## Resumen

`Tag` pone una palabra o dos sobre un color para clasificar algo, mostrar un filtro aplicado o prender y apagar un filtro. Es el *tag* de Carbon.

### Cuándo usarla
- Mostrar una categoría o un estado: «Pagado», «Interurbano».
- Mostrar filtros aplicados que se pueden quitar.
- Ofrecer pocos filtros frecuentes que se prenden y apagan.

### Cuándo no usarla
- **Para una acción:** `Button`.
- **Para un estado del sistema que exige atención:** `InlineNotification`.
- **Para navegar:** `Link`.

## Tipos

| Tipo | Propiedad | Uso |
|---|---|---|
| Solo lectura | — | Un estado o una categoría. |
| Se puede quitar | `onRemove` | Filtros aplicados; elecciones de un `Combobox` múltiple. |
| Seleccionable | `onClick` + `selected` | Filtros que se prenden y apagan. Al elegirla, muestra un check (en lugar de su ícono), un borde de 2 px y el texto en Medium. |

## Anatomía

1. **Contenedor** con esquinas `radius-tag`, con el color de la etiqueta.
2. **Ícono** (opcional).
3. **Texto.**
4. **Quitar** (opcional).

![Los tres tipos de Tag (de lectura, que se quita y que se elige) y la paleta de once colores, de rojo a gris frío.](assets/Componentes/tag-tipos.png)

## Colores

Once colores de la paleta secundaria: `red`, `yellow`, `magenta`, `purple`, `blue`, `cyan`, `teal`, `green`, `warmgray`, `gray` (por defecto) y `coolgray`.

- El color agrupa; **la palabra informa**. «Pagado» en verde no dice más que «Pagado».
- Usa el mismo color para la misma categoría en toda la app.

## Tamaños

| Tamaño | Alto | Uso |
|---|---|---|
| Por defecto | 32 px | Junto a contenido. |
| `sm` | 24 px | Dentro de campos (`Combobox`). |

## Contenido

- Una o dos palabras, con mayúscula solo al inicio.
- Un texto largo se corta con puntos suspensivos: evítalo.

## Comportamiento

- Las seleccionables se agrupan en una fila, con 16 px entre filas para que sus áreas de toque no se pisen.
- Quitar una etiqueta la saca al instante; si el filtro era importante, ofrece deshacer.

## Relacionados

`Combobox` · `SearchField` · `SegmentedControl` · Búsqueda y filtros.

## Referencias

- IBM, Carbon Design System: Tag.
