---
component: Desktop
tab: Código
summary: Cómo usar Desktop en React.
---


## Uso

```js
const { Desktop, Window, MenuBar, Dock } = window.AlmaDS;

h(Desktop, {
  label: 'Escritorio de Cordura',
  style: { height: '100dvh' },
  wallpaper: h(Fondo),
  menuBar: h(MenuBar, { appName: 'Viajes', menus: menus, extras: extras }),
  dock: h(Dock, { items: apps })
},
  abiertas.map(function (app) {
    return h(Window, { key: app.id, title: app.nombre, minimized: app.minimizada, frontKey: app.llamada,
      onClose: function () { cerrar(app.id); }, onMinimize: function () { minimizar(app.id); } }, app.contenido);
  }))
```

Dale un alto: el escritorio no crece con lo que lleva dentro.

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `children` | `Window` | — | Las ventanas. |
| `menuBar` | `MenuBar` | — | La barra de menús. |
| `dock` | `Dock` | — | El dock. |
| `wallpaper` | contenido | — | El fondo. Se dibuja detrás de todo y no se lee. |
| `label` | texto | «Escritorio» | El nombre de la región. |
| `style`, `className` | — | — | Para darle su alto y su lugar. |

## El fondo con la presencia de una IA

```js
function Fondo() {
  var ref = React.useRef(null);
  React.useEffect(function () {
    var luz = AlmaEfectos.presencia(ref.current, 'reposo');
    return function () { if (luz) luz.quita(); };
  }, []);
  return h('div', { ref: ref });
}
```
