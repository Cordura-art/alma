---
element: Espaciado y grilla
order: 3
tab: Código
summary: La escala de 8, la grilla responsive, la densidad y las capas.
---

## CSS

```css
.tarjeta { padding: var(--space-16); border-radius: var(--radius-panel); background: var(--ui-01); }
.acciones { display: flex; gap: var(--space-8); }
.menu { z-index: var(--z-dropdown); box-shadow: var(--shadow-floating); }
```

Los puntos de quiebre no se pueden usar como variables dentro de `@media`: escribe su valor y nombra el token en un comentario.

```css
@media (min-width: 1056px) { /* bp-lg */ .app { grid-template-columns: auto 1fr; } }
```

## Densidad

```html
<section data-density="compact"> … </section>
```

## Flutter

```dart
Padding(padding: const EdgeInsets.all(AlmaSpacing.space16), child: …);
BorderRadius.circular(AlmaRadius.radiusPanel);
if (width >= AlmaBreakpoint.bpLg) { /* Sidebar */ }
```

`AlmaSpacing`, `AlmaRadius`, `AlmaBreakpoint`, `AlmaSize`, `AlmaGrid` y `AlmaShadow` están en `dist/dart/alma_tokens.dart`.
