---
efecto: Velo
id: velo
familia: Fondo
summary: Cortinas de luz que cuelgan desde lo alto de una sección y se mecen.
---

## Cuándo

Para una apertura tranquila: lo alto de una portada, el encabezado de una página de presentación. Deja libre la parte de abajo, donde va lo que hay que leer.

No lo uses de fondo de una página entera ni detrás de un producto.

## Cómo funciona

A lo ancho corre un borde que ondula despacio. Sobre el borde hay luz; bajo él, la luz se apaga de a poco. Un dibujo más fino hace los pliegues de la tela.

La luz va del acento, en los lados, hacia el color del texto, en el centro, sobre el fondo de la página.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Caída | Hasta dónde baja el velo. |
| Amplitud | Cuánto ondula el borde. En cero, es una franja recta. |
| Suavidad | Qué tan de a poco se apaga la luz hacia abajo. |
| Fuerza | Cuánta luz lleva. |
| Velocidad | Qué tan rápido se mece. |

## Reacción

El velo se corre un poco hacia donde va el puntero.

## Código

```js
var velo = AlmaEfectos.monta('velo', elemento, { alto: 0.3, fuerza: 0.5 });
velo.quita();
```
