# SegmentedControl

Selector de una sola opción entre 2 y 4 alternativas, en píldora con la opción elegida en blanco (de la pantalla de pasajes, «Ida / Ida y regreso / Por cobrar»).

## Qué aporta quien lo usa
- `options`: textos cortos (una o tres palabras), o `{value, label}`.
- `value` + `onChange`, o `defaultValue`.
- `label`: nombre accesible del grupo.
- Cada opción mide 44 px de alto (`size-touch-min`); en Figma medía 40.

## Estados
- Elegida: fondo `brand-white`, texto `tertiary-600`.
- Resto: texto `text-02`; al pasar el cursor, `text-01`.
- Foco: anillo `focus`.

## No
- Más de 4 opciones: usa una lista.
