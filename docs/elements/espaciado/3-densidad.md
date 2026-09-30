---
element: Espaciado y grilla
order: 3
tab: Densidad y capas
summary: La escala de 8, la grilla responsive, la densidad y las capas.
---

## Densidad

| Densidad | Controles | Campos | Filas de tabla |
|---|---|---|---|
| **Normal** (por defecto) | 44 px (`size-touch-min`) | 56 px (`size-field`) | 56 px (`size-row`) |
| **Compacta** | 32 px (`size-control-compact`) | 40 px (`size-field-compact`) | 40 px (`size-row-compact`) |

- Se activa con `data-density="compact"` en cualquier contenedor, y `data-density="normal"` vuelve a la normal dentro de una zona compacta.
- La compacta solo actúa con puntero fino (mouse o trackpad). En pantallas táctiles se ignora: todo sigue en 44 px.
- Úsala en herramientas de trabajo de escritorio con mucha información: tablas, paneles de administración, formularios largos. No en productos para el público ni en piezas de marca.
- Solo cambian altos y rellenos; el texto, los colores y el contraste no cambian.

![La misma tabla de salidas en densidad normal, con filas de 56 px, y en densidad compacta, con filas de 40 px.](assets/Fundamentos/espaciado-densidad.png)

## Capas

Las superficies se separan con color (ver **Color**). Lo que se apila sobre el contenido usa estas capas, por nombre:

| Token | Valor | Qué va |
|---|---|---|
| `z-hidden` | −1 | Detrás del contenido. |
| `z-footer` | 5000 | Pie fijo. |
| `z-floating`, `z-overlay` | 6000 | Tooltips, popovers, toasts. |
| `z-header` | 8000 | Barra superior fija, `TabBar` fija. |
| `z-modal` | 9000 | Modales, hojas y alertas. |
| `z-dropdown` | 9100 | Menús desplegables, también dentro de un modal. |

No inventes valores intermedios.

## Sombra

Solo `shadow-floating`, y solo en lo que flota sobre el contenido: menús, popovers, tooltips y toasts.
