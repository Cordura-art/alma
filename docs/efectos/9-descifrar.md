---
efecto: Descifrar
id: descifrar
familia: Texto
summary: Una línea de texto llega revuelta y se ordena letra por letra, desde el principio.
---

## Cuándo

Para una línea corta que vale la pena mirar llegar: un titular, una cifra con nombre, una etiqueta en una portada.

No lo uses en párrafos, en texto de un producto ni en nada que haya que leer de inmediato. Mientras se ordena, no se lee.

## Cómo funciona

Las letras revueltas son las de la misma línea, barajadas: así el texto conserva su aspecto y casi su ancho mientras se ordena. Se ordena de izquierda a derecha, una letra cada tantos pulsos. El pulso es `duration-stagger`, el mismo con que se escribe la palabra de una entidad.

Pasa la primera vez que entra a la vista.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Pulsos por letra | Cuánto tarda cada letra en quedar en su lugar. |
| Calma del revuelo | Cada cuánto cambian las letras que aún no se ordenan. Más alto, más tranquilo. |

## Accesibilidad

El texto verdadero está siempre en la página, fuera de la vista: un lector de pantalla lee la línea ordenada y nunca el revuelo. Con menos movimiento, la línea está ordenada desde el principio.

Úsalo en una sola línea. En un texto de varias líneas, las letras revueltas cambian el ancho y las líneas saltan.

## Código

```js
var linea = AlmaEfectos.monta('descifrar', titular, { pulsos: 2 });
linea.pasa();   // otra vez
```
