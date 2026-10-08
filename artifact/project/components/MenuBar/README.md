# MenuBar

La barra con todos los comandos de la app que está al frente y, a su derecha, los extras.


## Uso

### Resumen

`MenuBar` es la barra del borde superior del escritorio. A la izquierda, los menús de la app que está al frente, siempre en el mismo orden. A la derecha, los extras: la hora, los avisos, la presencia de la IA. Es la *menu bar* de Apple.

Antes de usarla, lee los patrones **Entorno** y **Menús**.

### Cuándo usarla

- En un `Desktop`, siempre: es donde se aprende qué hace cada app.

### Cuándo no

- En una página o en una app de una sola ventana. Ahí los comandos van en una `Toolbar` y en sus `PullDownButton`.
- Para navegar entre secciones. Los menús son comandos, no lugares.

### Anatomía

1. **Menú de la app:** su nombre, en negrita.
2. **Menús:** Archivo, Edición, Ver, Ventana, Ayuda, y los propios.
3. **Menú abierto**, con sus atajos a la derecha.
4. **Extras:** íconos y datos del entorno.

![Anatomía de MenuBar: a la izquierda, el nombre de la app «Viajes» en negrita (1) y los menús Archivo, Edición, Ver, Ventana y Ayuda (2). El menú Edición está abierto (3), con Deshacer, Rehacer apagado, Copiar y Pegar, cada uno con su atajo. A la derecha, el ícono de avisos y la fecha y la hora (4).](assets/Componentes/menu-bar-anatomia.png)

### El orden de los menús

| Menú | Qué lleva |
|---|---|
| **Nombre de la app** | «Acerca de», «Ajustes…» y lo que vale para toda la app. |
| **Archivo** | Crear, abrir, guardar, imprimir, cerrar la ventana. |
| **Edición** | Deshacer, rehacer, cortar, copiar, pegar, buscar. |
| **Formato** | Solo con texto con formato. |
| **Ver** | Ordenar, filtrar, mostrar u ocultar partes. |
| Los propios | Entre Ver y Ventana. |
| **Ventana** | Minimizar, ampliar, la lista de ventanas. |
| **Ayuda** | La ayuda. |

No cambies el orden ni saltes los que apliquen. La gente llega a «Copiar» sin leer, porque siempre está en el mismo lugar.

### Reglas

- **Todo comando de la app está aquí**, también los de sus menús contextuales.
- **Siempre los mismos ítems.** El que no aplica se apaga; no se esconde.
- **Títulos de una palabra.** La barra es angosta y comparte lugar con los extras.
- **Los atajos conocidos se respetan:** copiar, pegar, deshacer, guardar, imprimir. Uno propio, solo si hace falta.
- **El menú de la app cambia con la app al frente.** Los demás conservan su lugar.

### Los extras

- **Pocos.** Cada uno le quita lugar a los menús.
- **Un ícono**, o un dato corto: la hora.
- **Al tocar uno, se abre un menú**, no un popover.
- **La persona elige cuáles ver**, en Ajustes.
- **Nada vive solo en un extra:** lo que ofrece está también en otra parte.

### En una pantalla angosta

Queda el menú de la app y los extras. Los demás menús no se muestran: sus comandos tienen que estar en la ventana.

### Relacionados

`Desktop` · `Window` · `Dock` · `PullDownButton` · Entorno · Menús.

### Referencias

- Apple, Human Interface Guidelines: The menu bar.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Barra | fondo | Vidrio delgado (`glass-thin`) |
| Barra | borde inferior | `border-subtle` |
| Títulos y extras | color | `text-01` |
| Título bajo el cursor, o abierto | fondo | `hover-ui` |
| Foco | contorno | `focus` |
| Menú | — | El menú de ALMA |

Sobre el vidrio delgado solo va `text-01`. Por eso los extras no usan texto secundario.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Títulos de menú | 13 / 0,8125 | `font-weight-body` |
| Nombre de la app | 13 / 0,8125 | `font-weight-emphasis` |
| Extras con texto | 13 / 0,8125, cifras del mismo ancho | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | alto | 32 px |
| Barra | relleno a los lados | `space-8` |
| Título de menú | alto | 24 px |
| Título de menú | relleno a los lados | `space-8` |
| Título de menú | radio | `radius-chip` |
| Menú | distancia a la barra | `space-4` |
| Extras | separación | `space-8` |
| Ícono de un extra | tamaño | `icon-size-16` |

## Código

### Uso

```js
const { MenuBar } = window.AlmaDS;

h(MenuBar, {
  appName: 'Viajes',
  menus: [
    { label: 'Viajes', items: [{ value: 'acerca', label: 'Acerca de Viajes' }, { value: 'ajustes', label: 'Ajustes…', shortcut: 'Ctrl+,' }] },
    { label: 'Archivo', items: [{ value: 'nuevo', label: 'Nuevo viaje…', shortcut: 'Ctrl+N' }] },
    { label: 'Edición', items: [{ value: 'deshacer', label: 'Deshacer', shortcut: 'Ctrl+Z' }, '-', { value: 'copiar', label: 'Copiar', shortcut: 'Ctrl+C' }] }
  ],
  extras: [
    { icon: 'notification', label: 'Avisos', onPress: abrirAvisos },
    { text: 'mar 31 · 08:12', label: 'Fecha y hora' }
  ],
  onAction: function (valor, menu) { hacer(valor); }
})
```

Los ítems son los de cualquier menú de ALMA: ver **PullDownButton › Código › Los ítems**. El primer menú es el de la app.

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `menus` | `[{ label, items }]` | — | Los menús, en orden. |
| `appName` | texto | — | El nombre de la app. Pone el primer menú en negrita. |
| `onAction` | `(value, menu) => void` | — | Recibe el ítem elegido y el menú. |
| `extras` | lista | — | Los extras, a la derecha. |
| `label` | texto | «Menús de» y el nombre de la app | El nombre de la barra. |

### Los extras

| Forma | Qué es |
|---|---|
| `{ icon, label }` | Un ícono que informa. `label` es su nombre. |
| `{ text, label }` | Un dato: la hora. |
| `{ icon, label, onPress }` | Un botón. |
| `{ icon, label, items, onAction }` | Un botón que abre un menú. |
| `{ node }` | Lo que necesites: la figura del Halo. |

### Los atajos

`shortcut` muestra el atajo. Hacerlo funcionar es de tu app: escucha el teclado y llama a la misma función que el ítem.

## Accesibilidad

### Qué ofrece ALMA

- **Es un `menubar`** con nombre, y cada título un `menuitem` que dice si su menú está abierto.
- **Una sola parada de Tab.** Las flechas pasan de un menú a otro.
- **Con un menú abierto, las flechas a los lados abren el de al lado**, salvo que abran o cierren un submenú.
- **Esc cierra el menú** y deja el foco en su título.
- **Los atajos se anuncian** con cada ítem.
- **Los extras tienen nombre**, aunque sean solo un ícono.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega a la barra; sale de ella. |
| ← → | Menú anterior o siguiente. |
| ↓, Enter, Espacio | Abre el menú. |
| Inicio, Fin | Primer o último menú. |
| Dentro de un menú | Las teclas de cualquier menú de ALMA. Ver el patrón Menús. |
| Esc | Cierra el menú. |

### Recomendaciones de diseño

- Un ítem apagado sigue ahí y se anuncia como no disponible: así se sabe que existe.
- La barra es de vidrio delgado: no pongas en ella texto secundario ni de color.
- Un extra que cambia (un contador de avisos) lo dice con texto, no solo con un punto de color.

### Consideraciones de desarrollo

- Un atajo que se muestra tiene que funcionar, y no puede pisar los del navegador ni los del lector de pantalla.
- Al cambiar la app al frente, cambia `appName` y `menus` juntos.

Pendiente: VoiceOver y NVDA.
