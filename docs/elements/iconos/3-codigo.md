---
element: Íconos
order: 5
tab: Código
summary: Íconos de IBM Carbon, dibujados como SVG dentro de la página.
---

## Componente `Icon`

```js
const { Icon } = window.AlmaDS;
h(Icon, { name: 'arrow--right' })                       // decorativo: oculto para lectores
h(Icon, { name: 'warning', variant: 'filled', size: 20, label: 'Advertencia' })
```

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `name` | `string` | — | Nombre de Carbon, como `arrow--right`. |
| `variant` | `'outlined' \| 'filled'` | `'outlined'` | `filled` usa la versión `--filled` si existe. |
| `size` | `16 \| 20 \| 24 \| 32` | `24` | En px; se dibuja en rem. |
| `label` | `string` | — | Nombre para el lector. Sin él, el ícono es decorativo. |

## Íconos fuera del set incluido

Carga el catálogo completo una vez y usa cualquier nombre:

```js
fetch('assets/Icons/carbon-icons.json').then(r => r.json()).then(AlmaDS.registerIcons);
AlmaDS.iconNames();   // los nombres disponibles
```

`registerIcons` solo acepta formas SVG simples y rechaza cualquier otra cosa.

## Nombres anteriores

Los nombres de Material Symbols que usaban los componentes (`arrow_forward`, `content_copy`…) siguen funcionando durante la transición, con un aviso en la consola que dice el nombre de Carbon. Cámbialos.
