---
component: ControlCenter
tab: Código
summary: Cómo usar ControlCenter en React.
---


## Uso

```js
h(ControlCenter, { controls: [
  { id: 'avisos', label: 'Avisos', icon: 'notification', value: avisos ? 'Activados' : 'En silencio', checked: avisos, onChange: setAvisos },
  { id: 'tema', label: 'Tema oscuro', icon: 'asleep', size: 'wide', checked: oscuro, onChange: setOscuro },
  { id: 'ajustes', label: 'Ajustes', icon: 'settings', onPress: abrirAjustes }
] })
```

Un control con `checked` es un interruptor. Sin él, un botón.

## Propiedades de un control

| Campo | Tipo | Uso |
|---|---|---|
| `label`, `icon` | texto | Su título y su símbolo. |
| `value` | texto | Cómo está. |
| `checked`, `onChange` | sí o no, función | Un interruptor. |
| `onPress` | función | Un botón. |
| `size` | `wide` | Ocupa las dos columnas. |
| `disabled` | sí o no | — |
