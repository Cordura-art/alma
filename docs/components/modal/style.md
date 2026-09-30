---
component: Modal
tab: Estilo
summary: Especificaciones visuales del diálogo modal.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Velo | fondo | `overlay-01` |
| Contenedor | fondo | `modal-bg` |
| Contenedor | borde (1 px) | `modal-border` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Antetítulo | color del texto | `text-02` |
| Título | color del texto | `text-01` |
| Descripción | color del texto | `text-02` |
| Pie | borde superior (1 px) | `modal-border` |
| Botón secundario | estilo | `Button` gray, rol cancel |
| Botón principal | estilo | `Button` filled, rol primary o destructive |
| Botón Cerrar | estilo | `Button` plain de ícono |

`modal-bg` apunta a `ui-01` y `modal-border` a `ui-03`: el diálogo es un contenedor sobre la página, como en el resto de ALMA.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Antetítulo | 12 / 0,75 | Regular / 400 | — |
| Título | 20 / 1,25 | Medium / 500 | 1,4 |
| Cuerpo y descripción | 14 / 0,875 | Regular / 400 | 1,6 |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Velo | margen interior | 16 px (`space-16`) |
| Contenedor | radio | `radius-panel` |
| Contenedor | alto máximo | alto de pantalla − 32 px |
| Cabecera | relleno | 16 px arriba, 24 px a la izquierda, 8 px a la derecha |
| Cuerpo | relleno | 16 px arriba, 24 px a los lados y abajo |
| Pie | relleno | 16 px arriba, 24 px a los lados y abajo |
| Botones del pie | separación | 8 px |

> **Imagen pendiente:** anatomía acotada del modal `md`.

## Tamaño

| Tamaño | Ancho máximo (px / rem) |
|---|---|
| `sm` | 400 / 25 |
| `md` | 560 / 35 |
| `lg` | 768 / 48 |

## Capas y movimiento

| Elemento | Capa | Animación |
|---|---|---|
| Velo | `z-modal` | aparece en `duration-moderate-02` con `easing-entrance-productive` |
| Contenedor | `z-modal` | receta «invocar» de IBM: de 96 % a 100 % de escala y de transparente a opaco, en `duration-moderate-02` con `easing-standard-expressive` |

Con movimiento reducido, ambos aparecen sin animación.

## Contraste

Textos a 4,5:1 (7:1 en alto contraste) y borde del contenedor sobre el velo, verificados con axe en los cuatro temas con el diálogo abierto.
