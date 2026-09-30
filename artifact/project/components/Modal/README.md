# Modal

Un diálogo que bloquea la página para una tarea breve y enfocada.


## Uso

### Resumen

`Modal` abre una tarea corta sobre la página y bloquea lo demás hasta que la persona la termina o la cancela: cambiar un dato, confirmar un pago, elegir entre pocas opciones con contexto. Es el *modal* de Carbon y la hoja (*sheet*) de Apple en su forma centrada.

#### Cuándo usarlo
- Una tarea breve que conviene hacer sin perder la página de vista: editar un campo, confirmar un cambio con consecuencias.
- Cuando la persona necesita concentrarse en una sola cosa antes de seguir.

#### Cuándo no usarlo
- **Una advertencia con 2 o 3 respuestas:** `Alert`.
- **Opciones sobre lo que se está viendo, en el teléfono:** `Sheet`.
- **Un resultado que no pide decisión:** `InlineNotification` o `toast`.
- **Una explicación breve junto a un control:** `Popover`.
- **Una tarea larga o con varios pasos:** una página propia. Un modal no lleva otro modal encima.

### Variantes

| Variante | Propósito |
|---|---|
| Pasiva | Solo informa o muestra contenido; se cierra con «Cerrar» o Esc. Sin `primaryAction`. |
| Transaccional | Pide una acción (`primaryAction`) y ofrece cancelar (`secondaryAction`). Un clic fuera no la cierra, para no perder lo escrito. |
| Destructiva | La acción principal borra o anula algo: `primaryAction.destructive`. El botón se ve rojo. |

### Anatomía

1. **Velo** (`overlay-01`): oscurece la página y bloquea el clic.
2. **Contenedor**: panel `ui-01` con borde y esquinas `radius-panel`.
3. **Antetítulo** (opcional): el contexto («Pasaje 4F2K-81»).
4. **Título:** verbo + objeto.
5. **Botón Cerrar:** ícono `close`, arriba a la derecha.
6. **Cuerpo:** descripción y contenido; es lo único que hace scroll.
7. **Pie:** «Cancelar» a la izquierda y la acción principal a la derecha, separados por un borde.

> **Imagen pendiente:** anatomía numerada de un modal transaccional con un campo, en tema oscuro.

### Tamaños

| Tamaño | Ancho máximo | Para qué |
|---|---|---|
| `sm` | 400 px | Una confirmación o un campo. |
| `md` (por defecto) | 560 px | Un formulario corto. |
| `lg` | 768 px | Contenido que necesita ancho: una tabla corta, una comparación. |

El alto se ajusta al contenido hasta la altura de la pantalla menos 32 px; si no cabe, el cuerpo hace scroll y el título y el pie quedan fijos.

> **Imagen pendiente:** los tres tamaños sobre la misma página, con sus medidas.

### Contenido

- **Título:** verbo + objeto, con mayúscula solo al inicio («Cambiar el nombre del pasajero»). No una pregunta ni «¿Está seguro?».
- **Descripción:** una o dos oraciones con lo que la persona necesita saber para decidir.
- **Botones:** el de la acción repite el verbo del título («Guardar cambio»); el otro es «Cancelar». Nunca «Aceptar» y «Cancelar» juntos.
- Si un dato está mal, el error va junto al campo, sin cerrar el modal.

### Comportamiento

- Al abrir, el foco va al primer campo del cuerpo; si no hay campos, al diálogo. `initialFocus` elige otro elemento.
- El foco queda atrapado dentro del diálogo y la página de fondo no hace scroll.
- Esc y el botón «Cerrar» cierran; al cerrar, el foco vuelve al botón que lo abrió.
- Un clic en el velo cierra solo los modales pasivos (`closeOnOverlay` lo cambia).
- `dismissible: false` quita «Cerrar» y Esc; úsalo solo si la tarea no se puede abandonar.
- En pantallas angostas, los botones del pie se reparten el ancho.

> **Imagen pendiente:** secuencia abrir → escribir → guardar, con la ruta del foco marcada.

### Relacionados

`Sheet` · `Alert` · `Popover` · `InlineNotification`.

### Referencias

- IBM, Carbon Design System: Modal.
- Apple, Human Interface Guidelines: Sheets.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Velo | fondo | `overlay-01` |
| Contenedor | fondo | `modal-bg` |
| Contenedor | borde (1 px) | `modal-border` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Antetítulo | color del texto | `text-02` |
| Título | color del texto | `text-01` |
| Descripción | color del texto | `text-02` |
| Pie | borde superior (1 px) | `modal-border` |
| Botón secundario | estilo | `Button` gray, rol cancel |
| Botón principal | estilo | `Button` filled, rol primary o destructive |
| Botón Cerrar | estilo | `Button` plain de ícono |

`modal-bg` apunta a `ui-01` y `modal-border` a `ui-03`: el diálogo es un contenedor sobre la página, como en el resto de ALMA.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Antetítulo | 12 / 0,75 | `font-weight-body` | — |
| Título | 20 / 1,25 | `font-weight-heading` | 1,4 |
| Cuerpo y descripción | 14 / 0,875 | `font-weight-body` | 1,6 |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Velo | margen interior | 16 px (`space-16`) |
| Contenedor | radio | `radius-panel` |
| Contenedor | alto máximo | alto de pantalla − 32 px |
| Cabecera | relleno | 16 px arriba, 24 px a la izquierda, 8 px a la derecha |
| Cuerpo | relleno | 16 px arriba, 24 px a los lados y abajo |
| Pie | relleno | 16 px arriba, 24 px a los lados y abajo |
| Botones del pie | separación | 8 px |

> **Imagen pendiente:** anatomía acotada del modal `md`.

### Tamaño

| Tamaño | Ancho máximo (px / rem) |
|---|---|
| `sm` | 400 / 25 |
| `md` | 560 / 35 |
| `lg` | 768 / 48 |

### Capas y movimiento

| Elemento | Capa | Animación |
|---|---|---|
| Velo | `z-modal` | aparece en `duration-moderate-02` con `easing-entrance-productive` |
| Contenedor | `z-modal` | receta «invocar» de IBM: de 96 % a 100 % de escala y de transparente a opaco, en `duration-moderate-02` con `easing-standard-expressive` |

Con movimiento reducido, ambos aparecen sin animación.

### Contraste

Textos a 4,5:1 (7:1 en alto contraste) y borde del contenedor sobre el velo, verificados con axe en los cuatro temas con el diálogo abierto.

## Código

### Uso

```js
const { Modal, Button, TextInput } = window.AlmaDS;
const [open, setOpen] = React.useState(false);
h(React.Fragment, null,
  h(Button, { variant: 'gray', onClick: () => setOpen(true) }, 'Cambiar el nombre del pasajero'),
  h(Modal, { open, onClose: () => setOpen(false), eyebrow: 'Pasaje 4F2K-81', title: 'Cambiar el nombre del pasajero',
    description: 'El nombre debe coincidir con el carnet que mostrarás al subir.',
    secondaryAction: { label: 'Cancelar' },
    primaryAction: { label: 'Guardar cambio', onClick: save } },
    h(TextInput, { label: 'Nombre completo', defaultValue: 'Camila Rojas' })))
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `open` | `boolean` | — | Muestra u oculta el diálogo. |
| `onClose` | `() => void` | — | Esc, «Cerrar», clic en el velo o «Cancelar» sin `onClick`. |
| `title` | `string` | — | Verbo + objeto. Da nombre al diálogo. |
| `eyebrow` | `string` | — | Contexto sobre el título. |
| `description` | `string` | — | Describe el diálogo para el lector de pantalla. |
| `children` | `node` | — | El contenido del cuerpo. |
| `primaryAction` | `{ label, onClick, destructive, disabled, loading, loadingLabel }` | — | La acción principal. |
| `secondaryAction` | `{ label, onClick }` | — | Normalmente «Cancelar». |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ancho máximo. |
| `dismissible` | `boolean` | `true` | `false` quita «Cerrar» y Esc. |
| `closeOnOverlay` | `boolean` | `true` sin acción principal, `false` con ella | Cerrar con un clic fuera. |
| `initialFocus` | `string` (selector) | primer campo del cuerpo | Qué recibe el foco al abrir. |
| `variant` | `'dialog' \| 'sheet'` | `'dialog'` | `'sheet'` es `Sheet`. |

### Acción que tarda

```js
primaryAction: { label: 'Pagar $7.000', loading: paying, loadingLabel: 'Pagando', onClick: pay }
```

Mientras `loading` es verdadero, el botón muestra el indicador, no acepta más clics y anuncia `loadingLabel`.

### Dónde se dibuja

El diálogo se dibuja al final de `<body>` (un portal de React), así que ningún `overflow` del contenedor lo recorta.

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- `role="dialog"` con `aria-modal="true"`, nombrado por el título (`aria-labelledby`) y descrito por `description` (`aria-describedby`).
- Al abrir, el foco entra al primer campo o al diálogo; al cerrar, vuelve al elemento que lo abrió.
- El foco queda atrapado: Tab y Mayús+Tab recorren solo el diálogo.
- La página de fondo no hace scroll mientras está abierto.
- La cabecera y el pie son contenedores, no regiones de página: el lector no los anuncia como la cabecera o el pie del sitio.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab / Mayús+Tab | Recorre los controles del diálogo, en círculo. |
| Esc | Cierra (salvo con `dismissible: false`). |
| Enter o Espacio | Activa el botón con foco. |

### Recomendaciones de diseño

- El título dice la tarea; el lector lo anuncia al abrir.
- No abras un modal sin que la persona lo pida.
- Un solo modal a la vez.

### Consideraciones de desarrollo

- Si el diálogo no tiene campos, el foco va al diálogo: el lector lee el título y la descripción.
- Para una acción que tarda, usa `loading`: el botón queda ocupado y se anuncia.
- No quites el velo ni el bloqueo de scroll: el resto de la página debe quedar inerte.

### Verificación

axe sin problemas con el diálogo abierto, en los cuatro temas; foco y teclado probados. Pendiente: VoiceOver y NVDA.
