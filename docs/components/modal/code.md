---
component: Modal
tab: Código
summary: Cómo usar Modal en React.
---


## Uso

```js
const { Modal, Button, TextInput } = window.AlmaDS;
const [open, setOpen] = React.useState(false);
h(React.Fragment, null,
  h(Button, { variant: 'gray', onClick: () => setOpen(true) }, 'Cambiar el nombre del pasajero'),
  h(Modal, { open, onClose: () => setOpen(false), eyebrow: 'Pasaje 4F2K-81', title: 'Cambiar el nombre del pasajero',
    description: 'El nombre debe coincidir con el carnet que mostrarás al subir.',
    secondaryAction: { label: 'Cancelar' },
    primaryAction: { label: 'Guardar cambio', onClick: save } },
    h(TextInput, { label: 'Nombre completo', defaultValue: 'Camila Rojas' })))
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `open` | `boolean` | — | Muestra u oculta el diálogo. |
| `onClose` | `() => void` | — | Esc, «Cerrar», clic en el velo o «Cancelar» sin `onClick`. |
| `title` | `string` | — | Verbo + objeto. Da nombre al diálogo. |
| `eyebrow` | `string` | — | Contexto sobre el título. |
| `description` | `string` | — | Describe el diálogo para el lector de pantalla. |
| `children` | `node` | — | El contenido del cuerpo. |
| `primaryAction` | `{ label, onClick, destructive, disabled, loading, loadingLabel }` | — | La acción principal. |
| `secondaryAction` | `{ label, onClick }` | — | Normalmente «Cancelar». |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ancho máximo. |
| `dismissible` | `boolean` | `true` | `false` quita «Cerrar» y Esc. |
| `closeOnOverlay` | `boolean` | `true` sin acción principal, `false` con ella | Cerrar con un clic fuera. |
| `initialFocus` | `string` (selector) | primer campo del cuerpo | Qué recibe el foco al abrir. |
| `variant` | `'dialog' \| 'sheet'` | `'dialog'` | `'sheet'` es `Sheet`. |

## Acción que tarda

```js
primaryAction: { label: 'Pagar $7.000', loading: paying, loadingLabel: 'Pagando', onClick: pay }
```

Mientras `loading` es verdadero, el botón muestra el indicador, no acepta más clics y anuncia `loadingLabel`.

## Dónde se dibuja

El diálogo se dibuja al final de `<body>` (un portal de React), así que ningún `overflow` del contenedor lo recorta.
