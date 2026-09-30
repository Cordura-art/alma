---
component: SearchField
tab: Código
summary: Cómo usar SearchField en React.
---


## Uso

```js
const { SearchField } = window.AlmaDS;
h(SearchField, { label: 'Buscar viajes', placeholder: 'Buscar ciudades o terminales',
  onChange: setQuery, onSubmit: search,
  suggestions: recientes, suggestionsTitle: 'Recientes',
  scopes: ['Todo', 'Viajes', 'Terminales'], onScopeChange: setScope,
  tokens: filtros, onRemoveToken: quitarFiltro })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `placeholder` | `string` | — | Qué se puede buscar. |
| `label` | `string` | — | Nombre del campo para el lector. |
| `value` / `defaultValue` | `string` | `''` | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | En cada tecla. |
| `onSubmit` | `(value) => void` | — | Con Enter o al elegir una sugerencia. |
| `suggestions` / `suggestionsTitle` | `Array<string \| { label, icon }>` / `string` | — | Hasta 8. |
| `scopes` / `scope` / `defaultScope` / `onScopeChange` | — | — | La barra de alcance. |
| `tokens` / `onRemoveToken` | `string[]` / `(token) => void` | — | Filtros dentro del campo. |
| `id` | `string` | automático | — |
