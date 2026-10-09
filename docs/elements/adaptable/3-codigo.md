---
element: Diseño adaptable
order: 8
tab: Código
summary: Los puntos de quiebre en CSS.
---

## Desde lo angosto

Los estilos base son los del ancho angosto. Cada punto de quiebre agrega lo que cambia desde ahí hacia arriba.

```css
.vista { display: grid; gap: var(--space-16); }

@media (min-width: 672px) {   /* bp-md */
  .vista { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1056px) {  /* bp-lg */
  .vista { grid-template-columns: 16rem 1fr 1fr; }
}
```

Una consulta de medios no puede leer una variable de CSS: escribe el valor del token y deja su nombre al lado.

## Según el contenedor

Cuando una pieza vive en lugares de distinto ancho, pregúntale a su contenedor:

```css
.panel { container-type: inline-size; }

@container (min-width: 480px) {
  .tarjeta { grid-template-columns: 8rem 1fr; }
}
```

## Sin puntos de quiebre

Mucho se adapta solo, sin ninguna consulta:

```css
.grupo { display: grid; gap: var(--space-24); grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); }
.fila  { display: flex; flex-wrap: wrap; gap: var(--space-8); }
.texto { max-width: 48rem; }
```

## Área segura

```css
.barra-inferior { padding-bottom: calc(var(--space-8) + env(safe-area-inset-bottom, 0px)); }
```

## Tokens

| Token | Valor |
|---|---|
| `bp-sm` | {token:bp-sm} |
| `bp-md` | {token:bp-md} |
| `bp-lg` | {token:bp-lg} |
| `bp-xlg` | {token:bp-xlg} |
| `bp-max` | {token:bp-max} |

La grilla de cada uno está en **Espaciado y grilla › Grilla**.
