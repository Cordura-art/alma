---
element: Figuras de línea
order: 11
tab: Código
summary: Cómo poner una figura en una página.
---

## Los archivos

Las figuras están en `assets/Figuras/`: el motor (`motor.js`) y un archivo por figura. Carga el motor y las que uses.

```html
<script src="assets/Figuras/motor.js"></script>
<script src="assets/Figuras/portatil.js"></script>
```

## Montar una

```js
var figura = AlmaFigura.monta(elemento, 'portatil', {
  etiqueta: 'Un portátil abierto',   // su nombre, para quien no la ve
  intensidad: 0.5,                   // cuánto responde: de 0 a 1
  genes: rasgos                      // opcional: los rasgos de una entidad
});

figura.pon({ intensidad: 1 });       // cambiar algo después
figura.suelta();                     // al quitarla de la página
```

| Opción | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `etiqueta` | texto | la descripción de la figura | Su nombre accesible. |
| `intensidad` | número, de 0 a 1 | 0,5 | Cuánto se mueve al responder. |
| `genes` | objeto | — | Los rasgos de una entidad: la figura toma de ellos sus piezas y proporciones. |
| `tema` | nombre de un tema | el de la página | Fija el tema de esa figura. |
| `alLeer` | función | — | Recibe lo que la figura dice cada vez que cambia. |

`AlmaFigura.figuras` trae todas las cargadas, con su `titulo` y su `describe`.

## Quieta, dentro de una tarjeta

```js
function Figura(props) {
  var ref = React.useRef(null);
  React.useEffect(function () {
    var f = AlmaFigura.monta(ref.current, props.nombre, { etiqueta: props.alt });
    ref.current.querySelector('svg').removeAttribute('tabindex');   // la tarjeta es la que responde
    return function () { f.suelta(); };
  }, [props.nombre]);
  return h('div', { ref: ref });
}

h(A.ProductCard, { title: 'Portátil Ruta 14', price: '$899.990', media: h(Figura, { nombre: 'portatil', alt: 'Un portátil abierto' }) });
```
