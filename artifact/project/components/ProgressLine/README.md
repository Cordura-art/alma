# ProgressLine

Una línea lima que indica una espera de marca y termina en verde.


## Uso

### Resumen

`ProgressLine` es una línea delgada: un brillo lima la recorre mientras algo se procesa y queda verde al terminar. Es propia de ALMA, de las pantallas de pago de Cordura.

#### Cuándo usarla
- Sobre una pantalla velada con `overlay-01`, centrada cerca del borde inferior, mientras se procesa un pago o una validación.
- En momentos de marca, donde una barra de trabajo se vería fuera de lugar.

#### Cuándo no usarla
- **Para mostrar cuánto falta:** `ProgressBar` (no tiene valor).
- **En una interfaz de trabajo:** `ProgressBar` o `ActivityIndicator`.

### Estados

| Estado | Aspecto |
|---|---|
| `loading` | Un brillo lima recorre la línea. |
| `success` | Verde fijo. |

> **Imagen pendiente:** la pantalla de pago velada, con la línea cargando y luego en verde.

### Contenido

- `label` dice qué se hace («Validando pago»); lo oye el lector. Si la espera es larga, muéstralo también en pantalla.

### Relacionados

`ProgressBar` · `ActivityIndicator` · Carga.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Brillo (cargando) | color | `progress-line-loading` (`brand-lime`) |
| Línea (terminada) | color | `progress-line-success` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Línea | ancho, alto | 185 px, 2 px |
| Línea | radio | 1 px |

### Movimiento

El brillo recorre la línea cada 1,4 s (dos veces `duration-slow-02`) con `easing-standard-expressive`. Con movimiento reducido, el brillo queda fijo.

### Contraste

Sobre `overlay-01`, el lima llega a 3:1. En la interfaz normal no se usa.

## Código

### Uso

```js
const { ProgressLine } = window.AlmaDS;
h(ProgressLine, { status: paying ? 'loading' : 'success', label: paying ? 'Validando pago' : 'Pago aprobado' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `status` | `'loading' \| 'success'` | `'loading'` | Estado. |
| `label` | `string` | `'Cargando'` / `'Listo'` | Lo oye el lector. |

## Accesibilidad

### Qué ofrece ALMA

- Mientras carga es `role="progressbar"` con `aria-busy`; al terminar, `role="status"`. Ambos nombrados por `label`.
- Con movimiento reducido, el brillo queda fijo.

### Recomendaciones de diseño

- El resultado (aprobado o rechazado) se dice con texto en la pantalla, no solo con el verde.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
