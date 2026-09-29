# ProgressLine

Línea de 185 px que indica una espera: brillo lima que recorre la línea mientras carga, y verde fijo al terminar.

## Cuándo usarlo
Debajo de una pantalla velada con `overlay-01`, centrada cerca del borde inferior, mientras se procesa un pago o una validación.

## Qué aporta quien lo usa
- `status`: `loading` o `success`.
- `label`: qué se está haciendo («Validando pago»).

## Movimiento
El brillo se detiene si el sistema pide menos movimiento.
