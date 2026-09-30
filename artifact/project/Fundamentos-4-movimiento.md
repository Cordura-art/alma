# Movimiento

El movimiento explica qué cambió. Productivo en la interfaz, expresivo en los momentos de marca.


## Resumen

### Por qué se mueve algo

Cordura es un estudio de lenguajes de movimiento, y ALMA usa el lenguaje de movimiento de IBM (IBM Design Language, Carbon). El movimiento explica qué cambió, de dónde vino algo y a dónde fue. Nunca decora.

### Dos estilos

| Estilo | Tokens | Cuándo |
|---|---|---|
| **Productivo** | `easing-*-productive` | La interfaz de trabajo. Eficiente, no distrae. Es el de los componentes. |
| **Expresivo** | `easing-*-expressive` | Momentos importantes: abrir una página nueva, la acción principal, alertas, un pago aprobado. Con moderación. |

### Curva según la intención

| Curva | Para lo que |
|---|---|
| `standard` | Se mueve dentro de la pantalla. |
| `entrance` | Aparece: desacelera al llegar. |
| `exit` | Se va: acelera al salir. |

> **Imagen pendiente:** las seis curvas dibujadas, productivas y expresivas.

### Duración según el tamaño y la distancia

| Token | Valor | Para |
|---|---|---|
| `duration-fast-01` | 70 ms | Botones y toggles. |
| `duration-fast-02` | 110 ms | Tooltips, bordes de campo, menús. |
| `duration-moderate-01` | 150 ms | Cambios cortos. Por defecto. |
| `duration-moderate-02` | 240 ms | Expansiones, toasts, modales. |
| `duration-slow-01` | 400 ms | Expansiones grandes. |
| `duration-slow-02` | 700 ms | Velos y portadas. |

### Recetas de IBM

| Receta | Duración y curva | En ALMA |
|---|---|---|
| Revelar | `duration-moderate-01` + `easing-entrance-productive` | Sidebar. El contenido del Accordion usa la misma curva con `duration-moderate-02`. |
| Contextual | `duration-fast-02` + `easing-entrance-expressive` | Menús, tooltips, popovers. |
| Expandir | `duration-moderate-02` + `easing-standard-productive` | Paneles que crecen en su lugar. |
| Invocar | `duration-moderate-02` + `easing-standard-expressive` | Modal y Alert. |

### Movimiento reducido

Si la persona lo pide en su sistema, **toda** animación de ALMA se vuelve instantánea. No hay excepciones: `bundle.css` lo aplica a todo el sistema. El movimiento nunca es la única forma de comunicar algo.

## Coreografía

### Cuando entran varios elementos

Si una pantalla nueva trae varios elementos, no los animes todos a la vez ni uno por uno. Repártelos por grupos, con `duration-stagger` (20 ms) entre cada uno, y con el total bajo 500 ms.

| Orden | Qué entra |
|---|---|
| 1 | La estructura: barras de navegación. |
| 2 | El contenido estático: títulos, texto, imágenes. |
| 3 | El contenido dinámico: datos de una tabla, resultados. |
| 4 | La acción principal. |
| 5 | Los gráficos animados. |

> **Imagen pendiente:** línea de tiempo de la entrada de una pantalla de resultados, con los cinco grupos.

### Principios de IBM Carbon

- **Expresivo solo en lo importante.** El resto es productivo.
- **Sobre la grilla.** Nada se mueve en diagonal.
- **Lo que significa lo mismo se mueve igual.** Desplegar una fila y abrir un menú usan la misma curva; la duración cambia con el tamaño.
- **La dirección tiene sentido.** Avanzar en la dirección de entrada afirma; volver sobre ella cancela.
- **Continuidad.** Los elementos compartidos entre pantallas (títulos, botones) hacen de puente en la transición.
- **Las salidas son más cortas que las entradas.**

### Principios de Apple

- **Con propósito.** Acompaña la experiencia, no la tapa.
- **Opcional.** Nunca es la única forma de comunicar algo importante.
- **Realista.** Sigue el gesto y la expectativa: lo que baja para abrirse sube para cerrarse.
- **Breve y preciso** en la respuesta a una acción, sin animaciones propias en interacciones frecuentes.
- **Interrumpible.** Nadie espera a que termine una animación para seguir.

### Movimiento de marca

Estas recetas son el punto de partida. Las propias de Cordura se iterarán desde aquí, sobre la misma base de tokens.

## Código

### CSS

```css
.panel { transition: transform var(--duration-moderate-02) var(--easing-standard-productive); }
.menu { animation: aparecer var(--duration-fast-02) var(--easing-entrance-expressive) both; }
@keyframes aparecer { from { opacity: 0; transform: translateY(-4px); } }
```

### Movimiento reducido

Los componentes de ALMA ya lo respetan. En tus propias animaciones, agrégalo:

```css
@media (prefers-reduced-motion: reduce) {
  .panel, .menu { transition-duration: 1ms; animation-duration: 1ms; }
}
```

### Escalonar

```css
.resultado { animation: aparecer var(--duration-moderate-01) var(--easing-entrance-productive) both;
             animation-delay: calc(var(--i) * var(--duration-stagger)); }
```

Cada elemento lleva su índice en `--i` (0, 1, 2…). Cuida que el último termine antes de 500 ms.

### Flutter

```dart
AnimatedContainer(duration: AlmaDuration.moderate02, curve: AlmaEasing.standardProductive, …);
```

`AlmaDuration` trae `fast01` a `slow02` y `stagger`; `AlmaEasing`, las seis curvas como `Cubic`. Respeta `MediaQuery.disableAnimationsOf(context)`.
