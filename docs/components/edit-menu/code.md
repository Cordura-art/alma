---
component: EditMenu
tab: Código
summary: Cómo usar EditMenu en React.
---


## Uso

```js
h(EditMenu, {
  items: [{ value: 'copiar', label: 'Copiar', icon: 'copy' }, { value: 'ia', label: 'Preguntar a la IA', icon: 'ai-generate' }],
  onAction: function (accion, texto) { hacer(accion, texto); }
}, contenido)
```

«copiar» copia sola, si no le pasas `onSelect`.

## Propiedades

| Propiedad | Tipo | Uso |
|---|---|---|
| `children` | contenido | El texto que se puede seleccionar. |
| `items` | `[{ value, label, icon, onSelect }]` | Las acciones. Por defecto, «Copiar». |
| `onAction` | `(value, texto) => void` | Recibe la acción y el texto seleccionado. |
| `label` | texto | El nombre de la barra. |
