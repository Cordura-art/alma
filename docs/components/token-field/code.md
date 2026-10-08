---
component: TokenField
tab: Código
summary: Cómo usar TokenField en React.
---


## Uso

```js
const { TokenField } = window.AlmaDS;

h(TokenField, {
  label: 'Compartir con',
  placeholder: 'Escribe un correo',
  value: correos, onChange: setCorreos,
  validate: function (v) { return /@/.test(v); },
  helper: 'Separa los correos con una coma.'
})

// Con sugerencias
h(TokenField, { label: 'Destinos favoritos', suggestions: ciudades, defaultValue: ['Viña del Mar'] })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | texto | — | El rótulo. Obligatorio. |
| `value`, `defaultValue` | lista de textos | — | Los valores, controlados o iniciales. |
| `onChange` | función | — | Recibe la lista con cada cambio. |
| `placeholder` | texto | — | El texto de ejemplo. Solo se ve sin fichas. |
| `suggestions` | lista de textos | — | Lo que se ofrece al escribir. |
| `validate` | función | — | Recibe un valor y dice si vale. |
| `addOnBlur` | sí o no | sí | Si lo escrito se vuelve ficha al salir del campo. |
| `helper`, `error` | texto | — | La ayuda, o el error. |
| `required`, `disabled` | sí o no | no | — |
