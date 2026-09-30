---
element: Movimiento
order: 4
tab: Código
summary: El movimiento explica qué cambió. Productivo en la interfaz, expresivo en los momentos de marca.
---

## CSS

```css
.panel { transition: transform var(--duration-moderate-02) var(--easing-standard-productive); }
.menu { animation: aparecer var(--duration-fast-02) var(--easing-entrance-expressive) both; }
@keyframes aparecer { from { opacity: 0; transform: translateY(-4px); } }
```

## Movimiento reducido

Los componentes de ALMA ya lo respetan. En tus propias animaciones, agrégalo:

```css
@media (prefers-reduced-motion: reduce) {
  .panel, .menu { transition-duration: 1ms; animation-duration: 1ms; }
}
```

## Escalonar

```css
.resultado { animation: aparecer var(--duration-moderate-01) var(--easing-entrance-productive) both;
             animation-delay: calc(var(--i) * var(--duration-stagger)); }
```

Cada elemento lleva su índice en `--i` (0, 1, 2…). Cuida que el último termine antes de 500 ms.

## Flutter

```dart
AnimatedContainer(duration: AlmaDuration.moderate02, curve: AlmaEasing.standardProductive, …);
```

`AlmaDuration` trae `fast01` a `slow02` y `stagger`; `AlmaEasing`, las seis curvas como `Cubic`. Respeta `MediaQuery.disableAnimationsOf(context)`.
