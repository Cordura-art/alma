# Switch

Un interruptor para encender o apagar un ajuste que se aplica al instante, en una fila de lista.


## Uso

### Resumen

`Switch` enciende o apaga un ajuste, y el cambio se aplica al instante. Siguiendo a Apple, va **solo en una fila de lista**, donde la fila misma dice qué controla.

#### Cuándo usarlo
- Ajustes de encendido y apagado que se aplican sin enviar nada: «Notificaciones de pago», «Modo ahorro de datos».
- Un ajuste principal que habilita un grupo de ajustes dependientes (va en la primera fila del grupo).

#### Cuándo no usarlo
- **Fuera de una lista:** usa `Button` con `selected`, que funciona como interruptor.
- **Un cambio que se aplica al enviar un formulario:** `Checkbox`.
- **Más de dos estados:** `SegmentedControl`, `RadioGroup` o `PopUpButton`.

### Anatomía

1. **Etiqueta:** el ajuste.
2. **Descripción** (opcional): una línea que explica el efecto.
3. **Pista:** 52 × 32 px.
4. **Perilla:** círculo de 24 px que se desplaza; encendida, muestra un check.

> **Imagen pendiente:** anatomía numerada de una fila con descripción, encendida y apagada.

### Estados

| Estado | Forma |
|---|---|
| Apagado | Pista con borde; perilla a la izquierda. |
| Encendido | Pista rellena; perilla a la derecha con check. |
| Foco | Anillo de foco alrededor de la pista. |
| Desactivado | Toda la fila al 45 % de opacidad. |

La diferencia está en la posición, el relleno y el check, no solo en el color.

> **Imagen pendiente:** encendido, apagado, foco y desactivado en tema oscuro y claro.

### Contenido

- **Etiqueta en positivo:** lo que se enciende («Notificaciones»), nunca una negación («Desactivar notificaciones»).
- **Descripción:** el efecto concreto («Aviso cuando se aprueba o rechaza un cobro»).
- Sin «Sí/No» ni «On/Off» junto al interruptor: la forma ya lo dice.

### Comportamiento

- Toda la etiqueta se puede tocar.
- El cambio se aplica al instante. Si puede fallar (por ejemplo, requiere conexión), muestra el resultado con un aviso y vuelve al estado anterior si falla.
- La perilla se desliza en 150 ms.

### Relacionados

`Button` con `selected` · `Checkbox` · `List`.

### Referencias

- Apple, Human Interface Guidelines: Toggles (switch).
- IBM, Carbon Design System: Toggle.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Pista (apagado) | borde (1 px) | `control-off-border` |
| Pista (apagado) | fondo | transparente |
| Perilla (apagado) | fondo | `control-off-thumb` |
| Pista (encendido) | fondo y borde | `control-on` |
| Perilla (encendido) | fondo | `control-on-mark` |
| Check de la perilla | relleno | `control-on` |
| Etiqueta | color del texto | `text-01` |
| Descripción | color del texto | `text-02` |
| Pista:focus | contorno | `focus` (2 px, separado 2 px) |
| Fila:disabled | opacidad | 45 % |

En tema claro, `control-on` es un oliva oscuro, porque el lima no se ve sobre fondo claro.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado | Estilo de texto |
|---|---|---|---|---|
| Etiqueta | 14 / 0,875 | Regular / 400 | 1,4 | `web-label-m` |
| Descripción | 12 / 0,75 | Regular / 400 | 1,72 | `web-body-s` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Pista | tamaño | 52 × 32 px |
| Pista | radio | `radius-pill` |
| Perilla | tamaño, margen | 24 px, 3 px |
| Perilla | desplazamiento | 20 px |
| Check | tamaño | 16 px |
| Fila | alto mínimo, relleno vertical | 44 px, 8 px |
| Etiqueta e interruptor | separación | 16 px (`space-16`) |
| Área de toque del interruptor | tamaño | 44 × 44 px |

> **Imagen pendiente:** anatomía acotada con las medidas.

### Movimiento

El fondo y el borde de la pista cambian en `duration-fast-02` (110 ms); la perilla se desplaza en `duration-moderate-01` (150 ms); ambos con `easing-standard-productive`. Con movimiento reducido, el cambio es instantáneo.

### Contraste

Pista, perilla y check a 3:1 o más; textos a 4,5:1 (7:1 en alto contraste), en los cuatro temas.

## Código

### Uso

```js
const { Switch } = window.AlmaDS;
h(Switch, { label: 'Notificaciones de pago', description: 'Aviso cuando se aprueba o rechaza un cobro', defaultChecked: true })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | El ajuste. |
| `description` | `string` | — | Una línea con el efecto. |
| `checked` / `defaultChecked` | `boolean` | `false` | Controlado o no controlado. |
| `onChange` | `(checked) => void` | — | Recibe el nuevo estado. |
| `disabled` | `boolean` | `false` | — |
| `aria-label` | `string` | — | Obligatorio si no hay etiqueta visible. |
| `id` | `string` | automático | — |

### Deshacer si falla

```js
h(Switch, { label: 'Pagos con un toque', checked: on, onChange: async v => {
  setOn(v);
  try { await save(v); } catch { setOn(!v); toast({ status: 'error', title: 'No se pudo guardar el ajuste' }); }
} })
```

### HTML

```html
<div class="alma-switch-row">
  <label for="n" class="alma-switch-row__label">Notificaciones de pago</label>
  <button id="n" type="button" role="switch" aria-checked="true" class="alma-switch is-on"><span class="alma-switch__thumb"></span></button>
</div>
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un `<button role="switch">` con `aria-checked`: se anuncia como interruptor, encendido o apagado.
- La etiqueta es un `<label>` unido al botón: se anuncia al enfocar y tocarla alterna.
- La descripción forma parte de la etiqueta.
- Área de toque de 44 × 44 px.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Mueve el foco al interruptor. |
| Espacio o Enter | Alterna. |

### Recomendaciones de diseño

- Etiqueta en positivo, para que «encendido» signifique lo que dice.
- Si el cambio falla, avisa con texto y vuelve al estado anterior.

#### Etiquetado
Sin etiqueta visible (por ejemplo, en una tabla), usa `aria-label` con el ajuste.

### Consideraciones de desarrollo

- No uses un interruptor dentro de un formulario que se envía después: el estado debe aplicarse al instante.
- Anuncia el resultado de cambios lentos con una región de estado o un aviso.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
