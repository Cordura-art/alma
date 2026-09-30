---
component: Sidebar
tab: Código
summary: Cómo usar Sidebar en React.
---


## Uso

```js
const { Sidebar } = window.AlmaDS;
h(Sidebar, { label: 'Secciones', value: area, onChange: setArea, groups: [
  { items: [{ value: 'inicio', label: 'Inicio', icon: 'home' }, { value: 'viajes', label: 'Viajes', icon: 'bus', badge: 3 }] },
  { title: 'Cuenta', items: [{ value: 'ajustes', label: 'Ajustes', icon: 'settings' }] }] })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `groups` | `Array<{ title?, items: NavItem[] }>` | — | Grupos y destinos. |
| `value` / `defaultValue` | `string` | — | El destino actual. |
| `onChange` | `(value) => void` | — | Recibe el destino elegido. |
| `hidden` / `defaultHidden` | `boolean` | `false` | Muestra u oculta el panel. |
| `onHiddenChange` | `(hidden) => void` | — | Al mostrar u ocultar. |
| `label` | `string` | `'Secciones'` | Nombre del `nav`. |

Cada `NavItem` es `{ value, label, icon, href?, badge? }`. Con `href`, el destino es un enlace real y el navegador sigue la dirección; sin él, solo llama a `onChange`.

## Con rutas

```js
{ value: 'viajes', label: 'Viajes', icon: 'bus', href: '#viajes' }
```
