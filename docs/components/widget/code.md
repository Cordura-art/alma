---
component: Widget
tab: Código
summary: Cómo usar Widget en React.
---


## Uso

```js
const { Widget } = window.AlmaDS;

h('div', { className: 'alma-widgets' },
  h(Widget, { size: 'sm', title: 'Próximo viaje', icon: 'ticket', updated: 'Hace 5 min', onOpen: abrirViaje },
    h('p', { className: 'alma-widget__figure' }, '08:30'),
    h('p', { className: 'web-body-s' }, 'Viña del Mar')),
  h(Widget, { size: 'md', title: 'Billetera', icon: 'wallet', loading: cargando }, contenido))
```

`alma-widgets` es la grilla: celdas de 160 px que se acomodan solas al ancho.

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | texto | — | De qué es. Obligatorio. |
| `icon` | texto | — | El ícono de su app. |
| `size` | `sm`, `md`, `lg`, `xl` | `sm` | El tamaño. |
| `children` | contenido | — | El contenido. |
| `updated` | texto | — | De cuándo es: «Hace 5 min». |
| `onOpen` | función | — | Al tocarlo. |
| `href` | texto | — | En vez de `onOpen`: un enlace. |
| `openLabel` | texto | «Abrir» y el título | El nombre del acceso. |
| `loading` | sí o no | no | Muestra la espera. |
