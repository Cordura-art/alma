---
component: TabBar
tab: Código
summary: Cómo usar TabBar en React.
---


## Uso

```js
const { TabBar } = window.AlmaDS;
h(TabBar, { fixed: true, value: section, onChange: setSection, items: [
  { value: 'inicio', label: 'Inicio', icon: 'home', href: '#inicio' },
  { value: 'viajes', label: 'Viajes', icon: 'bus', href: '#viajes', badge: 2 },
  { value: 'billetera', label: 'Billetera', icon: 'wallet', href: '#billetera' },
  { value: 'cuenta', label: 'Cuenta', icon: 'user', href: '#cuenta' }] })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | `NavItem[]` | — | De 3 a 5: `{ value, label, icon, href?, badge? }`. |
| `value` / `defaultValue` | `string` | — | La sección actual. |
| `onChange` | `(value) => void` | — | Recibe la sección elegida. |
| `fixed` | `boolean` | `false` | Fija abajo, con el área segura. |
| `label` | `string` | `'Principal'` | Nombre del `nav`. |

`badge`: un número, o `true` para «!».

## Espacio bajo el contenido

Con `fixed`, la barra tapa el final de la página. Deja un relleno inferior de al menos 56 px más el área segura:

```css
main { padding-bottom: calc(56px + env(safe-area-inset-bottom, 0px)); }
```
