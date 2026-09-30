---
component: Sheet
tab: Estilo
summary: Especificaciones visuales de la hoja.
---


## Color

Los mismos tokens que `Modal`, más la barra de agarre.

| Elemento | Propiedad | Token |
|---|---|---|
| Velo | fondo | `overlay-01` |
| Contenedor | fondo | `modal-bg` |
| Contenedor | borde (1 px; sin borde inferior en el teléfono) | `modal-border` |
| Barra de agarre | fondo | `border-control` |
| Título | color del texto | `text-01` |
| Descripción | color del texto | `text-02` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

## Tipografía

Igual que `Modal`: título 20 px Medium, cuerpo 14 px Regular.

## Estructura

| Elemento | Propiedad | Menos de 672 px | Desde 672 px |
|---|---|---|---|
| Contenedor | ancho | todo el ancho | 560 px |
| Contenedor | radio | `radius-panel` solo arriba | `radius-panel` |
| Contenedor | relleno inferior | el área segura del teléfono | — |
| Velo | margen interior | 0 | 16 px |
| Barra de agarre | tamaño, radio | 36 × 5 px, `radius-pill` | oculta |
| Barra de agarre | separación superior | 8 px | — |

`size` no cambia el ancho de la hoja: desde 672 px mide siempre 560 px.

![Medidas de Sheet en el teléfono: asa de 36 × 5 px, radio superior, relleno y alto de las opciones.](assets/Componentes/sheet-medidas.png)

## Movimiento

| Ancho | Animación |
|---|---|
| Menos de 672 px | Sube desde abajo en `duration-moderate-02` con `easing-entrance-expressive`. |
| Desde 672 px | Receta «invocar» de `Modal`. |

Con movimiento reducido, aparece sin animación.

## Contraste

Igual que `Modal`: verificada con axe en los cuatro temas con la hoja abierta.
