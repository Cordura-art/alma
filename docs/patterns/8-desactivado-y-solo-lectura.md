---
pattern: Desactivado y solo lectura
summary: Cuándo desactivar un control y cómo mostrar lo que no se puede editar.
---

## Desactivado

Un control desactivado se ve, pero no responde (al 45 % de opacidad en ALMA).

**Úsalo** cuando la acción existe pero hoy no se puede hacer, y es obvio por qué: «Página siguiente» en la última página.

**Evítalo** cuando la persona no entendería por qué:
- Un botón «Pagar» desactivado hasta completar el formulario: mejor dejarlo activo y marcar lo que falta al pulsarlo.
- Un ítem de `TabBar` o `Sidebar`: nunca se desactivan; si una sección está vacía, se explica dentro.

Si desactivas algo que no es obvio, di por qué cerca del control («Disponible desde el 1 de abril»).

> **Imagen pendiente:** un botón desactivado con su explicación al lado.

## Solo lectura

Un dato que la persona puede ver pero no cambiar (el RUT de la cuenta, el número de un pasaje).

- **Muéstralo como texto, no como un campo.** En ALMA, una fila informativa de `List` (título y `trailing`) o un par etiqueta y valor.
- `TextInput` no tiene estado de solo lectura. Un campo desactivado no sirve para esto: baja el contraste, no se puede copiar y parece un error.
- Si el dato se puede copiar, ofrece un botón «Copiar» junto a él.
- Si se puede cambiar en otro lugar, ofrece el camino: «Cambiar en Ajustes».

## Accesibilidad

- Un control desactivado no recibe foco: quien usa teclado o lector puede no saber que existe. Por eso, explicar en texto es más importante que desactivar.
- El texto de solo lectura debe cumplir el contraste normal (4,5:1); el desactivado está exento, y por eso no sirve para mostrar datos.

## Relacionados

`Button` · `List` · `TextInput`.
