---
component: Stepper
tab: Estilo
summary: Especificaciones visuales del contador.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Botones y valor | fondo | `stepper-bg` |
| Botones y valor | borde (1 px) | `stepper-border` |
| Botón:hover | fondo | `stepper-bg-hover` |
| Botón desactivado | color del ícono | `disabled-03` |
| Valor | color del texto | `text-02` |
| Botón:focus | contorno | `focus` (2 px, separado 2 px) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Valor | 16 / 1 | `font-weight-body` | `web-label-l` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Elementos | separación | 24 px |
| Botones y valor | radio | `radius-button` |
| Botón | ancho mínimo | igual al alto |
| Valor | ancho mínimo | 130 px |
| Íconos (restar, sumar y el del valor) | tamaño | 16 px (`icon-size-sm`) |
| Ícono y número | separación | 16 px, igual al ícono |

![Medidas de Stepper: alto de 44 px de botones y valor, ancho de cada parte y radio.](assets/Componentes/stepper-medidas.png)

## Tamaño

| Densidad | Alto (px / rem) |
|---|---|
| Normal | 56 / 3,5 (`size-field`) |
| Compacta (puntero fino) | 40 / 2,5 |

## Contraste

Íconos de los botones a 3:1 y valor a 4,5:1 sobre `stepper-bg`, en los cuatro temas.
