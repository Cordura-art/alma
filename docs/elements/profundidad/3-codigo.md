---
element: Profundidad
order: 10
tab: Código
---

## Con la clase

```html
<header class="alma-glass alma-glass--thin">…</header>
<div class="alma-glass">…</div>
<div class="alma-glass alma-glass--thick">…</div>
```

| Clase | Grosor |
|---|---|
| `alma-glass alma-glass--ultra-thin` | Muy delgado |
| `alma-glass alma-glass--thin` | Delgado |
| `alma-glass` | Medio |
| `alma-glass alma-glass--thick` | Grueso |

La clase pone el fondo, el desenfoque, el borde y el color del texto. La posición, el radio y la sombra son de la pieza:

```css
.barra { position: sticky; top: 0; z-index: var(--z-header); border-width: 0 0 1px; }
.menu { border-radius: var(--radius-panel); box-shadow: var(--shadow-floating); }
```

## A mano

```css
.mi-vidrio {
  background: color-mix(in srgb, var(--ui-01) calc(var(--glass-regular) * 100%), transparent);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  border: 1px solid var(--border-subtle);
}
```

Si lo haces a mano, trae también los tres casos en que el vidrio es opaco. La clase ya los trae:

```css
[data-theme$="-hc"] .mi-vidrio { background: var(--ui-01); backdrop-filter: none; }

@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .mi-vidrio { background: var(--ui-01); backdrop-filter: none; }
}

@supports not (backdrop-filter: blur(1px)) {
  .mi-vidrio { background: var(--ui-01); }
}
```

## Tokens

| Token | Valor | Qué es |
|---|---|---|
| `glass-ultra-thin` | 0,5 | Cuánto del color de la superficie queda. |
| `glass-thin` | 0,72 | |
| `glass-regular` | 0,85 | |
| `glass-thick` | 0,94 | |
| `glass-blur` | 24 px | El desenfoque de lo de atrás. |
| `glass-saturate` | 1,6 | Cuánto se aviva el color de lo de atrás. |

Son los mismos en los cuatro temas y en todas las entidades: el vidrio toma el `ui-01` de cada una.

## Lo que hay que saber

- **El desenfoque cuesta.** Cada vidrio obliga al navegador a redibujar lo que tiene detrás. Pocos y no muy grandes. Un vidrio a pantalla completa sobre un video es lo más caro que se puede pedir.
- **Lo de atrás tiene que estar atrás.** El desenfoque toma lo que queda bajo la pieza en la pila de la página. Si la pieza no flota sobre nada, no hay nada que desenfocar.
- **Dentro de un vidrio, otro vidrio no desenfoca al primero** en todos los navegadores. Para lo que va encima de un vidrio, usa el grueso.
- **Una prueba lo cuida.** `tests/vidrio.test.mjs` falla si un cambio en los grosores o en los colores de texto rompe el contraste asegurado.
