---
component: Accordion
tab: Código
summary: Cómo usar Accordion en React.
---


## Uso

```js
const { Accordion } = window.AlmaDS;
h(Accordion, { headingLevel: 2, defaultOpen: ['equipaje'], items: [
  { id: 'equipaje', title: '¿Cuánto equipaje puedo llevar?', content: h('p', null, 'Una maleta de hasta 20 kg y un bolso de mano.') },
  { id: 'cambio', title: '¿Puedo cambiar la fecha?', content: h('p', null, 'Sí, hasta 4 horas antes de la salida.') }] })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | `Array<{ id, title, content, disabled? }>` | — | Las secciones. |
| `defaultOpen` | `string[]` | `[]` | Ids abiertos al inicio. |
| `allowMultiple` | `boolean` | `true` | `false`: una sola abierta. |
| `onChange` | `(open: string[]) => void` | — | Recibe las abiertas. |
| `headingLevel` | `2–6` | `3` | Nivel de los títulos. |
| `id` | `string` | automático | — |
