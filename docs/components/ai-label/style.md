---
component: AILabel
tab: Estilo
summary: Colores, tipografía y medidas de AILabel.
---


## Color

La marca es neutra. No usa el acento ni un color «de IA»: tiene que verse igual junto a cualquier contenido y en cualquier entidad.

| Elemento | Propiedad | Token |
|---|---|---|
| Marca | fondo | `tag-gray-bg` |
| Ícono y texto | color | `tag-gray-text` |
| Marca que se abre, con el cursor encima | contorno interior | El color del texto |
| Foco | contorno | `focus`, a 2 px de la marca |
| Explicación | fondo y borde | Los de `Popover` |
| Fecha de la explicación | color del texto | `text-02` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| «IA», tamaño `sm` | 11 / 0,6875 | `font-weight-emphasis` |
| «IA», tamaño `md` | 12 / 0,75 | `font-weight-emphasis` |
| Explicación | La de `Popover` | `font-weight-body` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Marca `sm` | alto | 24 px |
| Marca `md` | alto | 32 px |
| Marca | relleno a los lados | `space-8` |
| Ícono | tamaño | `icon-size-16` |
| Ícono y texto | separación | `space-4` |
| Marca | radio | `radius-tag` |
| Área que responde | alto | El de un control, aunque la marca mida 24 px |
| Partes de la explicación | separación | `space-8` |
