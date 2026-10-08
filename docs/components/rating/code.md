---
component: Rating
tab: Código
summary: Cómo usar Rating en React.
---


## Uso

```js
const { Rating } = window.AlmaDS;

// Para leer
h(Rating, { value: 4.5, showValue: true, count: 1284 })

// Para elegir
h(Rating, { label: 'Valora tu viaje', value: estrellas, onChange: setEstrellas })
```

Con `onChange` es para elegir. Sin él, es para leer.

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `value`, `defaultValue` | número | 0 | La valoración. Para leer admite medios. |
| `max` | número | 5 | Cuántas estrellas. |
| `onChange` | función | — | Recibe la valoración elegida, o 0 al quitarla. |
| `label` | texto | «Tu valoración» | El nombre del grupo, al elegir. |
| `showValue` | sí o no | no | Muestra la cifra junto a las estrellas. |
| `count` | número | — | Cuántas valoraciones hay. |
| `size` | `sm` | — | Más chico, para una lista. |
| `clearable` | sí o no | sí | Si tocar la misma estrella la quita. |
| `disabled` | sí o no | no | — |
