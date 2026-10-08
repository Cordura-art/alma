# Dock

Las apps del entorno, a un toque: cuáles hay, cuáles están abiertas y sus atajos.


## Uso

### Resumen

`Dock` es la fila de apps al pie del escritorio. Tocar una la abre o trae su ventana al frente. Un punto marca las que están abiertas, y el menú de cada una ofrece sus atajos.

Antes de usarlo, lee el patrón **Entorno**.

### Cuándo usarlo

- En un `Desktop`, para abrir apps y pasar de una a otra.

### Cuándo no

- Para las secciones de una sola app: eso es una `TabBar` o una `Sidebar`.
- Para acciones: un dock abre cosas, no hace cosas.

### Anatomía

1. **App:** su ícono, sobre una base.
2. **Punto:** la app está abierta.
3. **Contador** (opcional): cuánto hay sin ver.
4. **Separador** (opcional): entre las apps y lo demás.
5. **Menú de la app**, con clic derecho.

![Anatomía de Dock: cuatro apps en fila (1); la primera tiene un punto debajo porque está abierta (2), la segunda un contador con un 2 (3). Después de un separador (4) está Ajustes. Sobre la primera app está abierto su menú, con «Mostrar» y «Salir» (5).](assets/Componentes/dock-anatomia.png)

### Contenido

- **De cuatro a ocho apps.** Con más, el dock se desplaza y deja de leerse de un vistazo.
- **Cada app se reconoce por su ícono.** Su nombre aparece al pasar el cursor y lo lee un lector.
- **El orden lo pone la persona**, o es fijo. No cambia solo.
- **El contador es para lo que la persona pidió seguir.** No para llamar la atención.

### El menú de una app

- Sus atajos: «Nuevo viaje», «Mostrar», «Salir».
- Cortos, y también disponibles en otra parte: no todo el mundo usa el clic derecho.
- En un menú contextual, lo que no aplica no aparece. «Salir» no está si la app no está abierta.

### En una pantalla angosta

El dock se queda abajo. Es la manera de pasar de una app a otra cuando solo se ve una ventana.

### Relacionados

`Desktop` · `Window` · `MenuBar` · `ContextMenu` · `TabBar` · Entorno.

### Referencias

- Apple, Human Interface Guidelines: Dock menus, Home Screen quick actions.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Dock | fondo | Vidrio medio (`glass-regular`) |
| Dock | sombra | `shadow-floating` |
| Base de una app | fondo | `ui-03`; `hover-ui` bajo el cursor |
| Ícono | color | `icon-01` |
| Ícono de la app al frente | color | `interactive-01` |
| Punto de app abierta | color | `text-01` |
| Contador | fondo y texto | `interactive-01` y `text-on-interactive` |
| Separador | color | `border-subtle` |
| Foco | contorno | `focus` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Base de una app | tamaño | 48 × 48 px |
| Base | radio | `radius-panel` |
| Ícono | tamaño | `icon-size-24` |
| Apps | separación | `space-8` |
| Dock | relleno | `space-8` |
| Dock | radio | El doble de `radius-panel` |
| Punto | tamaño | 4 px |
| Contador | alto | 18 px |
| Dock y borde del escritorio | distancia | `space-8` |

### Movimiento

Al presionar, la base se encoge un 6 % con `duration-fast-02`. Con movimiento reducido, no.

## Código

### Uso

```js
const { Dock } = window.AlmaDS;

h(Dock, {
  label: 'Aplicaciones',
  items: [
    { id: 'viajes', label: 'Viajes', icon: 'ticket', running: true, active: true, onOpen: abrirViajes,
      menu: [{ value: 'nuevo', label: 'Nuevo viaje…' }, { value: 'salir', label: 'Salir' }] },
    { id: 'asistente', label: 'Asistente', icon: 'ai-label', badge: 2, onOpen: abrirAsistente },
    { separator: true },
    { id: 'ajustes', label: 'Ajustes', icon: 'settings', onOpen: abrirAjustes }
  ],
  onAction: function (accion, app) { hacer(accion, app); }
})
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | lista | — | Las apps y los separadores. |
| `onOpen` | `(id) => void` | — | Se llama al tocar una app, además de su `onOpen`. |
| `onAction` | `(value, id) => void` | — | Recibe el ítem elegido en el menú de una app. |
| `label` | texto | «Dock» | El nombre de la barra. |

### Cada app

| Campo | Tipo | Uso |
|---|---|---|
| `id`, `label` | texto | Su identificador y su nombre. |
| `icon` | texto | Su ícono. |
| `node` | contenido | En vez del ícono: un pictograma de la entidad. |
| `running` | sí o no | Está abierta: lleva el punto. |
| `active` | sí o no | Es la que está al frente. |
| `badge` | número o texto | El contador. |
| `onOpen` | función | Al tocarla. |
| `menu` | lista de ítems | Su menú. Los ítems con `disabled` no aparecen. |

## Accesibilidad

### Qué ofrece ALMA

- **Es una barra de herramientas con nombre.** Una sola parada de Tab; las flechas pasan de app en app.
- **Cada app dice su nombre y su estado:** «Viajes, abierta», «Asistente, 2 sin ver».
- **El punto y el contador no dependen del color:** el estado va también en el nombre.
- **El menú de cada app se abre con el teclado**, con la tecla de menú o Mayúsculas + F10.
- **Las bases miden 48 px.**

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al dock; sale de él. |
| ← → | App anterior o siguiente. |
| Inicio, Fin | Primera o última app. |
| Enter, Espacio | Abre la app, o la trae al frente. |
| Tecla de menú | Abre el menú de la app. |

### Recomendaciones de diseño

- Dos apps no pueden tener el mismo ícono: el nombre no está a la vista.
- El contador dice un número. Un punto de color solo no le dice nada a quien no lo ve.

### Consideraciones de desarrollo

- Al abrir una app desde el dock, su ventana recibe el foco: usa `frontKey` en `Window`.
- Al cerrar la última ventana de una app, devuelve el foco a su lugar en el dock.

Pendiente: VoiceOver y NVDA.
