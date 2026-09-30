---
component: Toolbar
tab: Código
summary: Cómo usar Toolbar en React.
---


## Uso

```js
const { Toolbar, SearchField } = window.AlmaDS;
h(Toolbar, { title: 'Mis viajes', sticky: true, onBack: goBack,
  search: h(SearchField, { placeholder: 'Buscar viajes o ciudades', onChange: setQuery }),
  actions: [{ label: 'Filtrar', icon: 'filter', onPress: openFilters }],
  moreActions: ['Exportar…', { value: 'borrar', label: 'Borrar historial', role: 'destructive' }],
  onMoreAction: handleMore })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | `string` | — | Título de la vista. Se dibuja como `h1`. |
| `onBack` / `backLabel` | `() => void` / `string` | — / `'Volver'` | Muestra Volver. |
| `search` | `node` | — | Un `SearchField`. |
| `actions` | `Array<{ label, icon, text?, variant?, role?, onPress }>` | — | Acciones frecuentes. Con `text: true` se ve la etiqueta; si no, es un botón de ícono con `label` como nombre. |
| `moreActions` / `onMoreAction` | `MenuOption[]` / `(value) => void` | — | El menú Más. |
| `sticky` | `boolean` | `false` | Fija arriba. |
