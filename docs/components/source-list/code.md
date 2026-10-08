---
component: SourceList
tab: Código
summary: Cómo usar SourceList y SourceRef en React.
---


## Uso

```jsx
const { SourceList, SourceRef } = window.AlmaDS;

h('p', null,
  'Tu bus sale a las 08:30, del andén 4.', h(SourceRef, { n: 1, listId: 'fuentes' }),
  ' El andén puede cambiar.', h(SourceRef, { n: 2, listId: 'fuentes' }))

h(SourceList, { id: 'fuentes', sources: [
  { title: 'Tu pasaje del 31 de marzo', origin: 'Tus viajes', href: '/viajes/8842' },
  { title: 'Aviso de la empresa, 29 de marzo', origin: 'Correo', href: '/correo/311' }
] })
```

El mismo `id` de la lista va como `listId` en cada `SourceRef`: así el número lleva a su fuente.

## Propiedades de SourceList

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `sources` | `[{ title, origin, href, external }]` | — | Las fuentes, en el orden en que aparecen en el texto. Sin fuentes, no dibuja nada. |
| `id` | texto | Se arma solo | Para enlazar los `SourceRef`. |
| `label` | texto | «Fuentes» | El rótulo. |
| `collapseAfter` | número | 5 | Con más fuentes que este número, la lista se pliega. |
| `max` | número | 3 | Cuántas se ven con la lista plegada. |

En cada fuente, `href` es opcional: sin él, el título es texto. `external` abre el enlace en otra pestaña.

## Propiedades de SourceRef

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `n` | número | — | El número de la fuente. |
| `listId` | texto | — | El `id` de la lista: el enlace va a `#<listId>-<n>`. |
| `href` | texto | — | Otro destino, en vez del anterior. |
| `onClick` | función | — | Para abrir la fuente de otra manera. |
