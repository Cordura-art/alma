---
component: MenuBar
tab: Código
summary: Cómo usar MenuBar en React.
---


## Uso

```js
const { MenuBar } = window.AlmaDS;

h(MenuBar, {
  appName: 'Viajes',
  menus: [
    { label: 'Viajes', items: [{ value: 'acerca', label: 'Acerca de Viajes' }, { value: 'ajustes', label: 'Ajustes…', shortcut: 'Ctrl+,' }] },
    { label: 'Archivo', items: [{ value: 'nuevo', label: 'Nuevo viaje…', shortcut: 'Ctrl+N' }] },
    { label: 'Edición', items: [{ value: 'deshacer', label: 'Deshacer', shortcut: 'Ctrl+Z' }, '-', { value: 'copiar', label: 'Copiar', shortcut: 'Ctrl+C' }] }
  ],
  extras: [
    { icon: 'notification', label: 'Avisos', onPress: abrirAvisos },
    { text: 'mar 31 · 08:12', label: 'Fecha y hora' }
  ],
  onAction: function (valor, menu) { hacer(valor); }
})
```

Los ítems son los de cualquier menú de ALMA: ver **PullDownButton › Código › Los ítems**. El primer menú es el de la app.

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `menus` | `[{ label, items }]` | — | Los menús, en orden. |
| `appName` | texto | — | El nombre de la app. Pone el primer menú en negrita. |
| `onAction` | `(value, menu) => void` | — | Recibe el ítem elegido y el menú. |
| `extras` | lista | — | Los extras, a la derecha. |
| `label` | texto | «Menús de» y el nombre de la app | El nombre de la barra. |

## Los extras

| Forma | Qué es |
|---|---|
| `{ icon, label }` | Un ícono que informa. `label` es su nombre. |
| `{ text, label }` | Un dato: la hora. |
| `{ icon, label, onPress }` | Un botón. |
| `{ icon, label, items, onAction }` | Un botón que abre un menú. |
| `{ node }` | Lo que necesites: la figura del Halo. |

## Los atajos

`shortcut` muestra el atajo. Hacerlo funcionar es de tu app: escucha el teclado y llama a la misma función que el ítem.
