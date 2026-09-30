---
component: ProgressIndicator
tab: Estilo
summary: Especificaciones visuales del indicador de pasos.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Línea (pendiente) | color | `progress-indicator-line` |
| Línea (completado) | color | `progress-indicator-line-complete` |
| Línea (actual) | color | `progress-indicator-current` |
| Ícono (pendiente) | color | `progress-indicator-incomplete` |
| Ícono (completado) | color | `progress-indicator-complete` |
| Ícono (actual) | color | `progress-indicator-current` |
| Ícono (error) | color | `progress-indicator-error` |
| Nombre | color del texto | `text-01` (Medium en el actual) |
| Descripción | color del texto | `text-02` |
| Paso:focus | contorno | `focus` (2 px, separado 2 px) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Nombre | 14 / 0,875 | `font-weight-body`; `font-weight-emphasis` en el actual |
| Descripción | 12 / 0,75 | `font-weight-body` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Pasos | separación | 2 px |
| Paso (horizontal) | ancho mínimo | 128 px (8 rem) |
| Línea | grosor | 2 px |
| Ícono | tamaño | 16 px (`icon-size-sm`) |
| Ícono y texto | separación | 16 px, igual al ícono |
| Paso | alto mínimo | 44 px |

![Medidas de ProgressIndicator: tamaño del ícono de cada paso, separación entre ícono y texto, y línea entre pasos.](assets/Componentes/progress-indicator-medidas.png)

## Contraste

Íconos y líneas a 3:1; textos a 4,5:1, en los cuatro temas.
