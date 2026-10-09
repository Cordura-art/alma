# Desktop

El escenario del entorno: lleva el fondo, la barra de menús, el dock y las ventanas, y las ordena.


## Uso

### Resumen

`Desktop` es el escritorio: el lugar donde viven las ventanas. Lleva un fondo, una `MenuBar` arriba y un `Dock` abajo, sabe qué ventana está al frente y se adapta cuando la pantalla es angosta.

Antes de usarlo, lee el patrón **Entorno**.

### Cuándo usarlo

- Para el entorno de una entidad: varias apps que se abren en ventanas.
- Para una herramienta donde se trabaja con varias cosas a la vez.

### Cuándo no

- Para un sitio o una app de una sola tarea. Ahí la estructura es `Toolbar`, `Sidebar` o `TabBar`.
- Dentro de otro `Desktop`.

### Anatomía

1. **Fondo:** un color, o un efecto de ALMA.
2. **Barra de menús** (`MenuBar`).
3. **Ventanas** (`Window`).
4. **Dock.**

![Un escritorio con sus partes numeradas. Detrás, un fondo de luz (1). Arriba, la barra de menús con el nombre de la app, sus menús y, a la derecha, los avisos y la hora (2). En el centro, dos ventanas que se superponen: «Viajes» detrás y «Asistente» al frente (3). Abajo al centro, el dock con tres apps, dos con un punto debajo (4).](assets/Componentes/desktop-anatomia.png)

### El fondo

- Es decoración: no lleva texto ni controles.
- Puede ser un efecto de ALMA. Si es la presencia de una IA, es la única luz del entorno: el Velo mientras la IA está de fondo, y el Halo sobre él cuando su ventana pasa al frente.
- Las ventanas y las barras son de vidrio sobre él: se leen igual con cualquier fondo.

### El orden de las ventanas

- La última ventana que se tocó, se enfocó o se abrió está al frente.
- Al cerrar o minimizar la del frente, pasa al frente la anterior.
- El orden es del escritorio; quién está abierta, de tu app.

### En una pantalla angosta

Bajo 672 px de ancho, el escritorio muestra una ventana a la vez, a todo el tamaño. Lo mide en su propio ancho, no en el de la pantalla: un escritorio dentro de un panel angosto también se adapta.

### Relacionados

`Window` · `MenuBar` · `Dock` · Entorno · Profundidad · Diseño adaptable.

### Referencias

- Apple, Human Interface Guidelines: Windows, Multitasking.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Escritorio | fondo | `ui-02`, o lo que traiga `wallpaper` |
| Texto | color | `text-01` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Escritorio | alto mínimo | 30 rem |
| Barra de menús | alto | 32 px, arriba |
| Zona de ventanas | posición | Bajo la barra de menús, hasta el borde inferior |
| Dock | posición | Abajo al centro, a `space-8` del borde |
| Ventana ampliada, con dock | margen inferior | 80 px, para no quedar bajo el dock |
| Cambio a pantalla angosta | ancho del escritorio | Menos de 672 px |

### Capas

| Capa | Qué |
|---|---|
| 0 | Fondo |
| 1 | Ventanas, en su orden |
| 3 | Barra de menús y dock |

Nada sale del escritorio: lo que no cabe se recorta.

## Código

### Uso

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

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `children` | `Window` | — | Las ventanas. |
| `menuBar` | `MenuBar` | — | La barra de menús. |
| `dock` | `Dock` | — | El dock. |
| `wallpaper` | contenido | — | El fondo. Se dibuja detrás de todo y no se lee. |
| `label` | texto | «Escritorio» | El nombre de la región. |
| `style`, `className` | — | — | Para darle su alto y su lugar. |

### El fondo con la presencia de una IA

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

## Accesibilidad

### Qué ofrece ALMA

- **Es una región con nombre**, y dentro de ella cada pieza tiene el suyo: la barra de menús, cada ventana, el dock.
- **El orden de lectura es el del uso:** barra de menús, ventanas, dock.
- **El fondo no se lee.** Es decoración.
- **En pantalla angosta, las ventanas que no se ven no existen** para el teclado ni para un lector.
- **No atrapa nada:** con Tab se entra y se sale del escritorio.

### Teclado

Ver la tabla del patrón **Entorno**: cada pieza tiene sus teclas.

### Recomendaciones de diseño

- Un escritorio pide más de la persona que una página. Úsalo cuando ver varias cosas a la vez de verdad ayude.
- No dependas del lugar de una ventana para decir algo: quien usa un lector no ve dónde está.
- El fondo no puede bajar el contraste de nada. Por eso todo lo que se lee va sobre vidrio o sobre una superficie opaca.

### Consideraciones de desarrollo

- Dale al escritorio un `label` que lo distinga si hay más de una región en la página.
- Si el fondo es un efecto, respeta el movimiento reducido: los de ALMA ya lo hacen.
- Guarda el estado de las ventanas (abiertas, lugar, tamaño) para que el entorno vuelva como estaba.

Pendiente: VoiceOver y NVDA.
