---
component: DatePicker
tab: Estilo
summary: Especificaciones visuales del selector de fecha.
---


## Color

El campo usa los tokens de `TextInput` (`field-*`). El calendario:

| Elemento | Propiedad | Token |
|---|---|---|
| Calendario | fondo / borde / sombra | `popover-bg` / `popover-border` / `shadow-floating` |
| Mes | color del texto | `text-01` |
| Días de la semana | color del texto | `text-02` |
| Día | color del texto | `text-01` |
| Día:hover | fondo | `date-picker-day-bg-hover` |
| Día de otro mes | color del texto | `date-picker-day-outside-text` |
| Hoy | anillo (1 px, por dentro) | `date-picker-day-today-border` |
| Día elegido | fondo / texto | `date-picker-day-selected-bg` / `date-picker-day-selected-text` |
| Día fuera de rango | color, tachado | `disabled-03` |
| Día:focus | contorno | `focus` (2 px, por dentro) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Mes | 14 / 0,875 | Medium / 500 |
| Días de la semana | 11 / 0,6875 | Regular / 400 |
| Día | 14 / 0,875 | Regular / 400; Medium / 500 el elegido |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Calendario | ancho | 352 px (22 rem), como máximo el ancho de la pantalla − 32 px |
| Calendario | relleno, radio | 16 px, `radius-panel` |
| Calendario | separación del campo | 8 px |
| Día | alto, radio | 44 px, `radius-pill` |

> **Imagen pendiente:** anatomía acotada del calendario.

## Capas

El calendario está en `z-dropdown`.

## Contraste

Días a 4,5:1; el elegido a 4,5:1 sobre `interactive-01`; el anillo de hoy a 3:1, en los cuatro temas.
