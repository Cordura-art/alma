---
component: Modal
tab: Uso
summary: Un diálogo que bloquea la página para una tarea breve y enfocada.
---


## Resumen

`Modal` abre una tarea corta sobre la página y bloquea lo demás hasta que la persona la termina o la cancela: cambiar un dato, confirmar un pago, elegir entre pocas opciones con contexto. Es el *modal* de Carbon y la hoja (*sheet*) de Apple en su forma centrada.

### Cuándo usarlo
- Una tarea breve que conviene hacer sin perder la página de vista: editar un campo, confirmar un cambio con consecuencias.
- Cuando la persona necesita concentrarse en una sola cosa antes de seguir.

### Cuándo no usarlo
- **Una advertencia con 2 o 3 respuestas:** `Alert`.
- **Opciones sobre lo que se está viendo, en el teléfono:** `Sheet`.
- **Un resultado que no pide decisión:** `InlineNotification` o `toast`.
- **Una explicación breve junto a un control:** `Popover`.
- **Una tarea larga o con varios pasos:** una página propia. Un modal no lleva otro modal encima.

## Variantes

| Variante | Propósito |
|---|---|
| Pasiva | Solo informa o muestra contenido; se cierra con «Cerrar» o Esc. Sin `primaryAction`. |
| Transaccional | Pide una acción (`primaryAction`) y ofrece cancelar (`secondaryAction`). Un clic fuera no la cierra, para no perder lo escrito. |
| Destructiva | La acción principal borra o anula algo: `primaryAction.destructive`. El botón se ve rojo. |

## Anatomía

1. **Velo** (`overlay-01`): oscurece la página y bloquea el clic.
2. **Contenedor**: panel `ui-01` con borde y esquinas `radius-panel`.
3. **Antetítulo** (opcional): el contexto («Pasaje 4F2K-81»).
4. **Título:** verbo + objeto.
5. **Botón Cerrar:** ícono `close`, arriba a la derecha.
6. **Cuerpo:** descripción y contenido; es lo único que hace scroll.
7. **Pie:** «Cancelar» a la izquierda y la acción principal a la derecha, separados por un borde.

![Anatomía de un Modal transaccional con un campo, en tema oscuro. Numerados: velo (1), contenedor (2), antetítulo (3), título (4), botón Cerrar (5), cuerpo (6) y pie (7).](assets/Componentes/modal-anatomia.png)

## Tamaños

| Tamaño | Ancho máximo | Para qué |
|---|---|---|
| `sm` | 400 px | Una confirmación o un campo. |
| `md` (por defecto) | 560 px | Un formulario corto. |
| `lg` | 768 px | Contenido que necesita ancho: una tabla corta, una comparación. |

El alto se ajusta al contenido hasta la altura de la pantalla menos 32 px; si no cabe, el cuerpo hace scroll y el título y el pie quedan fijos.

![Los tres tamaños de Modal (sm, md y lg) sobre la misma página, con su ancho.](assets/Componentes/modal-tamanos.png)

## Contenido

- **Título:** verbo + objeto, con mayúscula solo al inicio («Cambiar el nombre del pasajero»). No una pregunta ni «¿Está seguro?».
- **Descripción:** una o dos oraciones con lo que la persona necesita saber para decidir.
- **Botones:** el de la acción repite el verbo del título («Guardar cambio»); el otro es «Cancelar». Nunca «Aceptar» y «Cancelar» juntos.
- Si un dato está mal, el error va junto al campo, sin cerrar el modal.

## Comportamiento

- Al abrir, el foco va al primer campo del cuerpo; si no hay campos, al diálogo. `initialFocus` elige otro elemento.
- El foco queda atrapado dentro del diálogo y la página de fondo no hace scroll.
- Esc y el botón «Cerrar» cierran; al cerrar, el foco vuelve al botón que lo abrió.
- Un clic en el velo cierra solo los modales pasivos (`closeOnOverlay` lo cambia).
- `dismissible: false` quita «Cerrar» y Esc; úsalo solo si la tarea no se puede abandonar.
- En pantallas angostas, los botones del pie se reparten el ancho.

![La ruta del foco en un Modal: al abrir, el foco va al campo; al escribir, sigue en el campo; al guardar, el modal se cierra y el foco vuelve al botón que lo abrió.](assets/Componentes/modal-foco.png)

## Relacionados

`Sheet` · `Alert` · `Popover` · `InlineNotification`.

## Referencias

- IBM, Carbon Design System: Modal.
- Apple, Human Interface Guidelines: Sheets.
