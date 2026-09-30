---
component: Icon
tab: Código
summary: Cómo usar Icon en React.
---


## Uso

```js
const { Icon } = window.AlmaDS;
h(Icon, { name: 'arrow--right' })
h(Icon, { name: 'warning', variant: 'filled', size: 20, label: 'Advertencia' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `name` | `string` | — | Nombre de Carbon. |
| `variant` | `'outlined' \| 'filled'` | `'outlined'` | — |
| `size` | `16 \| 20 \| 24 \| 32` | `24` | En px; se dibuja en rem. |
| `color` | `string` | — | Mejor heredarlo; si lo pasas, usa un token (`var(--icon-02)`). |
| `label` | `string` | — | Nombre para el lector. |
| `className` | `string` | — | — |

## Más íconos

ALMA incluye 896. Para los 2.775 de Carbon:

```js
fetch('assets/Icons/carbon-icons.json').then(r => r.json()).then(AlmaDS.registerIcons);
```

`registerIcons` solo acepta formas SVG simples y rechaza cualquier otra cosa. `AlmaDS.iconNames()` lista los disponibles. Los nombres anteriores de Material Symbols siguen funcionando, con un aviso en la consola.
