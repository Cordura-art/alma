---
component: DatePicker
tab: Código
summary: Cómo usar DatePicker en React.
---


## Uso

```js
const { DatePicker } = window.AlmaDS;
const hoy = new Date();
h(DatePicker, { label: 'Fecha de ida', min: hoy, onChange: setFecha })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Obligatoria. |
| `value` / `defaultValue` | `Date \| null` | — | Controlado o no controlado. |
| `onChange` | `(date \| null) => void` | — | Recibe la fecha, o `null` si se borra. |
| `min` / `max` | `Date` | — | Rango permitido. |
| `helper` | `string` | `'Formato dd-mm-aaaa'` | Ayuda. |
| `error` | `string \| boolean` | — | Error propio. |
| `required` / `disabled` | `boolean` | `false` | — |
| `name` / `id` | `string` | — | — |

Para mostrar la fecha elegida en otro lugar, usa `Intl.DateTimeFormat('es-CL')` (ver **Contenido → Formatos**).
