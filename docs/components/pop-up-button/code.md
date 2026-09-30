---
component: PopUpButton
tab: Código
summary: Cómo usar PopUpButton en React.
---

## Uso

```js
const { PopUpButton } = window.AlmaDS;
h(PopUpButton, { label: 'Ordenar por', options: ['Salida más temprana', 'Precio más bajo', 'Duración'], defaultValue: 'Salida más temprana' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Etiqueta superior; también da nombre a la lista. |
| `options` | `Array<string \| { value, label, disabled, icon }>` | — | Opciones excluyentes. |
| `value` / `defaultValue` | `string` | la primera opción | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe el valor elegido. |
| `help` | `string` | — | Nota al pie del menú. |
| `disabled` | `boolean` | `false` | — |
| `id` | `string` | automático | — |

## Ejemplo con opción personalizada

```js
h(PopUpButton, { label: 'Pasajeros', options: ['1', '2', '3', '4', 'Más de 4…'],
  help: 'Para más de 4 pasajeros te pediremos los datos de cada uno.' })
```

## Flutter

Tokens `popup*` y `menu*` en `dist/dart/alma_tokens.dart`. El widget llega en la fase 4.
