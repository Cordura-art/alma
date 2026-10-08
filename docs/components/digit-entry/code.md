---
component: DigitEntry
tab: Código
summary: Cómo usar DigitEntry en React.
---


## Uso

```js
const { DigitEntry } = window.AlmaDS;

h(DigitEntry, {
  label: 'Código de verificación',
  helper: 'Te lo enviamos al correo c•••@correo.cl',
  error: fallo ? 'El código no coincide. Revisa el último que te enviamos.' : undefined,
  onComplete: function (codigo) { verificar(codigo); }
})
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | texto | — | Qué código es. Obligatorio. |
| `length` | número | 6 | Cuántos dígitos. |
| `value`, `defaultValue` | texto | — | El código, controlado o inicial. |
| `onChange` | función | — | Recibe el código con cada cambio. |
| `onComplete` | función | — | Recibe el código cuando está completo. |
| `helper` | texto | — | La ayuda. |
| `error` | texto | — | El error. Reemplaza a la ayuda. |
| `mask` | sí o no | no | Muestra puntos en vez de los dígitos: para un PIN. |
| `autoComplete` | texto | `one-time-code` | Lo que el navegador puede llenar. |
| `disabled` | sí o no | no | — |
