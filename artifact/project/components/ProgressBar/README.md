# ProgressBar

Una barra que muestra el avance de una tarea larga.


## Uso

### Resumen

`ProgressBar` muestra cuánto avanzó una tarea: con porcentaje (determinada) o en movimiento (indeterminada). Sigue *Progress indicators* de Apple.

#### Cuándo usarla
- Tareas que tardan más de unos segundos: subir archivos, procesar un pago, importar datos.
- **La determinada siempre que se pueda:** ayuda a decidir si esperar, hacer otra cosa o volver después.

#### Cuándo no usarla
- **Una acción corta de un botón:** `Button` con `loading`.
- **Una espera sin avance medible y corta:** `ActivityIndicator`.
- **Pasos de un flujo:** `ProgressIndicator`.

### Tipos

| Tipo | Propiedad | Aspecto |
|---|---|---|
| Determinada | `value` entre 0 y 1 | Barra que se llena y porcentaje. |
| Indeterminada | sin `value` | Un tramo que recorre la pista. |
| Terminada | `status: 'success'` o `'error'` | Relleno verde o rojo. |

### Anatomía

1. **Etiqueta** y **porcentaje**, arriba.
2. **Pista.**
3. **Relleno.**
4. **Descripción** (opcional), abajo.

> **Imagen pendiente:** una barra determinada al 60%, una indeterminada y una con error.

### Contenido

- **Etiqueta:** qué tarea es («Subiendo fotos»).
- **Descripción:** el detalle preciso: «Subiendo 3 de 12 fotos», no «Cargando».
- Al terminar con error, la descripción dice qué hacer.

### Comportamiento

- Sé preciso y parejo: no muestres 90% en cinco segundos y el 10% restante en cinco minutos.
- La barra nunca se queda quieta. Si el proceso se detiene, dilo y explica qué hacer.
- Si una tarea indeterminada llega a conocer su duración, pásala a determinada.
- No cambies entre barra e indicador giratorio durante una misma espera.

### Relacionados

`ActivityIndicator` · `ProgressIndicator` · `ProgressLine` · Carga.

### Referencias

- Apple, Human Interface Guidelines: Progress indicators.
- IBM, Carbon Design System: Progress bar.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Pista | fondo | `progress-bar-track` |
| Relleno | fondo | `progress-bar-fill` |
| Relleno (éxito) | fondo | `progress-bar-fill-success` |
| Relleno (error) | fondo | `progress-bar-fill-error` |
| Etiqueta | color del texto | `text-01` |
| Porcentaje y descripción | color del texto | `text-02` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta y porcentaje | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Descripción | 12 / 0,75 | Regular / 400 | `web-body-s` |

El porcentaje usa cifras tabulares.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | ancho máximo | 480 px |
| Pista | alto, radio | 8 px, `radius-pill` |
| Tramo indeterminado | ancho | 35 % de la pista |
| Elementos | separación | 8 px |

> **Imagen pendiente:** anatomía acotada.

### Movimiento

El relleno avanza en `duration-moderate-02` con `easing-standard-productive`. El tramo indeterminado recorre la pista cada 1,4 s. Con movimiento reducido, el tramo queda fijo, a todo el ancho y semitransparente.

### Contraste

Relleno a 3:1 sobre la pista; textos a 4,5:1, en los cuatro temas.

## Código

### Uso

```js
const { ProgressBar } = window.AlmaDS;
h(ProgressBar, { label: 'Subiendo fotos', value: 0.25, description: 'Subiendo 3 de 12 fotos' })
h(ProgressBar, { label: 'Preparando tu boleta' })                              // indeterminada
h(ProgressBar, { label: 'Subiendo fotos', value: 1, status: 'success', description: '12 fotos subidas' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `value` | `number` (0 a 1) \| `null` | — | Sin valor, indeterminada. |
| `label` | `string` | — | La tarea; nombra la barra. |
| `description` | `string` | — | El detalle; también lo lee el lector. |
| `status` | `'success' \| 'error'` | — | Al terminar. |

## Accesibilidad

### Qué ofrece ALMA

- La pista es `role="progressbar"`, nombrada por `label`.
- Determinada: `aria-valuemin` 0, `aria-valuemax` 100 y `aria-valuenow` con el porcentaje.
- Indeterminada: sin valor, como pide ARIA.
- `description` se lee como el valor (`aria-valuetext`): «Subiendo 3 de 12 fotos».
- Con movimiento reducido, el tramo indeterminado queda fijo.

### Recomendaciones de diseño

- El estado final (éxito o error) se dice en la descripción, no solo con el color del relleno.

### Consideraciones de desarrollo

- Actualiza el valor a un ritmo razonable (cada punto porcentual, no cada milisegundo): cada cambio puede anunciarse.
- Al terminar, anuncia el resultado en una región `role="status"`, o con un `toast`.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
