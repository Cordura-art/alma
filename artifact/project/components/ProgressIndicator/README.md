# ProgressIndicator

Los pasos de un flujo de varias pantallas, como comprar un pasaje (IBM Carbon).

## Qué aporta quien lo usa
- `steps`: `{ label, description, error }`. De 3 a 6 pasos con nombres de una o dos palabras.
- `current`: índice del paso actual.
- `onSelect`: permite volver a pasos ya completados. Los pendientes nunca son clicables.
- `vertical`: en columna. En pantallas de menos de 672 px siempre se ve en columna.
- `label`: nombre de la lista («Compra de pasajes»).

## Estados
Completado (`checkmark--outline`), actual (`incomplete`), pendiente (`circle-dash`) y con error (`warning`). Cada paso dice su estado en texto oculto; el color nunca es la única pista. El actual lleva `aria-current="step"`.
