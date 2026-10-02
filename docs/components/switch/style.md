---
component: Switch
tab: Estilo
summary: Especificaciones visuales del interruptor.
---

## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Pista (apagado) | borde (1 px) | `control-off-border` |
| Pista (apagado) | fondo | transparente |
| Perilla (apagado) | fondo | `control-off-thumb` |
| Pista (encendido) | fondo y borde | `control-on` |
| Perilla (encendido) | fondo | `control-on-mark` |
| Check de la perilla | relleno | `control-on` |
| Etiqueta | color del texto | `text-01` |
| Descripción | color del texto | `text-02` |
| Pista:focus | contorno | `focus` (2 px, separado 2 px) |
| Fila:disabled | opacidad | 45 % |

En tema oscuro, `control-on` es un paso claro de la rampa azul, que se despega del fondo; en tema claro es el azul de acción.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado | Estilo de texto |
|---|---|---|---|---|
| Etiqueta | 14 / 0,875 | `font-weight-body` | 1,4 | `web-label-m` |
| Descripción | 12 / 0,75 | `font-weight-body` | 1,72 | `web-body-s` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Pista | tamaño | 52 × 32 px |
| Pista | radio | `radius-pill` |
| Perilla | tamaño, margen | 24 px, 3 px |
| Perilla | desplazamiento | 20 px |
| Check | tamaño | 16 px |
| Fila | alto mínimo, relleno vertical | 44 px, 8 px |
| Etiqueta e interruptor | separación | 16 px (`space-16`) |
| Área de toque del interruptor | tamaño | 44 × 44 px |

![Medidas de Switch: pista de 52 × 32 px con borde, perilla de 24 px y separación con la etiqueta.](assets/Componentes/switch-medidas.png)

## Movimiento

El fondo y el borde de la pista cambian en `duration-fast-02` (110 ms); la perilla se desplaza en `duration-moderate-01` (150 ms); ambos con `easing-standard-productive`. Con movimiento reducido, el cambio es instantáneo.

## Contraste

Pista, perilla y check a 3:1 o más; textos a 4,5:1 (7:1 en alto contraste), en los cuatro temas.
