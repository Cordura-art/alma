# LiveActivity

Algo que tiene principio y fin, seguido de un vistazo sin abrir su app.


## Uso

### Resumen

`LiveActivity` sigue algo que está pasando: un viaje, un pedido, una tarea de un agente. Vive fuera de su app, en la barra de menús o sobre el escritorio, y se actualiza mientras dura. Es la *Live Activity* de Apple.

Antes de usarla, lee el patrón **Entorno** y la guía **Interfaces de IA › Estados**.

### Cuándo usarla

- Para algo con **principio y fin**, que dura de minutos a unas horas.
- Para la tarea larga de un agente: es donde se ve qué paso va, sin tener abierta su ventana.

### Cuándo no

- Para algo que no termina: eso es un `Widget`.
- Para avisar de un hecho puntual: eso es un `ToastRegion`.
- Para publicidad o promociones. Nunca.
- Con información delicada a la vista. Muestra un resumen neutro y deja el detalle para la app.

### Tres presentaciones

![Las tres presentaciones de LiveActivity. Mínima: un anillo de avance. Compacta: el anillo, el nombre «Viña del Mar» y «42 min». Expandida: el ícono, el nombre y el detalle, la cifra grande, una barra de avance, la lista de pasos con su estado y el botón «Detener».](assets/Componentes/live-activity-presentaciones.png)

| Presentación | Qué muestra | Cuándo |
|---|---|---|
| **Mínima** | Un ícono, o un anillo de avance. | Cuando hay varias actividades a la vez. |
| **Compacta** | El anillo, un nombre corto y la cifra que importa. | Una sola actividad, en la barra de menús. |
| **Expandida** | Nombre, detalle, cifra, avance, pasos y acciones. | Al tocar la compacta, o fija sobre el escritorio. |

La mínima y la compacta se expanden al tocarlas.

### Contenido

- **Lo que se necesita de un vistazo**, no todo. El resto está en la app.
- **Una cifra:** cuánto falta, o cuánto va. «42 min», «3 de 4».
- **Texto grande y con peso.** Se lee de lejos y de pasada.
- **Solo lo necesario de alto.** Si hay poco que decir, es más baja; crece cuando hay más.
- **Los pasos**, cuando es una tarea de varios: hechos, en curso y por hacer.
- **Una o dos acciones:** la que más se necesita, y «Detener» si se puede parar.

### Cuándo termina

Al terminar, muestra el resultado («Llegaste», «Pasaje cambiado») y se retira sola a los pocos minutos, o cuando la persona la cierra. No se queda para siempre.

### El agente de una IA

Una tarea de un agente es una actividad en vivo: tiene principio, pasos y fin. `steps` muestra en qué va, y «Detener» está siempre. Cuando el agente necesita permiso, lo pide con un `Snippet` de confirmación; la actividad lo muestra como su paso en curso.

### Relacionados

`Widget` · `Snippet` · `MenuBar` · `ProgressBar` · `ChatMessage` · Entorno · Interfaces de IA.

### Referencias

- Apple, Human Interface Guidelines: Live Activities.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Compacta y mínima | fondo | `ui-03`; `hover-ui` bajo el cursor |
| Expandida | fondo | Vidrio medio (`glass-regular`) |
| Nombre, cifra | color | `text-01` |
| Detalle, pasos por hacer | color | `text-02` |
| Anillo y barra, lo avanzado | color | `interactive-01` |
| Anillo, lo que falta | color | `border-control` |
| Paso en curso | indicador | `interactive-01` |
| Foco | contorno | `focus` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Compacta | 13 / 0,8125 | `font-weight-body`; la cifra, `font-weight-emphasis` |
| Nombre | 14 / 0,875 | `font-weight-emphasis` |
| Detalle | 12 / 0,75 | `font-weight-body` |
| Cifra, expandida | 20 / 1,25, cifras del mismo ancho | `font-weight-heading` |
| Pasos | 14 / 0,875 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Compacta y mínima | alto | 24 px, para caber en la barra de menús |
| Compacta | radio | `radius-pill` |
| Anillo | tamaño | 16 px |
| Expandida | ancho | 20 rem |
| Expandida | relleno | `space-16` |
| Expandida | radio | El doble de `radius-panel` |
| Partes de la expandida | separación | `space-16` |
| Pasos | separación | `space-8` |

### Movimiento

El anillo y la barra avanzan sin animación propia. El indicador del paso en curso es el de `ActivityIndicator`, que respeta el movimiento reducido.

## Código

### Uso

```js
const { LiveActivity, MenuBar } = window.AlmaDS;

// En la barra de menús
h(MenuBar, { appName: 'Viajes', menus: menus, extras: [
  { node: h(LiveActivity, { icon: 'bus', label: 'Viaje a Viña del Mar', short: 'Viña del Mar', value: '42 min', progress: 0.6 }) }
] })

// La tarea de un agente, fija sobre el escritorio
h(LiveActivity, {
  presentation: 'expanded', icon: 'ai-label', label: 'Cambiando tu pasaje', value: '3 de 4',
  steps: [
    { label: 'Buscar tu pasaje', state: 'done' },
    { label: 'Cambiar la fecha', state: 'current' },
    { label: 'Avisar a Tomás', state: 'todo' }],
  actions: [{ label: 'Detener', role: 'destructive', onPress: detener }],
  announce: anuncio
})
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | texto | — | Qué es. Obligatorio. |
| `short` | texto | `label` | El nombre corto, para la compacta. |
| `value` | texto | — | La cifra que importa. |
| `detail` | texto | — | Una línea más, en la expandida. |
| `icon` | texto | — | Su ícono. |
| `progress` | número, de 0 a 1 | — | Cuánto va. Dibuja el anillo y la barra. |
| `presentation` | `minimal`, `compact`, `expanded` | `compact` | Cómo se presenta. `expanded` queda fija y abierta. |
| `steps` | `[{ label, state }]` | — | Los pasos. `state`: `done`, `current`, `todo`. |
| `actions` | `[{ label, onPress, role, primary }]` | — | Una o dos acciones. |
| `children` | contenido | — | Más contenido, en la expandida. |
| `announce` | texto | — | Lo que se le dice a un lector de pantalla. Cámbialo solo cuando algo importante pasa. |
| `expanded`, `defaultExpanded`, `onExpandedChange` | — | — | Para controlar si está abierta. |

## Accesibilidad

### Qué ofrece ALMA

- **La compacta es un botón con todo en su nombre:** «Viaje a Viña del Mar, 42 min, 60 %».
- **Dice si está expandida.**
- **No interrumpe.** Un dato que cambia cada minuto no se anuncia cada minuto. Se anuncia solo lo que pases en `announce`.
- **El avance es una barra de progreso** con su valor.
- **Cada paso dice su estado** con palabras: hecho, en curso, por hacer.
- **El avance no depende del color:** va también en cifras.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega a la actividad, y a sus acciones si está expandida. |
| Enter, Espacio | Expande o pliega. |

### Recomendaciones de diseño

- Anuncia los hitos, no el reloj: «Tu bus salió», «Faltan 10 minutos», «Llegaste».
- «Detener» siempre a la vista en la expandida, si la tarea se puede parar.
- La compacta mide 24 px de alto: es el mínimo de toque. No la achiques.

### Consideraciones de desarrollo

- Cambia `announce` solo cuando pasa algo que la persona querría saber aunque no esté mirando.
- Al terminar, anuncia el resultado y retira la actividad después. No la quites sin decir cómo terminó.

Pendiente: VoiceOver y NVDA.
