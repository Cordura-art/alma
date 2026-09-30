# Checkbox

Una casilla para marcar una o varias opciones independientes, o aceptar algo.


## Uso

### Resumen

`Checkbox` marca opciones independientes: cada casilla se marca o desmarca sin afectar a las demás. Tiene tres estados: vacía, con check y mixta (guion).

#### Cuándo usarlo
- Elegir varias opciones de una lista corta («Medios de pago que aceptas»).
- Una opción suelta que se confirma al enviar («Recordar en este dispositivo», aceptar condiciones).
- Jerarquías: una casilla padre que marca o desmarca a sus hijas.

#### Cuándo no usarlo
- **Opciones excluyentes:** `RadioGroup`.
- **Un ajuste que se aplica al instante en una lista:** `Switch`.
- **Filtros en una barra:** `Tag` seleccionable.

### Anatomía

1. **Casilla:** cuadrado de 20 px con esquinas `radius-chip`.
2. **Marca:** check o guion.
3. **Etiqueta:** a la derecha de la casilla.
4. **Título del grupo** (en grupos): lo que tienen en común.

> **Imagen pendiente:** anatomía numerada de una casilla sola y de un grupo con padre e hijas.

### Estados

| Estado | Forma |
|---|---|
| Sin marcar | Casilla vacía con borde. |
| Marcada | Casilla rellena con check. |
| Mixta | Casilla rellena con guion: el padre con algunas hijas marcadas. |
| Foco | Anillo de foco alrededor de la casilla. |
| Desactivada | Todo al 45 % de opacidad. |

Los tres estados se distinguen por la forma, no solo por el color.

> **Imagen pendiente:** los cinco estados en tema oscuro y claro.

### Grupos y jerarquías

- Alinea las casillas por el borde izquierdo, una debajo de otra; las hijas, con sangría.
- El padre queda marcado si todas las hijas lo están, mixto si algunas y vacío si ninguna. Marcarlo marca a todas.
- Más de 7 opciones: considera un `Combobox` múltiple.

### Contenido

- **Etiqueta:** afirmativa y corta, con mayúscula solo al inicio y sin punto final («Recordar en este dispositivo», no «No olvidar»).
- **Título del grupo:** qué se elige («Medios de pago»).
- Para aceptar condiciones, la etiqueta incluye el enlace a ellas.

### Comportamiento

- Toda la fila (casilla y etiqueta) se puede tocar.
- El cambio no se aplica al instante: se envía con el formulario. Si se aplica al instante, usa `Switch`.

### Relacionados

`RadioGroup` · `Switch` · `Tag` · `Combobox`.

### Referencias

- Apple, Human Interface Guidelines: Toggles (checkbox).
- IBM, Carbon Design System: Checkbox.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Casilla | borde (2 px) | `control-off-border` |
| Casilla | fondo | transparente |
| Casilla marcada o mixta | fondo y borde | `control-on` |
| Marca (check o guion) | relleno | `control-on-mark` |
| Etiqueta | color del texto | `text-01` |
| Casilla:focus | contorno | `focus` (2 px, separado 2 px) |
| Fila:disabled | opacidad | 45 % |

En tema claro, `control-on` es un oliva oscuro: el lima no llega a 3:1 sobre fondo claro.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta | 14 / 0,875 | Regular / 400 | `web-label-m` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Casilla | tamaño | 20 × 20 px |
| Casilla | radio | `radius-chip` (4 px) |
| Marca | tamaño | 16 px |
| Casilla y etiqueta | separación | 8 px (`space-8`) |
| Fila | alto mínimo | 44 px (`size-touch-min`) |
| Área de toque de la casilla | tamaño | 44 × 44 px |

> **Imagen pendiente:** anatomía acotada con las medidas.

### Tamaño

| Densidad | Alto de la fila (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

### Movimiento

El relleno y el borde cambian en `duration-fast-01` (70 ms) con `easing-standard-productive`.

### Contraste

Borde y relleno a 3:1 o más, marca a 3:1 sobre el relleno y etiqueta a 4,5:1 (7:1 en alto contraste), en los cuatro temas.

## Código

### Uso

```js
const { Checkbox } = window.AlmaDS;
h(Checkbox, { label: 'Recordar en este dispositivo', defaultChecked: true })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Etiqueta visible. |
| `checked` / `defaultChecked` | `boolean` | `false` | Controlado o no controlado. |
| `indeterminate` | `boolean` | `false` | Estado mixto (guion). |
| `onChange` | `(checked) => void` | — | Recibe el nuevo estado. |
| `disabled` | `boolean` | `false` | — |
| `aria-label` | `string` | — | Solo si no hay etiqueta visible. |
| `id` | `string` | automático | — |

### Padre con hijas

```js
const all = methods.every(m => m.on), some = methods.some(m => m.on);
h(Checkbox, { label: 'Todos los medios de pago', checked: all, indeterminate: some && !all,
  onChange: v => setMethods(methods.map(m => ({ ...m, on: v }))) })
```

### HTML

```html
<label class="alma-check" for="rem">
  <input id="rem" type="checkbox" class="alma-check__input">
  <span class="alma-check__box" aria-hidden="true"></span>
  <span class="alma-check__label">Recordar en este dispositivo</span>
</label>
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un `<input type="checkbox">` nativo, visualmente oculto bajo la casilla: se anuncia como casilla con su estado.
- El estado mixto se anuncia como «mixto» (`aria-checked="mixed"` e `indeterminate`).
- La etiqueta es un `<label>`: tocar el texto también marca.
- Área de toque de 44 × 44 px alrededor de la casilla de 20 px.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Mueve el foco a la casilla siguiente. |
| Espacio | Marca o desmarca. |

### Recomendaciones de diseño

- Agrupa las casillas relacionadas bajo un título; el grupo se anuncia con ese título.
- No uses una casilla para una acción inmediata: el cambio debe esperar al envío.

#### Etiquetado
Cada casilla tiene su etiqueta visible. Solo en tablas, donde la fila ya da el contexto, usa `aria-label` («Seleccionar Santiago → Rancagua»).

### Consideraciones de desarrollo

- En grupos, envuelve las casillas en `<fieldset>` con `<legend>` para anunciar el título.
- Mantén sincronizado el estado mixto del padre al cambiar las hijas.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
