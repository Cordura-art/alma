---
component: LiveActivity
tab: Código
summary: Cómo usar LiveActivity en React.
---


## Uso

```js
const { LiveActivity, MenuBar } = window.AlmaDS;

// En la barra de menús
h(MenuBar, { appName: 'Viajes', menus: menus, extras: [
  { node: h(LiveActivity, { icon: 'bus', label: 'Viaje a Viña del Mar', short: 'Viña del Mar', value: '42 min', progress: 0.6 }) }
] })

// La tarea de un agente, fija sobre el escritorio
h(LiveActivity, {
  presentation: 'expanded', icon: 'ai-label', label: 'Cambiando tu pasaje', value: '3 de 4',
  steps: [
    { label: 'Buscar tu pasaje', state: 'done' },
    { label: 'Cambiar la fecha', state: 'current' },
    { label: 'Avisar a Tomás', state: 'todo' }],
  actions: [{ label: 'Detener', role: 'destructive', onPress: detener }],
  announce: anuncio
})
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | texto | — | Qué es. Obligatorio. |
| `short` | texto | `label` | El nombre corto, para la compacta. |
| `value` | texto | — | La cifra que importa. |
| `detail` | texto | — | Una línea más, en la expandida. |
| `icon` | texto | — | Su ícono. |
| `progress` | número, de 0 a 1 | — | Cuánto va. Dibuja el anillo y la barra. |
| `presentation` | `minimal`, `compact`, `expanded` | `compact` | Cómo se presenta. `expanded` queda fija y abierta. |
| `steps` | `[{ label, state }]` | — | Los pasos. `state`: `done`, `current`, `todo`. |
| `actions` | `[{ label, onPress, role, primary }]` | — | Una o dos acciones. |
| `children` | contenido | — | Más contenido, en la expandida. |
| `announce` | texto | — | Lo que se le dice a un lector de pantalla. Cámbialo solo cuando algo importante pasa. |
| `expanded`, `defaultExpanded`, `onExpandedChange` | — | — | Para controlar si está abierta. |
