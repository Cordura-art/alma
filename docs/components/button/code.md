---
component: Button
tab: Código
summary: Cómo usar Button en React, con sus propiedades y ejemplos.
---

## Cargar ALMA

En una página: los tokens (`tokens.css` o `dist/css/alma.css` del repositorio), `components/bundle.css`, React 18 y `components/bundle.js`. El componente queda en `window.AlmaDS.Button`.

```js
const { Button } = window.AlmaDS;
```

El paquete npm y Storybook llegan en la fase 2 de la hoja de ruta.

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `variant` | `'filled' \| 'tinted' \| 'gray' \| 'plain' \| 'tertiary' \| 'ghost' \| 'inverse'` | `'filled'` | Estilo (énfasis). `primary` y `secondary` son alias de `filled` y `gray`. |
| `role` | `'normal' \| 'primary' \| 'cancel' \| 'destructive'` | `'normal'` | Significado. `primary` es `type="submit"`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | 44, 56 o 72 px. |
| `iconBefore` / `iconAfter` | nombre de ícono de Carbon | — | Ícono antes o después de la etiqueta. |
| `icon` | nombre de ícono de Carbon | — | Botón solo ícono. Exige `aria-label`. |
| `loading` | `boolean` | `false` | Muestra el indicador y bloquea clics repetidos. |
| `loadingLabel` | `string` | — | Etiqueta mientras carga («Pagando…»). |
| `selected` | `boolean` | — | Convierte el botón en interruptor (`aria-pressed`). |
| `disabled` | `boolean` | `false` | Desactiva el botón. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` (`'submit'` con rol `primary`) | Tipo nativo. |
| `onClick` | `(e) => void` | — | Acción. |
| `aria-label` | `string` | — | Nombre accesible; obligatorio en solo ícono. |
| `aria-describedby`, `aria-expanded`, `aria-controls`, `aria-haspopup` | — | — | Se pasan al `<button>` (los usan `Tooltip` y `Popover`). |
| `className` | `string` | — | Clase adicional. |

## Ejemplos

**Acción principal de un formulario**

```js
h(Button, { role: 'primary', iconAfter: 'arrow--right' }, 'Continuar')
```

**Par de diálogo: «Cancelar» a la izquierda, acción a la derecha**

```js
h(Button, { variant: 'gray', role: 'cancel', onClick: close }, 'Cancelar'),
h(Button, { role: 'primary', onClick: pay }, 'Pagar $7.000')
```

**Destructivo con confirmación**

```js
h(Button, { variant: 'tinted', role: 'destructive', onClick: askToDelete }, 'Eliminar tarjeta')
```

**Mientras carga**

```js
h(Button, { loading: paying, loadingLabel: 'Pagando…', onClick: pay }, 'Pagar')
```

**Solo ícono**

```js
h(Button, { variant: 'plain', icon: 'trash-can', 'aria-label': 'Eliminar Santiago → Rancagua' })
```

**Interruptor**

```js
h(Button, { selected: fav, iconBefore: fav ? 'favorite--filled' : 'favorite', onClick: toggleFav }, 'Favorito')
```

## HTML y CSS sin React

```html
<button type="button" class="alma-btn alma-btn--filled alma-btn--sm">Continuar</button>
<button type="button" class="alma-btn alma-btn--tinted alma-btn--sm alma-btn--destructive">Eliminar</button>
```

Clases: `alma-btn` + estilo (`--filled`, `--tinted`, `--gray`, `--plain`, `--tertiary`, `--ghost`, `--inverse`) + tamaño (`--sm`, `--md`, `--lg`) + modificadores (`--destructive`, `--icon`, `--lead`, `--trail`, `--loading`).

## Ajustar sin romper

Para cambiar un botón, sobrescribe su token de componente en tu tema, nunca el semántico:

```css
[data-theme="dark"] { --button-filled-bg-hover: var(--primary-600); }
```

## Flutter

Los tokens ya se generan en Dart (`dist/dart/alma_tokens.dart`): `AlmaColors.buttonFilledBg`, `AlmaSpacing`, `AlmaTypography`. El widget llega en la fase 4.
