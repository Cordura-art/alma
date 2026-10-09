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
function Fondo(props) {
  var ref = React.useRef(null), luz = React.useRef(null);
  React.useEffect(function () {
    luz.current = AlmaEfectos.presencia(ref.current, 'fondo');
    return function () { if (luz.current) luz.current.quita(); };
  }, []);
  React.useEffect(function () { if (luz.current) luz.current.estado(props.estado); }, [props.estado]);
  return h('div', { ref: ref });
}

// En el escritorio: el Halo aparece cuando la ventana del asistente está al frente
h(A.Desktop, { wallpaper: h(Fondo, { estado: alFrente ? 'reposo' : 'fondo' }) },
  h(A.Window, { title: 'Asistente', onActiveChange: setAlFrente }, …));
```

La IA de fondo es solo el Velo. El Halo cuesta más de dibujar: aparece cuando la IA pasa al frente y se retira cuando deja de estarlo.
