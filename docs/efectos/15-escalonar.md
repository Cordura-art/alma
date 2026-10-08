---
efecto: Escalonar
id: escalonar
familia: Texto
summary: Las palabras de una línea entran una tras otra, cada una subiendo un poco hasta su lugar.
---

## Cuándo

Para un titular o una frase de apertura que merece llegar con calma. Una por pantalla.

No lo uses en párrafos ni en texto de un producto. Tampoco en el nombre de una entidad: ese tiene su propia manera de escribirse.

## Cómo funciona

Cada palabra es una pieza aparte, y cada una parte unos pulsos después de la anterior. Los espacios siguen siendo espacios: la línea se corta donde se cortaría sin el efecto.

El pulso es `duration-stagger`. Cada palabra tarda `duration-slow-01`, con la curva de entrada expresiva. Pasa la primera vez que entra a la vista.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Pulsos entre palabras | Cuánto espera cada palabra a la anterior. |
| Subida | Desde cuánto más abajo llega cada palabra, en proporción al tamaño de la letra. |

## Cuánto dura

En una frase larga, el total crece con cada palabra. Mantén la frase corta o baja los pulsos: sobre medio segundo de espera, la última palabra llega tarde.

## Accesibilidad

El texto verdadero está siempre en la página, entero y fuera de la vista: un lector de pantalla lee la frase de una vez, no palabra por palabra. Con menos movimiento, la frase está completa desde el principio.

## Código

```js
var frase = AlmaEfectos.monta('escalonar', titular, { pulsos: 2 });
frase.pasa();   // otra vez
```
