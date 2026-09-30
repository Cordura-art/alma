---
component: ProgressLine
tab: Código
summary: Cómo usar ProgressLine en React.
---


## Uso

```js
const { ProgressLine } = window.AlmaDS;
h(ProgressLine, { status: paying ? 'loading' : 'success', label: paying ? 'Validando pago' : 'Pago aprobado' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `status` | `'loading' \| 'success'` | `'loading'` | Estado. |
| `label` | `string` | `'Cargando'` / `'Listo'` | Lo oye el lector. |
