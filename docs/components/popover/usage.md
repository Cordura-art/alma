---
component: Popover
tab: Uso
summary: Un diálogo pequeño y no modal junto al botón que lo abre.
---


## Resumen

`Popover` abre, junto a su botón, un panel pequeño con una explicación o un par de controles, sin bloquear la página. Es el *popover* de Apple y el *toggletip* de Carbon.

### Cuándo usarlo
- Explicar un término o un cobro sin salir de la pantalla («¿Qué es la tasa de embarque?»).
- Un par de controles relacionados con el botón (un filtro rápido).
- Cuando el contenido tiene un enlace o un botón, que un tooltip no puede tener.

### Cuándo no usarlo
- **Una frase corta que describe un control:** `Tooltip`.
- **Una decisión importante o una tarea con varios campos:** `Modal`.
- **Una lista de acciones:** `PullDownButton`.

## Anatomía

1. **Botón** que lo abre (a menudo un `Button` de ícono `information`).
2. **Panel** junto al botón.
3. **Título** (opcional).
4. **Contenido.**
5. **Botón Cerrar.**

> **Imagen pendiente:** un popover abierto bajo un botón de información, en tema oscuro y claro.

## Ubicación

| Propiedad | Valores | Efecto |
|---|---|---|
| `placement` | `bottom` (por defecto), `top` | Debajo o encima del botón. |
| `align` | `start` (por defecto), `end` | Alineado al borde izquierdo o al derecho del botón. Usa `end` cerca del borde derecho de la pantalla. |

## Contenido

- **Título:** el término o la pregunta («Tasa de embarque»).
- **Contenido:** una o dos oraciones; como mucho, un enlace o un botón.

## Comportamiento

- Se abre con un clic o con Enter en el botón; el foco entra al panel.
- Esc, «Cerrar» o un clic fuera lo cierran; con Esc o «Cerrar», el foco vuelve al botón.
- No es modal: no bloquea la página ni atrapa el foco.
- Uno a la vez.

## Relacionados

`Tooltip` · `Tip` · `Modal` · `PullDownButton`.

## Referencias

- Apple, Human Interface Guidelines: Popovers.
- IBM, Carbon Design System: Toggletip.
