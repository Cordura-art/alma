---
efecto: Hilos
id: hilos
familia: Fondo
summary: Un haz de líneas finas que sale junto de un lado y se abre al cruzar, cada hilo ondulando.
---

## Cuándo

Para acompañar un titular o una frase corta en una apertura. Es el más liviano de los fondos a la vista: deja mucho fondo libre.

No lo uses detrás de tablas, gráficos o diagramas. Sus líneas se confunden con las de ellos.

## Cómo funciona

Cada hilo es una altura que cambia a lo ancho. Los hilos vecinos se mueven parecido, sin moverse igual. Donde parten van apretados; al cruzar, ondulan cada vez más.

Los primeros hilos toman el color del texto y los últimos el acento, y se afinan y se apagan del primero al último.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Cuántos | Cuántos hilos tiene el haz. |
| Amplitud | Cuánto ondula cada hilo. |
| Separación | Cuánto se abren entre sí. En cero, todos pasan por el mismo camino. |
| Grosor | El ancho del hilo más grueso. |
| Velocidad | Qué tan rápido corren. |

## Reacción

Con el puntero arriba ondulan más amplio; hacia la derecha, corren más rápido.

## Código

```js
var hilos = AlmaEfectos.monta('hilos', elemento, { cuantos: 16, separa: 0.2 });
hilos.quita();
```
