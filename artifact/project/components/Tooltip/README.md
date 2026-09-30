# Tooltip

Una etiqueta breve que explica qué hace un control, al pasar el cursor o al enfocarlo.


## Uso

### Resumen

`Tooltip` muestra una frase corta que dice qué hace un control. Aparece con el cursor o con el foco del teclado y desaparece al salir. En Apple es la *help tag*.

#### Cuándo usarlo
- En botones de solo ícono, para decir la acción («Copiar el número de la tarjeta»).
- Para aclarar un control cuyo efecto no es obvio.

#### Cuándo no usarlo
- **Información esencial:** en pantallas táctiles no hay cursor, así que nunca debe estar solo en un tooltip.
- **Texto largo, enlaces o botones:** `Popover`.
- **Un consejo sobre una función:** `Tip`.
- **Repetir la etiqueta visible del control:** sobra.

### Anatomía

1. **Control** que lo abre.
2. **Globo** con el texto, sobre el control (o debajo con `placement: 'bottom'`).

![Dos botones de ícono con su Tooltip abierto: uno arriba («Compartir viaje») y otro abajo («Descargar pasaje»).](assets/Componentes/tooltip-posiciones.png)

### Contenido

- Describe la acción que inicia el control, empezando con verbo: «Copiar el número de la tarjeta».
- No repitas el nombre del control.
- Como máximo 75 caracteres, idealmente menos de 60. Puede ser un fragmento sin artículos, con mayúscula solo al inicio y sin punto final.
- Puede cambiar según el estado del control («Congelar tarjeta» / «Reactivar tarjeta»).

### Comportamiento

- Con el cursor aparece a los 500 ms (`delay`); con el foco del teclado, al instante.
- Se oculta al sacar el cursor del control y del globo, al perder el foco o con Esc. El cursor puede pasar al globo sin que se cierre.
- Si choca con el borde de la pantalla, se corre hacia adentro.
- Un tooltip por control, y uno a la vez.

### Relacionados

`Popover` · `Tip` · `Button` (solo ícono).

### Referencias

- Apple, Human Interface Guidelines: Offering help (help tags).
- IBM, Carbon Design System: Tooltip.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Globo | fondo | `tooltip-bg` (`inverse-02`) |
| Texto | color | `tooltip-text` (`inverse-01`) |
| Globo | sombra | `shadow-floating` |

El globo invierte los colores del tema para separarse del contenido: claro en tema oscuro y oscuro en tema claro.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Texto | 12 / 0,75 | `font-weight-body` | 1,4 |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Globo | separación del control | 8 px |
| Globo | ancho máximo | 240 px (15 rem) |
| Globo | relleno | 4 px arriba y abajo, 8 px a los lados |
| Globo | radio | `radius-chip` |

![Medidas de Tooltip: separación de 8 px con el control, relleno del globo y radio.](assets/Componentes/tooltip-medidas.png)

### Capas y movimiento

En `z-floating`. Aparece y se desliza 4 px hacia su posición en `duration-fast-02` con `easing-entrance-expressive`. Con movimiento reducido, aparece sin animación.

### Contraste

Texto a 4,5:1 sobre `inverse-02` en los cuatro temas.

## Código

### Uso

```js
const { Tooltip, Button } = window.AlmaDS;
h(Tooltip, { text: 'Copiar el número de la tarjeta' },
  h(Button, { variant: 'plain', icon: 'copy', 'aria-label': 'Copiar número' }))
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `text` | `string` | — | Qué hace el control. Máximo 75 caracteres (ALMA avisa en la consola si se pasa). |
| `children` | un elemento enfocable | — | El control. |
| `placement` | `'top' \| 'bottom'` | `'top'` | Arriba o abajo del control. |
| `delay` | `number` (ms) | `500` | Espera con el cursor. El foco lo muestra al instante. |
| `id` | `string` | automático | — |

El control recibe `aria-describedby` apuntando al tooltip: su nombre sigue siendo su `aria-label` o su texto, y el tooltip lo describe.

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- El globo es `role="tooltip"` y el control lo referencia con `aria-describedby`: el lector lee el nombre del control y después la descripción.
- Aparece al enfocar con el teclado, no solo con el cursor.
- Esc lo oculta sin mover el foco (WCAG 1.4.13, descartable).
- Permanece visible mientras el control tiene el cursor o el foco (WCAG 1.4.13, persistente).
- Se puede pasar el cursor del control al globo sin que desaparezca: el globo recibe el puntero y un puente invisible cubre los 8 px de separación (WCAG 1.4.13, se puede recorrer). Así, quien usa ampliación de pantalla puede leerlo con el cursor encima.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Enfoca el control y muestra el tooltip. |
| Esc | Oculta el tooltip. |

### Recomendaciones de diseño

- Todo lo que dice un tooltip debe existir también en otra parte (una etiqueta, la ayuda): en pantallas táctiles no se ve.
- No pongas enlaces ni botones dentro: no se pueden alcanzar.

### Consideraciones de desarrollo

- El hijo debe ser un solo elemento enfocable. Un ícono suelto o un `<span>` no reciben foco y el tooltip no aparecería con teclado.
- En un botón de solo ícono, el `aria-label` es el nombre y el tooltip la descripción; no los repitas.

### Verificación

axe sin problemas en los cuatro temas; teclado, Esc y paso del cursor al globo probados. Pendiente: VoiceOver y NVDA.
