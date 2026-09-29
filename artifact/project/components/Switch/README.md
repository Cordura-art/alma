# Switch

Interruptor de encendido/apagado para un ajuste. Según Apple, va **solo en una fila de lista**, donde la fila misma dice qué controla.

## Cuándo usarlo
- Para ajustes que se aplican al instante, como «Notificaciones de pago».
- Si el ajuste gobierna un grupo de opciones, el switch va en la fila principal.
- Fuera de una lista, no uses un switch: usa `Button` con `selected`, que se comporta como toggle, lleva un ícono claro y cambia su fondo según el estado (`aria-pressed`).
- Para elegir entre más de dos opciones, usa `RadioGroup` o `PopUpButton`.

## Qué aporta quien lo usa
- `label` (o `aria-label`): el ajuste, en positivo. «Notificaciones», no «Desactivar notificaciones».
- `description`: una línea opcional.
- `checked`/`onChange` o `defaultChecked`.

## Estado sin depender del color
Encendido: pista rellena en `control-on`, la perilla se desplaza a la derecha y muestra un check. Apagado: pista con borde `border-control` y perilla `control-off-thumb` a la izquierda. La diferencia está en la forma, la posición y el ícono, no solo en el color. En claro, `control-on` es `#6F8445`: el lima no se ve sobre fondo claro.

## Tamaño
Mide 52 × 32 y su área de toque es de 44 × 44.
