# Window

El marco de una app en el escritorio: se mueve, cambia de tamaño, se amplía, se minimiza y se cierra.


## Uso

### Resumen

`Window` es el marco de una app: una barra con sus controles y su título, y un cuerpo con el contenido. Dentro de un `Desktop` se mueve y cambia de tamaño; fuera de uno es una ventana quieta. Es la *window* de Apple.

Antes de usarla, lee el patrón **Entorno**.

### Cuándo usarla

- Para cada app o documento abierto en un `Desktop`.
- Para una tarea que conviene ver junto a otra: escribir un mensaje mientras se lee un pasaje.

### Cuándo no

- Para pedir una decisión o un dato que detiene todo: eso es un `Modal`, un `Sheet` o un `Alert`.
- Para un contenido breve junto a un control: eso es un `Popover`.
- Fuera de un entorno, para «enmarcar» una sección de una página: eso es una `Card`.

### Anatomía

1. **Barra:** por ella se mueve la ventana.
2. **Controles:** cerrar, minimizar y ampliar.
3. **Título:** el nombre de la app o del documento.
4. **Herramientas** (opcional): pocas acciones de la ventana.
5. **Cuerpo:** el contenido.
6. **Pie** (opcional): un dato menor.
7. **Bordes:** por ellos cambia de tamaño.

![Anatomía de Window: la barra (1) con los controles de cerrar, minimizar y ampliar (2), el título «Viajes» al centro (3) y un botón de buscar a la derecha (4); debajo el cuerpo con una tarjeta de viaje (5) y, al final, un pie que dice «1 viaje» (6).](assets/Componentes/window-anatomia.png)

### Tipos

| Tipo | `kind` | Para |
|---|---|---|
| **Principal** | — | La ventana de una app, con su navegación. |
| **Auxiliar** | — | Una sola tarea. No lleva a otras partes de la app, y se cierra al terminar. |
| **Panel** | `panel` | El detalle de lo seleccionado en otra ventana. Menor, toda de vidrio, sin ampliar. |

### Estados

![Dos ventanas iguales. La de la izquierda está activa: su barra es de vidrio, su borde está marcado, su título y sus controles tienen todo el color, y lleva sombra. La de la derecha está inactiva: barra opaca, borde tenue, título y controles en gris, sin sombra.](assets/Componentes/window-estados.png)

| Estado | Qué es | Cómo se ve |
|---|---|---|
| **Activa** | La que está al frente y recibe el teclado. Una sola. | Barra de vidrio, borde marcado, título en `text-01`, controles en `icon-01`, sombra. |
| **Inactiva** | Las demás. | Toda la ventana bajo un velo. Barra opaca, borde tenue, título en `text-02`, controles en `icon-02`, sin sombra. |
| **Ampliada** | Ocupa todo el escritorio. | Sin radio ni bordes laterales. |
| **Minimizada** | No se ve. Vuelve desde el dock o el menú Ventana. | — |

Tocar una ventana inactiva, o llegar a ella con el teclado, la trae al frente.

### Comportamiento

- **Mover:** arrastrando la barra, o con las flechas cuando la barra tiene el foco.
- **Cambiar de tamaño:** arrastrando un borde o una esquina de abajo, o con Mayúsculas + flechas.
- **Ampliar:** con su control, o con doble clic en la barra.
- **No se pierde:** sus controles siempre quedan a la vista dentro del escritorio. Puede salirse por la derecha y por abajo, nunca por la izquierda ni por arriba.
- **En pantalla angosta:** ocupa todo, y no se mueve ni cambia de tamaño.

### Contenido

- **El título es corto:** el nombre de la app, o del documento. Sin versión ni ruta.
- **Pocas herramientas en la barra.** El resto de los comandos está en la barra de menús.
- **Nada importante en el pie:** es lo primero que queda fuera de la vista.

### Relacionados

`Desktop` · `MenuBar` · `Dock` · `Modal` · `Sheet` · Entorno · Profundidad.

### Referencias

- Apple, Human Interface Guidelines: Windows, Panels.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Cuerpo | fondo | `ui-02` |
| Barra, ventana activa | fondo | Vidrio medio (`glass-regular`) |
| Barra, ventana inactiva | fondo | `ui-01` |
| Borde de la ventana activa | color | `border-control` |
| Borde de la ventana inactiva, y de la barra | color | `border-subtle` |
| Título, activa / inactiva | color del texto | `text-01` / `text-02` |
| Controles, activa / inactiva | color | `icon-01` / `icon-02` |
| Control bajo el cursor | fondo | `hover-ui` |
| Ventana activa | sombra | `shadow-floating` |
| Panel | fondo | Vidrio medio, entero |
| Foco | contorno | `focus` |

Los controles no llevan colores propios: son íconos de Carbon (`close`, `subtract`, `maximize`), y se distinguen por su forma.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 14 / 0,875 | `font-weight-emphasis` |
| Pie | 12 / 0,75 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Ventana | radio | `radius-panel` |
| Ventana | tamaño mínimo | 240 × 160 px |
| Ventana | tamaño inicial | 480 × 360 px |
| Barra | alto | 40 px; 32 px en un panel |
| Barra | relleno a los lados | `space-8` |
| Control | tamaño | 24 × 24 px |
| Controles | separación | `space-4` |
| Borde que responde | ancho | 8 px; 16 px en las esquinas |
| Pie | relleno | `space-4` y `space-16` |

### Movimiento

Mover y cambiar de tamaño siguen al puntero, sin animación. La ventana no rebota ni se desliza sola.

## Código

### Uso

```js
const { Desktop, Window } = window.AlmaDS;

h(Desktop, { label: 'Escritorio' },
  h(Window, {
    title: 'Viajes',
    defaultPosition: { x: 40, y: 32 }, defaultSize: { w: 420, h: 360 },
    minimized: minimizada,
    onClose: cerrar, onMinimize: minimizar,
    bottomBar: '2 viajes'
  }, contenido))
```

La ventana guarda su lugar y su tamaño. Quién está abierta o minimizada lo decide tu app: `Window` avisa con `onClose` y `onMinimize`.

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | texto | — | El título. Obligatorio: es el nombre de la ventana. |
| `children` | contenido | — | El cuerpo. |
| `open` | sí o no | sí | Si existe. |
| `minimized` | sí o no | no | Si está minimizada. |
| `onClose` | función | — | Muestra el control de cerrar. |
| `onMinimize` | función | — | Muestra el control de minimizar. |
| `zoomable` | sí o no | sí | Con `false`, no se puede ampliar. |
| `resizable` | sí o no | sí | Con `false`, no cambia de tamaño. |
| `kind` | `panel` | — | Un panel: menor y de vidrio. |
| `defaultPosition` | `{ x, y }` | En cascada | Dónde aparece, en px desde la esquina del escritorio. |
| `defaultSize` | `{ w, h }` | 480 × 360 | Su tamaño inicial. |
| `minSize` | `{ w, h }` | 240 × 160 | El menor tamaño. |
| `defaultZoomed` | sí o no | no | Si aparece ampliada. |
| `frontKey` | cualquiera | — | Cuando cambia, la ventana pasa al frente. Para traerla desde el dock o un menú. |
| `toolbar` | contenido | — | Herramientas, al final de la barra. |
| `bottomBar` | contenido | — | El pie. |
| `onChange` | función | — | Recibe `{ x, y, w, h }` al mover o cambiar de tamaño. |
| `active` | sí o no | sí | Fuera de un `Desktop`: si se dibuja activa. |

### Fuera de un escritorio

Sin un `Desktop` alrededor, `Window` es una ventana quieta: ni se mueve ni cambia de tamaño. Sirve para mostrar una en un documento.

## Accesibilidad

### Qué ofrece ALMA

- **Es un diálogo no modal con nombre:** su título. Un lector puede saltar de ventana en ventana.
- **Se mueve y cambia de tamaño sin arrastrar:** con las flechas, desde su barra. Y «Ampliar» es un botón.
- **La barra explica sus teclas** a un lector de pantalla al recibir el foco.
- **Los controles tienen nombre completo:** «Cerrar Viajes», no «Cerrar».
- **Llegar a una ventana con el teclado la trae al frente.** Nunca se escribe en una ventana tapada.
- **Cuando una ventana pasa al frente desde otro lado** (el dock, un menú), recibe el foco.
- **Los controles nunca quedan fuera del escritorio:** la ventana siempre se puede alcanzar y cerrar.
- **Activa e inactiva** se distinguen por el título, los controles y la sombra, no solo por un color.

### Teclado

| Tecla | Dónde | Qué hace |
|---|---|---|
| Tab | En la ventana | Barra, controles, herramientas y contenido. |
| Flechas | En la barra | Mueven la ventana, de a 16 px. |
| Mayúsculas + flechas | En la barra | Cambian su tamaño, de a 16 px. |
| Enter, Espacio | En un control | Cierra, minimiza o amplía. |

### Recomendaciones de diseño

- El título tiene que distinguir la ventana de las demás. Dos ventanas «Sin título» no se pueden diferenciar al oído.
- No dependas de que dos ventanas se vean a la vez para entender algo: en pantalla angosta se ve una.
- El contenido tiene que servir al tamaño mínimo de la ventana.

### Consideraciones de desarrollo

- Al cerrar una ventana, lleva el foco a un lugar con sentido: otra ventana, o su app en el dock.
- No atrapes el foco en una ventana. No es modal: se puede salir con Tab.
- Pon los comandos de la ventana también en el menú Ventana de `MenuBar`.

Pendiente: VoiceOver y NVDA; arrastrar con el dedo en una tableta real.
