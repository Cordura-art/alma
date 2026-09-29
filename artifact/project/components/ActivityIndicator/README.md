# ActivityIndicator

Spinner para una espera cuya duración no se conoce (en Apple, *activity indicator*).

## Cuándo usarlo
- Mientras algo carga y no hay forma de medir el avance.
- Si puedes medirlo, usa `ProgressBar` determinada. Dentro de un botón, usa `Button` con `loading`.

## Qué aporta quien lo usa
- `label`: qué se está haciendo («Verificando pago»). El lector de pantalla lo anuncia; no queda visible.
- `size`: 20, 24 (por defecto) o 40 px.

Color `control-on`. Con movimiento reducido deja de girar, pero sigue visible.
