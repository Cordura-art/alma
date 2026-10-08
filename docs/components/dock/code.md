---
component: Dock
tab: Código
summary: Cómo usar Dock en React.
---


## Uso

```js
const { Dock } = window.AlmaDS;

h(Dock, {
  label: 'Aplicaciones',
  items: [
    { id: 'viajes', label: 'Viajes', icon: 'ticket', running: true, active: true, onOpen: abrirViajes,
      menu: [{ value: 'nuevo', label: 'Nuevo viaje…' }, { value: 'salir', label: 'Salir' }] },
    { id: 'asistente', label: 'Asistente', icon: 'ai-label', badge: 2, onOpen: abrirAsistente },
    { separator: true },
    { id: 'ajustes', label: 'Ajustes', icon: 'settings', onOpen: abrirAjustes }
  ],
  onAction: function (accion, app) { hacer(accion, app); }
})
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | lista | — | Las apps y los separadores. |
| `onOpen` | `(id) => void` | — | Se llama al tocar una app, además de su `onOpen`. |
| `onAction` | `(value, id) => void` | — | Recibe el ítem elegido en el menú de una app. |
| `label` | texto | «Dock» | El nombre de la barra. |

## Cada app

| Campo | Tipo | Uso |
|---|---|---|
| `id`, `label` | texto | Su identificador y su nombre. |
| `icon` | texto | Su ícono. |
| `node` | contenido | En vez del ícono: un pictograma de la entidad. |
| `running` | sí o no | Está abierta: lleva el punto. |
| `active` | sí o no | Es la que está al frente. |
| `badge` | número o texto | El contador. |
| `onOpen` | función | Al tocarla. |
| `menu` | lista de ítems | Su menú. Los ítems con `disabled` no aparecen. |
