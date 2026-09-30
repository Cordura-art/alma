---
component: ActivityIndicator
tab: Código
summary: Cómo usar ActivityIndicator en React.
---


## Uso

```js
const { ActivityIndicator } = window.AlmaDS;
h(ActivityIndicator, { label: 'Verificando pago' })
h(ActivityIndicator, { size: 40, label: 'Buscando viajes' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | `'Cargando'` | Qué se está haciendo; lo oye el lector. |
| `size` | `number` (px) | `24` | Tamaño de la caja. |
