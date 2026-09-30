---
component: Tooltip
tab: Uso
summary: Una etiqueta breve que explica qué hace un control, al pasar el cursor o al enfocarlo.
---


## Resumen

`Tooltip` muestra una frase corta que dice qué hace un control. Aparece con el cursor o con el foco del teclado y desaparece al salir. En Apple es la *help tag*.

### Cuándo usarlo
- En botones de solo ícono, para decir la acción («Copiar el número de la tarjeta»).
- Para aclarar un control cuyo efecto no es obvio.

### Cuándo no usarlo
- **Información esencial:** en pantallas táctiles no hay cursor, así que nunca debe estar solo en un tooltip.
- **Texto largo, enlaces o botones:** `Popover`.
- **Un consejo sobre una función:** `Tip`.
- **Repetir la etiqueta visible del control:** sobra.

## Anatomía

1. **Control** que lo abre.
2. **Globo** con el texto, sobre el control (o debajo con `placement: 'bottom'`).

> **Imagen pendiente:** un botón de ícono con su tooltip arriba y otro abajo.

## Contenido

- Describe la acción que inicia el control, empezando con verbo: «Copiar el número de la tarjeta».
- No repitas el nombre del control.
- Como máximo 75 caracteres, idealmente menos de 60. Puede ser un fragmento sin artículos, con mayúscula solo al inicio y sin punto final.
- Puede cambiar según el estado del control («Congelar tarjeta» / «Reactivar tarjeta»).

## Comportamiento

- Con el cursor aparece a los 500 ms (`delay`); con el foco del teclado, al instante.
- Se oculta al sacar el cursor, al perder el foco o con Esc.
- Si choca con el borde de la pantalla, se corre hacia adentro.
- Un tooltip por control, y uno a la vez.

## Relacionados

`Popover` · `Tip` · `Button` (solo ícono).

## Referencias

- Apple, Human Interface Guidelines: Offering help (help tags).
- IBM, Carbon Design System: Tooltip.
