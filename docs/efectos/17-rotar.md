---
efecto: Rotar
id: rotar
familia: Texto
summary: Una palabra de una frase deja su lugar a otras, de a una, y vuelve.
---

## Cuándo

Para una frase de apertura donde una palabra tiene varias respuestas: «Un sistema claro», «simple», «propio». Al final de una línea, para que el cambio de ancho no mueva el resto.

No lo uses en medio de un párrafo ni para decir algo que hay que alcanzar a leer: cada palabra se ve un momento y se va.

## Cómo funciona

Se pone sobre un elemento cuyo texto son las palabras, separadas por una barra: `claro | simple | propio`. La primera es la verdadera. Cada palabra sale hacia arriba mientras la siguiente entra desde abajo.

Las recorre una vez, la primera vez que entra a la vista, y se detiene en la primera. No sigue sola: un texto que cambia sin parar distrae, y nadie puede detenerlo.

Cada palabra se queda tantas veces `duration-slow-02` como diga el ajuste; el cambio toma `duration-moderate-02`.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Pausa en cada palabra | Cuánto se queda cada una antes de dar paso a la siguiente. |
| Subida | Cuánto recorre cada palabra al entrar y al salir, en proporción al tamaño de la letra. |

## Accesibilidad

Un lector de pantalla lee solo la primera palabra, la verdadera: la frase tiene que tener sentido con ella. Con menos movimiento, se ve solo esa.

## Código

```js
// <p>Un sistema <span id="como">claro | simple | propio</span></p>
var como = AlmaEfectos.monta('rotar', document.getElementById('como'));
como.pasa();   // otra vuelta
```
