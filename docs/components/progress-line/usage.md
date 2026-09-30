---
component: ProgressLine
tab: Uso
summary: Una línea lima que indica una espera de marca y termina en verde.
---


## Resumen

`ProgressLine` es una línea delgada: un brillo lima la recorre mientras algo se procesa y queda verde al terminar. Es propia de ALMA, de las pantallas de pago de Cordura.

### Cuándo usarla
- Sobre una pantalla velada con `overlay-01`, centrada cerca del borde inferior, mientras se procesa un pago o una validación.
- En momentos de marca, donde una barra de trabajo se vería fuera de lugar.

### Cuándo no usarla
- **Para mostrar cuánto falta:** `ProgressBar` (no tiene valor).
- **En una interfaz de trabajo:** `ProgressBar` o `ActivityIndicator`.

## Estados

| Estado | Aspecto |
|---|---|
| `loading` | Un brillo lima recorre la línea. |
| `success` | Verde fijo. |

![La pantalla de pago velada mientras se procesa: la línea de ProgressLine cargando y, al terminar, en verde.](assets/Componentes/progress-line-pago.png)

## Contenido

- `label` dice qué se hace («Validando pago»); lo oye el lector. Si la espera es larga, muéstralo también en pantalla.

## Relacionados

`ProgressBar` · `ActivityIndicator` · Carga.
