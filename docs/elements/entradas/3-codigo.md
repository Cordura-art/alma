---
element: Entradas
order: 9
tab: Código
summary: Preguntar qué puede hacer la entrada, no qué aparato es.
---

## Qué puede hacer

```css
/* Solo donde se puede pasar por encima */
@media (hover: hover) {
  .fila:hover { background: var(--hover-ui); }
}

/* Donde el puntero es poco preciso: el dedo */
@media (pointer: coarse) {
  .control { min-height: var(--size-touch-min); min-width: var(--size-touch-min); }
}
```

`any-pointer` y `any-hover` preguntan por cualquiera de las entradas del equipo, no solo por la principal: sirven para un computador con pantalla táctil.

## Área de toque más grande que el control

```css
.icono-boton { position: relative; }
.icono-boton::after { content: ""; position: absolute; inset: 50% auto auto 50%; width: var(--size-touch-min); height: var(--size-touch-min); transform: translate(-50%, -50%); }
```

## Actuar al soltar

Usa `click`, que se dispara al soltar y sirve para puntero, toque y teclado. No actúes en `pointerdown` ni en `touchstart`.

```js
boton.addEventListener('click', guardar);
```

## Foco solo con teclado

```css
.control:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
```

## Tokens

| Token | Valor | Para |
|---|---|---|
| `size-touch-min` | 44 px | El área mínima de todo control. |
| `size-control-compact` | 32 px | Controles en densidad compacta, solo con puntero fino. |
| `space-8` | 8 px | La separación mínima entre dos áreas de toque. |
