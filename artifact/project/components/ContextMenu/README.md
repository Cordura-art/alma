# ContextMenu

Las acciones de un ítem, en el punto donde se piden: clic derecho, toque largo o la tecla de menú.


## Uso

### Resumen

`ContextMenu` da acceso a las acciones de un ítem sin ocupar lugar en la pantalla. Se abre con clic derecho, con un toque largo o con la tecla de menú, justo donde se pidió. Es el *context menu* de Apple.

Antes de usarlo, lee el patrón **Menús**.

### Cuándo usarlo

- Sobre un ítem de una lista, una tarjeta o un archivo, para sus acciones más usadas.
- Sobre un espacio vacío, para crear algo ahí: «Nueva carpeta».
- En un entorno de escritorio, donde la gente espera el clic derecho.

### Cuándo no

- **Como único lugar de una acción.** Está escondido. Cada ítem suyo tiene que estar también a la vista: en una `Toolbar`, en un `PullDownButton` o en el detalle.
- **Para acciones raras o avanzadas.** Es para lo que más se usa en ese contexto.
- **En un texto seleccionado**, si ya hay un menú de edición. Uno u otro, no los dos.

### Anatomía

1. **El ítem** sobre el que se abre.
2. **El menú**, en el punto donde se pidió.
3. **Grupos**, con un separador entre ellos. Hasta tres.
4. **La acción destructiva**, en rojo y al final.

![Anatomía de ContextMenu: una tarjeta de viaje (1) y, sobre ella, el menú abierto (2) con «Ver pasaje», «Compartir» y «Cambiar fecha…» en un grupo (3) y, separada y en rojo, «Anular viaje» (4).](assets/Componentes/context-menu-anatomia.png)

### Qué muestra

- **Solo lo que aplica.** Un ítem que no se puede usar no aparece. Un menú de botón lo dejaría apagado para que se sepa que existe; aquí estorba.
- **Pocos ítems.** Si hay que desplazarse para leerlo, sobra algo.
- **Sin atajos de teclado.** El menú contextual ya es el atajo.
- **Sin título**, salvo que diga algo que no se ve: «3 viajes seleccionados».
- **Un submenú, de un nivel**, si acorta el menú.
- **Lo destructivo, al final**, en rojo.

### Lo mismo en todas partes

Si un tipo de ítem tiene menú contextual en una pantalla, lo tiene en todas. Si a veces abre y a veces no, la gente deja de buscarlo, o cree que algo falló.

### Cómo se abre

| Con | Gesto |
|---|---|
| Puntero | Clic secundario. |
| Toque | Mantener presionado medio segundo. |
| Teclado | La tecla de menú, o Mayúsculas + F10, con el foco en el ítem. |

### Relacionados

`PullDownButton` · `ActionSheet` · `Toolbar` · `List` · Menús.

### Referencias

- Apple, Human Interface Guidelines: Context menus.

## Estilo

### Color

Es el menú de ALMA: los mismos tokens que el de `PullDownButton`.

| Elemento | Propiedad | Token |
|---|---|---|
| Menú | fondo y borde | `menu-bg` y `menu-border` |
| Ítem | color del texto | `text-01` |
| Ítem bajo el cursor o con el foco | fondo | `menu-item-bg-hover` |
| Ítem con el foco del teclado | contorno interior | `focus` |
| Ítem destructivo | color del texto y del ícono | `menu-item-destructive-text` |
| Separador | color | `menu-border` |
| Título | color del texto | `text-02` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Ítem | 14 / 0,875 | `font-weight-body` |
| Título | 11 / 0,6875 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Menú | ancho | Desde 12 rem, hasta 20 rem |
| Menú | relleno | `space-8` |
| Menú | radio | `radius-panel` |
| Ítem | alto | El de un control |
| Ítem | relleno a los lados | `space-16` |
| Ícono y texto | separación | `space-16` |
| Menú y borde de la pantalla | distancia mínima | `space-8` |

El menú se abre en el punto del gesto. Si no cabe, se corre hasta quedar entero.

## Código

### Uso

`ContextMenu` envuelve el ítem. Lo de adentro tiene que poder recibir el foco, para abrir el menú con el teclado.

```js
const { ContextMenu, Card } = window.AlmaDS;

h(ContextMenu, {
  label: 'Acciones del viaje a Viña del Mar',
  items: [
    { value: 'ver', label: 'Ver pasaje', icon: 'ticket', disabled: !pagado },
    { value: 'compartir', label: 'Compartir', icon: 'share' },
    { value: 'cambiar', label: 'Cambiar fecha…', icon: 'calendar' },
    '-',
    { value: 'anular', label: 'Anular viaje', icon: 'trash-can', role: 'destructive' }],
  onAction: function (accion) { hacer(accion); }
}, h('div', { tabIndex: 0 }, h(Card, { title: 'Santiago → Viña del Mar' })))
```

Los ítems con `disabled` no se muestran. `'-'` es un separador.

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | lista, o función que la devuelve | — | Los ítems. Como función, recibe el evento que abrió el menú. |
| `onAction` | `(value) => void` | — | Recibe la acción elegida. |
| `label` | texto | «Acciones» | El nombre del menú para un lector de pantalla. |
| `title` | texto | — | Un título a la vista, si agrega algo. |
| `disabled` | sí o no | no | Sin menú: se ve el del navegador. |
| `as` | etiqueta | `div` | El elemento que envuelve. |

### Los ítems

| Campo | Tipo | Uso |
|---|---|---|
| `value`, `label` | texto | El valor que recibe `onAction` y lo que se lee. |
| `icon` | texto | Un ícono. Todos los de un grupo, o ninguno. |
| `role` | `destructive` | En rojo. Va al final. |
| `disabled` | sí o no | En un menú contextual, el ítem no aparece. |
| `checked` | sí o no | Un visto delante: un atributo que está puesto. |
| `items` | lista | Un submenú, de un nivel. |
| `onSelect` | función | Se llama al elegirlo, además de `onAction`. |

## Accesibilidad

### Qué ofrece ALMA

- **Se abre con el teclado**: la tecla de menú o Mayúsculas + F10, bajo lo que tiene el foco.
- **Es un `role="menu"` con nombre**, y cada acción un `menuitem`.
- **El foco entra al primer ítem** al abrir, y vuelve a donde estaba al cerrar.
- **Se cierra solo** con Esc, con un clic fuera, al desplazar la página o al cambiar de ventana.
- **Nunca queda fuera de la pantalla.**

### Teclado

| Tecla | Qué hace |
|---|---|
| Tecla de menú, Mayúsculas + F10 | Abre el menú del ítem con el foco. |
| ↓ ↑ | Recorren los ítems. |
| → ← | Abren y cierran un submenú. |
| Enter, Espacio | Elige. |
| Una letra | Va al ítem que empieza con ella. |
| Esc | Cierra y devuelve el foco. |

### Recomendaciones de diseño

- **Nada vive solo aquí.** Un toque largo y un clic derecho no son evidentes, y no todo el mundo puede hacerlos. Cada acción tiene que estar también en un control a la vista.
- Dale al menú un `label` que diga de qué ítem es: «Acciones del viaje a Viña del Mar».
- La acción destructiva se reconoce por su verbo, no solo por el rojo.

### Consideraciones de desarrollo

- Lo que envuelves tiene que poder recibir el foco (`tabIndex: 0`, un botón, un enlace). Si no, el menú no se puede abrir con el teclado.
- El toque largo reemplaza al menú del navegador sobre ese ítem. No lo uses sobre texto que la gente quiera seleccionar o copiar.
- El menú se dibuja con posición fija. Dentro de un contenedor con `transform`, la posición se calcula mal: evítalo en esos casos.

Pendiente: VoiceOver y NVDA; el toque largo en un teléfono real.
