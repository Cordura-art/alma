---
efecto: Cortina
id: cortina
familia: Transición
summary: Un paño liso cruza de lado a lado y, al pasar, lo que había es otra cosa.
---

## Cuándo

Para un cambio grande y decidido: de una escena de portada a la siguiente, de una imagen a otra en una pieza destacada.

No la uses para cambios chicos o frecuentes, como pasar de una pestaña a otra. Tapa todo por un momento, y repetida cansa.

## Cómo funciona

Se pone sobre un elemento que tiene las dos cosas: la que está y la que viene, escondida. Al pedirle el paso, el paño entra por un lado hasta taparlo todo, cambia una cosa por la otra detrás de él y sale por el lado contrario, sin detenerse.

El paño toma el color del acento. Entrar toma `duration-slow-01`, con la curva de entrada expresiva; salir, lo mismo con la de salida.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Dirección | Hacia dónde cruza: 0 es hacia la derecha, 90 hacia abajo, 180 hacia la izquierda, 270 hacia arriba. Nunca en diagonal. |

## Quién la dispara

Como la Trama, no decide cuándo pasar: lo decide quien la usa. Avanzar y volver deberían cruzar en sentidos contrarios.

## Con menos movimiento

Cambia de una vez, sin paño.

## Código

```js
var cortina = AlmaEfectos.monta('cortina', elemento, { giro: 90 });
boton.addEventListener('click', cortina.pasa);
```
