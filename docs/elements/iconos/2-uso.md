---
element: Íconos
order: 5
tab: Uso
summary: Íconos de IBM Carbon, dibujados como SVG dentro de la página.
---

## Cuándo un ícono

- Para reconocer una acción o un destino más rápido: cerrar, buscar, volver.
- Junto a un texto, para reforzarlo.
- Solo, en botones de uso muy frecuente y conocido; entonces necesita un nombre (`aria-label`) y conviene un `Tooltip`.

## Cuándo no

- Para decorar.
- Si el ícono no es conocido: una palabra se entiende antes.
- Para distinguir estados solo por el ícono: acompáñalo de la palabra.

## Color

El ícono hereda el color de su texto (`currentColor`). Ponlo dentro de algo que ya use:

| Token | Uso |
|---|---|
| `icon-01` | Íconos principales. |
| `icon-02` | Íconos secundarios, como los de una lista. |
| `text-on-interactive` | Sobre lima o acero. |
| `status-icon-*` | En avisos de error, éxito, advertencia e información. |

Un ícono que informa necesita 3:1 contra su fondo.

## Íconos frecuentes

| Acción | Ícono |
|---|---|
| Cerrar | `close` |
| Volver / avanzar | `arrow--left` / `arrow--right` |
| Buscar | `search` |
| Más acciones | `overflow-menu--horizontal` |
| Desplegar | `chevron--down` |
| Ir al detalle | `chevron--right` |
| Información / error / advertencia | `information` / `error` / `warning` |
| Éxito | `checkmark--outline` |

## Alineación

- Centrado en la altura de su línea de texto.
- Entre ícono y texto, `space-8` (en controles pequeños) o `space-16` (en filas de lista y navegación).
