---
component: Skeleton
tab: Código
summary: Cómo usar Skeleton en React.
---


## Uso

```js
const { Skeleton } = window.AlmaDS;
h(Skeleton, { label: 'Cargando tus viajes', lines: 3 })
h(Skeleton, { shape: 'block', height: 160 })
h(Skeleton, { shape: 'circle' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `shape` | `'text' \| 'block' \| 'circle'` | `'text'` | Forma. |
| `lines` | `number` | `3` | Líneas de texto (solo con `shape: 'text'`). |
| `width` / `height` | `string \| number` | — | Tamaño. |
| `label` | `string` | `'Cargando contenido'` | Lo oye el lector. |
