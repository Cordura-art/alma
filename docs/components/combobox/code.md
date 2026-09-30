---
component: Combobox
tab: Código
summary: Cómo usar Combobox en React.
---

## Uso

```js
const { Combobox } = window.AlmaDS;
h(Combobox, { label: 'Destino', options: ['Santiago', 'Valparaíso', 'Viña del Mar'], defaultValue: 'Viña del Mar' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Etiqueta visible. |
| `options` | `Array<string \| { value, label, disabled }>` | — | Opciones. |
| `multiple` | `boolean` | `false` | Varias opciones. |
| `value` / `defaultValue` | valor o arreglo | `null` o `[]` | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe el valor (o el arreglo). |
| `placeholder`, `helper`, `error` | — | — | Como `TextInput`. |
| `emptyText` | `string` | «Sin resultados para «…»» | Mensaje sin coincidencias. |
| `tagColor` | color de `Tag` | `'blue'` | Color de las etiquetas en múltiple. |
| `required`, `disabled`, `name`, `id` | — | — | — |

## Ejemplos

**Múltiple**

```js
h(Combobox, { label: 'Paradas de interés', multiple: true, options: cities, value: stops, onChange: setStops })
```

**Opciones con valor distinto del texto**

```js
h(Combobox, { label: 'Banco', options: [{ value: 'bch', label: 'Banco de Chile' }, { value: 'bst', label: 'Banco Santander' }] })
```

## Flutter

Tokens compartidos en `dist/dart/alma_tokens.dart`. El widget llega en la fase 4.
