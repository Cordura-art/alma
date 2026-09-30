---
component: Checkbox
tab: Uso
summary: Una casilla para marcar una o varias opciones independientes, o aceptar algo.
---

## Resumen

`Checkbox` marca opciones independientes: cada casilla se marca o desmarca sin afectar a las demás. Tiene tres estados: vacía, con check y mixta (guion).

### Cuándo usarlo
- Elegir varias opciones de una lista corta («Medios de pago que aceptas»).
- Una opción suelta que se confirma al enviar («Recordar en este dispositivo», aceptar condiciones).
- Jerarquías: una casilla padre que marca o desmarca a sus hijas.

### Cuándo no usarlo
- **Opciones excluyentes:** `RadioGroup`.
- **Un ajuste que se aplica al instante en una lista:** `Switch`.
- **Filtros en una barra:** `Tag` seleccionable.

## Anatomía

1. **Casilla:** cuadrado de 20 px con esquinas `radius-chip`.
2. **Marca:** check o guion.
3. **Etiqueta:** a la derecha de la casilla.
4. **Título del grupo** (en grupos): lo que tienen en común.

> **Imagen pendiente:** anatomía numerada de una casilla sola y de un grupo con padre e hijas.

## Estados

| Estado | Forma |
|---|---|
| Sin marcar | Casilla vacía con borde. |
| Marcada | Casilla rellena con check. |
| Mixta | Casilla rellena con guion: el padre con algunas hijas marcadas. |
| Foco | Anillo de foco alrededor de la casilla. |
| Desactivada | Todo al 45 % de opacidad. |

Los tres estados se distinguen por la forma, no solo por el color.

> **Imagen pendiente:** los cinco estados en tema oscuro y claro.

## Grupos y jerarquías

- Alinea las casillas por el borde izquierdo, una debajo de otra; las hijas, con sangría.
- El padre queda marcado si todas las hijas lo están, mixto si algunas y vacío si ninguna. Marcarlo marca a todas.
- Más de 7 opciones: considera un `Combobox` múltiple.

## Contenido

- **Etiqueta:** afirmativa y corta, con mayúscula solo al inicio y sin punto final («Recordar en este dispositivo», no «No olvidar»).
- **Título del grupo:** qué se elige («Medios de pago»).
- Para aceptar condiciones, la etiqueta incluye el enlace a ellas.

## Comportamiento

- Toda la fila (casilla y etiqueta) se puede tocar.
- El cambio no se aplica al instante: se envía con el formulario. Si se aplica al instante, usa `Switch`.

## Relacionados

`RadioGroup` · `Switch` · `Tag` · `Combobox`.

## Referencias

- Apple, Human Interface Guidelines: Toggles (checkbox).
- IBM, Carbon Design System: Checkbox.
