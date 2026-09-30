---
component: Switch
tab: Uso
summary: Un interruptor para encender o apagar un ajuste que se aplica al instante, en una fila de lista.
---

## Resumen

`Switch` enciende o apaga un ajuste, y el cambio se aplica al instante. Siguiendo a Apple, va **solo en una fila de lista**, donde la fila misma dice qué controla.

### Cuándo usarlo
- Ajustes de encendido y apagado que se aplican sin enviar nada: «Notificaciones de pago», «Modo ahorro de datos».
- Un ajuste principal que habilita un grupo de ajustes dependientes (va en la primera fila del grupo).

### Cuándo no usarlo
- **Fuera de una lista:** usa `Button` con `selected`, que funciona como interruptor.
- **Un cambio que se aplica al enviar un formulario:** `Checkbox`.
- **Más de dos estados:** `SegmentedControl`, `RadioGroup` o `PopUpButton`.

## Anatomía

1. **Etiqueta:** el ajuste.
2. **Descripción** (opcional): una línea que explica el efecto.
3. **Pista:** 52 × 32 px.
4. **Perilla:** círculo de 24 px que se desplaza; encendida, muestra un check.

> **Imagen pendiente:** anatomía numerada de una fila con descripción, encendida y apagada.

## Estados

| Estado | Forma |
|---|---|
| Apagado | Pista con borde; perilla a la izquierda. |
| Encendido | Pista rellena; perilla a la derecha con check. |
| Foco | Anillo de foco alrededor de la pista. |
| Desactivado | Toda la fila al 45 % de opacidad. |

La diferencia está en la posición, el relleno y el check, no solo en el color.

> **Imagen pendiente:** encendido, apagado, foco y desactivado en tema oscuro y claro.

## Contenido

- **Etiqueta en positivo:** lo que se enciende («Notificaciones»), nunca una negación («Desactivar notificaciones»).
- **Descripción:** el efecto concreto («Aviso cuando se aprueba o rechaza un cobro»).
- Sin «Sí/No» ni «On/Off» junto al interruptor: la forma ya lo dice.

## Comportamiento

- Toda la etiqueta se puede tocar.
- El cambio se aplica al instante. Si puede fallar (por ejemplo, requiere conexión), muestra el resultado con un aviso y vuelve al estado anterior si falla.
- La perilla se desliza en 150 ms.

## Relacionados

`Button` con `selected` · `Checkbox` · `List`.

## Referencias

- Apple, Human Interface Guidelines: Toggles (switch).
- IBM, Carbon Design System: Toggle.
