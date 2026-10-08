---
component: PromptInput
tab: Código
summary: Cómo usar PromptInput en React.
---


## Uso

```jsx
const { PromptInput } = window.AlmaDS;

h(PromptInput, {
  placeholder: 'Pregunta por tus viajes',
  busy: enCurso,
  onSubmit: function (pedido) { enviar(pedido); },
  onStop: detener
})
```

`onSubmit` recibe el texto sin espacios al principio ni al final. La caja se vacía sola, salvo que uses `value`.

## Con lo adjunto

```jsx
h(PromptInput, {
  before: archivos.map(function (a) { return h(Tag, { key: a.id, icon: 'document', onRemove: function () { quitar(a.id); } }, a.nombre); }),
  onSubmit: enviar
})
```

## Propiedades

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `onSubmit` | función | — | Recibe el pedido al enviar. |
| `busy` | sí o no | no | Hay una respuesta en curso: el botón es «Detener». |
| `onStop` | función | — | Se llama con «Detener» o con Escape. |
| `label` | texto | «Tu pedido» | El rótulo. |
| `placeholder` | texto | — | El texto de ejemplo. |
| `value`, `defaultValue` | texto | — | El texto, controlado o inicial. |
| `onChange` | función | — | Recibe el texto con cada cambio. |
| `maxRows` | número | 6 | Hasta cuántas líneas crece. |
| `note` | texto, o `false` | «La IA puede equivocarse. Revisa lo importante.» | El aviso. Con `false` no se muestra. |
| `before` | contenido | — | Lo que va arriba de la caja: lo adjunto. |
| `disabled` | sí o no | no | Desactiva la caja y el botón. |
| `sendLabel`, `stopLabel` | texto | «Enviar», «Detener la respuesta» | El nombre del botón en cada caso. |
| `name`, `id` | texto | — | Los del campo. |
