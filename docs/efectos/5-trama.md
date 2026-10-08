---
efecto: Trama
id: trama
familia: Transición
summary: Una cosa deja paso a otra detrás de una trama de cuadros que se llena al azar y luego se despeja.
---

## Cuándo

Para cambiar una imagen o una tarjeta por otra en el mismo lugar: las dos caras de una ficha, el antes y el después, una pieza de portada que cambia de escena.

No la uses para pasar de una página a otra en un producto, ni sobre texto largo. Tapa todo por un momento.

## Cómo funciona

Se pone sobre un elemento que tiene las dos cosas: la que está y la que viene, escondida. Al pedirle el paso, los cuadros tapan lo que hay, uno a uno y al azar. Cuando ya no se ve nada, cambia una cosa por la otra, y los cuadros se van igual.

Los cuadros son siempre cuadrados: eliges las columnas, y las filas salen del alto. Toman el color del acento. Tapar toma `duration-slow-01`; despejar, lo mismo.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Columnas | Cuántos cuadros caben a lo ancho. Menos columnas, cuadros más grandes. |

## Quién la dispara

La trama no decide cuándo pasar: lo decide quien la usa, con un botón, un clic o el foco. Lo que dispara el cambio tiene que poder alcanzarse con el teclado.

## Con menos movimiento

Cambia de una vez, sin cuadros.

## Código

```js
var trama = AlmaEfectos.monta('trama', elemento, { columnas: 8 });
boton.addEventListener('click', trama.pasa);
```
