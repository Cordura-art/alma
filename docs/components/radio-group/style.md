---
component: RadioGroup
tab: Estilo
summary: Especificaciones visuales del grupo de opciones.
---

## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Título del grupo | color del texto | `text-02` |
| Círculo | borde (2 px) | `control-off-border` |
| Círculo elegido | borde | `control-on` |
| Punto | fondo | `control-on` |
| Etiqueta | color del texto | `text-01` |
| Ayuda | color del texto | `text-02` |
| Círculo:focus | contorno | `focus` (2 px, separado 2 px) |
| Opción:disabled | opacidad | 45 % |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Título del grupo | 11 / 0,6875 | Regular / 400 | `web-label-s` |
| Etiqueta | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Ayuda | 11 / 0,6875 | Regular / 400 | `web-label-s` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Círculo | tamaño | 20 × 20 px |
| Punto | tamaño | 10 × 10 px |
| Círculo y etiqueta | separación | 8 px |
| Opción | alto mínimo | 44 px |
| Título y opciones | separación | 4 px |
| Opciones y ayuda | separación | 4 px |

## Tamaño

| Densidad | Alto de cada opción (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

## Movimiento y contraste

El borde cambia en `duration-fast-01`. Círculo y punto a 3:1 o más, textos a 4,5:1 (7:1 en alto contraste), en los cuatro temas.
