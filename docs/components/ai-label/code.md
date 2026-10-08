---
component: AILabel
tab: Código
summary: Cómo usar AILabel en React.
---


## Uso

```jsx
const { AILabel } = window.AlmaDS;

// Sola
h(AILabel)

// Con su explicación
h(AILabel, {
  what: 'Resumí tu pasaje y los avisos de la empresa.',
  when: 'Hoy, 09:12',
  review: 'Revisa la hora de salida antes de viajar.',
  detailHref: '/ia/como-funciona'
})

// Lo generado que la persona editó
h(AILabel, { edited: true, what: 'Escribí este borrador y tú lo cambiaste.', onRevert: volver })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `what` | texto | — | Qué hizo la IA. |
| `basis` | texto | — | Con qué datos lo hizo. |
| `when` | texto | — | Cuándo se generó. |
| `review` | texto | — | Qué conviene revisar. |
| `children` | contenido | — | Más contenido para la explicación, después de lo anterior. |
| `detailHref` | texto | — | Adónde lleva el enlace al detalle. |
| `detailLabel` | texto | «Cómo funciona» | El texto de ese enlace. |
| `edited` | sí o no | no | La marca dice «IA · editado». |
| `onRevert` | función | — | Muestra en la explicación el botón para volver atrás. |
| `revertLabel` | texto | «Volver al original», o «Volver a la versión de la IA» con `edited` | El texto de ese botón. |
| `size` | `sm`, `md` | `sm` | El tamaño. |
| `title` | texto | «Generado por IA» | El título de la explicación. |
| `placement`, `align` | como en `Popover` | abajo, al inicio | Hacia dónde se abre. |

Sin `what`, `basis`, `when`, `review`, `children` ni `onRevert`, la marca no se abre: es un texto, no un botón.
