# ActivityIndicator

Un indicador giratorio para una espera cuya duración no se conoce.


## Uso

### Resumen

`ActivityIndicator` dice que algo está pasando cuando no se puede medir cuánto falta. Es el *activity indicator* de Apple y el *inline loading* de Carbon.

#### Cuándo usarlo
- Mientras algo carga y no hay forma de medir el avance, en una sección o junto a un elemento.
- En la fila de un archivo que se está subiendo (`FileUploader` ya lo usa).

#### Cuándo no usarlo
- **Si puedes medir el avance:** `ProgressBar` con valor.
- **Dentro de un botón:** `Button` con `loading`.
- **Mientras llega una vista con estructura conocida:** `Skeleton`.
- **Para esperas de menos de un segundo:** nada.

### Anatomía

Un círculo que gira, del color `control-on`, y un texto que solo oye el lector de pantalla.

> **Imagen pendiente:** el indicador a 20, 24 y 40 px, en tema oscuro y claro.

### Tamaños

| Tamaño | Uso |
|---|---|
| 20 px | Dentro de filas y controles. |
| 24 px (por defecto) | Junto a texto. |
| 40 px | En el centro de una sección vacía que carga. |

### Contenido

- `label` dice qué se está haciendo: «Verificando pago», no «Cargando».
- Si la espera se alarga, muestra un texto visible al lado.

### Comportamiento

- No cambies entre indicador y barra durante una misma espera: son formas distintas.
- Si la espera falla, reemplázalo por el error y una forma de reintentar.

### Relacionados

`ProgressBar` · `Skeleton` · `Button` (`loading`) · Carga.

### Referencias

- Apple, Human Interface Guidelines: Progress indicators.
- IBM, Carbon Design System: Inline loading.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Círculo | color | `activity-indicator` (`control-on`) |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Caja | tamaño | `size` (24 px por defecto) |
| Círculo | tamaño | `size` − 4 px |

### Movimiento

Gira de forma continua. Con movimiento reducido, deja de girar y queda semitransparente, pero sigue visible.

### Contraste

`control-on` a 3:1 sobre la página y los contenedores, en los cuatro temas.

## Código

### Uso

```js
const { ActivityIndicator } = window.AlmaDS;
h(ActivityIndicator, { label: 'Verificando pago' })
h(ActivityIndicator, { size: 40, label: 'Buscando viajes' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | `'Cargando'` | Qué se está haciendo; lo oye el lector. |
| `size` | `number` (px) | `24` | Tamaño de la caja. |

## Accesibilidad

### Qué ofrece ALMA

- Es una región `role="status"` con el texto de `label` oculto a la vista: el lector lo anuncia al aparecer, sin interrumpir.
- No recibe foco.
- Con movimiento reducido, deja de girar pero sigue visible.

### Recomendaciones de diseño

- Un `label` que diga qué está pasando.
- Si la espera es larga, un texto visible, para quien no usa lector.

### Consideraciones de desarrollo

- Quita el indicador cuando termine: si queda en la página, el lector lo seguirá encontrando.
- Marca la zona que carga como ocupada (`aria-busy`) si el contenido cambia al terminar.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
