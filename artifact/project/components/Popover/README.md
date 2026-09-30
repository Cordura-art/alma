# Popover

Un diálogo pequeño y no modal junto al botón que lo abre.


## Uso

### Resumen

`Popover` abre, junto a su botón, un panel pequeño con una explicación o un par de controles, sin bloquear la página. Es el *popover* de Apple y el *toggletip* de Carbon.

#### Cuándo usarlo
- Explicar un término o un cobro sin salir de la pantalla («¿Qué es la tasa de embarque?»).
- Un par de controles relacionados con el botón (un filtro rápido).
- Cuando el contenido tiene un enlace o un botón, que un tooltip no puede tener.

#### Cuándo no usarlo
- **Una frase corta que describe un control:** `Tooltip`.
- **Una decisión importante o una tarea con varios campos:** `Modal`.
- **Una lista de acciones:** `PullDownButton`.

### Anatomía

1. **Botón** que lo abre (a menudo un `Button` de ícono `information`).
2. **Panel** junto al botón.
3. **Título** (opcional).
4. **Contenido.**
5. **Botón Cerrar.**

> **Imagen pendiente:** un popover abierto bajo un botón de información, en tema oscuro y claro.

### Ubicación

| Propiedad | Valores | Efecto |
|---|---|---|
| `placement` | `bottom` (por defecto), `top` | Debajo o encima del botón. |
| `align` | `start` (por defecto), `end` | Alineado al borde izquierdo o al derecho del botón. Usa `end` cerca del borde derecho de la pantalla. |

### Contenido

- **Título:** el término o la pregunta («Tasa de embarque»).
- **Contenido:** una o dos oraciones; como mucho, un enlace o un botón.

### Comportamiento

- Se abre con un clic o con Enter en el botón; el foco entra al panel.
- Esc, «Cerrar» o un clic fuera lo cierran; con Esc o «Cerrar», el foco vuelve al botón.
- No es modal: no bloquea la página ni atrapa el foco.
- Uno a la vez.

### Relacionados

`Tooltip` · `Tip` · `Modal` · `PullDownButton`.

### Referencias

- Apple, Human Interface Guidelines: Popovers.
- IBM, Carbon Design System: Toggletip.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Panel | fondo | `popover-bg` |
| Panel | borde (1 px) | `popover-border` |
| Panel | sombra | `shadow-floating` |
| Panel:focus | contorno | `focus` (2 px, separado 2 px) |
| Título | color del texto | `text-01` |
| Contenido | color del texto | `text-02` |
| Botón Cerrar | estilo | `Button` plain de ícono |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 14 / 0,875 | Medium / 500 | — |
| Contenido | 14 / 0,875 | Regular / 400 | 1,6 |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Panel | separación del botón | 8 px |
| Panel | ancho máximo | 320 px (20 rem), o el de la pantalla − 32 px |
| Panel | relleno | 16 px; 48 px a la derecha, para «Cerrar» |
| Panel | radio | `radius-panel` |
| Título y contenido | separación | 4 px |
| Botón Cerrar | posición | esquina superior derecha |

> **Imagen pendiente:** anatomía acotada.

### Capas y movimiento

En `z-floating`. Aparece como los menús, en `duration-fast-02` con `easing-entrance-expressive`. Con movimiento reducido, sin animación.

### Contraste

Textos a 4,5:1 sobre `popover-bg` en los cuatro temas.

## Código

### Uso

```js
const { Popover, Button } = window.AlmaDS;
h(Popover, { title: 'Tasa de embarque',
  content: 'La cobra el terminal por usar sus andenes. Está incluida en el precio.' },
  h(Button, { variant: 'plain', icon: 'information', 'aria-label': 'Qué es la tasa de embarque' }))
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `children` | un elemento | — | El botón. Recibe `aria-expanded`, `aria-controls` y `aria-haspopup`. |
| `title` | `string` | — | Título; nombra el panel. |
| `content` | `node` | — | El contenido. |
| `placement` | `'bottom' \| 'top'` | `'bottom'` | Debajo o encima. |
| `align` | `'start' \| 'end'` | `'start'` | Alineación con el botón. |
| `open` / `onOpenChange` | `boolean` / `(open) => void` | — | Para controlarlo desde fuera. |
| `aria-label` | `string` | — | Nombre del panel si no hay `title`. |
| `id` | `string` | automático | — |

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- El panel es `role="dialog"` (no modal), nombrado por su título o por `aria-label`.
- El botón recibe `aria-haspopup="dialog"`, `aria-expanded` y `aria-controls`: el lector anuncia que abre un diálogo y si está abierto.
- Al abrir, el foco entra al primer control del panel o, si no hay, al panel.
- Esc y «Cerrar» cierran y devuelven el foco al botón.
- No atrapa el foco: Tab puede salir del panel.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Enter o Espacio (en el botón) | Abre o cierra. |
| Tab / Mayús+Tab | Recorre el panel y sigue por la página. |
| Esc | Cierra y vuelve al botón. |

### Recomendaciones de diseño

- El botón de un popover de información necesita un nombre que diga qué explica («Qué es la tasa de embarque»), no solo «Información».
- Lo esencial no va solo en un popover: debe poder encontrarse en la página.

### Consideraciones de desarrollo

- Al salir con Tab el panel sigue abierto hasta un clic fuera o Esc; si molesta, ciérralo con `onOpenChange` al perder el foco.
- Cerca del borde derecho, usa `align: 'end'` para que el panel no salga de la pantalla.

### Verificación

axe sin problemas en los cuatro temas; teclado y retorno del foco probados. Pendiente: VoiceOver y NVDA.
