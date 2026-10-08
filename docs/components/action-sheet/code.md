---
component: ActionSheet
tab: Código
summary: Cómo usar ActionSheet en React.
---


## Uso

```js
const { ActionSheet } = window.AlmaDS;

h(ActionSheet, {
  open: abierta,
  title: '¿Qué hacemos con el borrador?',
  actions: [
    { label: 'Guardar borrador', onPress: guardar },
    { label: 'Descartar borrador', role: 'destructive', onPress: descartar },
    { label: 'Seguir escribiendo', role: 'cancel', onPress: cerrar }]
})
```

El orden en que las escribes no importa: la destructiva va arriba y «cancelar» abajo.

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `open` | sí o no | no | Si se muestra. |
| `title` | texto | — | La pregunta, en una línea. |
| `message` | texto | — | Una aclaración, si hace falta. |
| `actions` | `[{ label, role, icon, disabled, onPress }]` | — | Las opciones. `role`: `destructive` o `cancel`. |
| `onDismiss` | función | — | Se llama con Esc o al tocar el velo, si no hay una acción `cancel`. |
| `aria-label` | texto | «Opciones» | El nombre, si no hay título. |
| `inline` | sí o no | no | La dibuja en su lugar, sin velo: para documentar. |

Con Esc o al tocar el velo se llama al `onPress` de la acción `cancel`.
