---
efecto: Foco
id: foco
familia: Reacción
summary: Una luz suave bajo el puntero, dentro de una superficie, que lo sigue.
---

## Cuándo

En tarjetas que se pueden abrir, sobre todo cuando hay varias juntas: la luz dice cuál está bajo el puntero sin mover nada.

No lo uses en superficies con mucho texto chico ni en filas de una tabla.

## Cómo funciona

La luz es un degradado redondo puesto sobre la superficie, con el centro donde está el puntero. Aparece al entrar y se apaga al salir. Con el teclado, aparece al centro cuando llega el foco.

Toma el color del acento, a medias con transparente. Aparece y se apaga en `duration-moderate-02`.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Brillo | Cuánta luz lleva. Bajo, para que el texto se siga leyendo. |
| Radio | Hasta dónde llega la luz. |

## Con menos movimiento

Se mantiene: la luz no se desplaza por su cuenta, solo está donde está el puntero.

## Código

```js
var foco = AlmaEfectos.monta('foco', tarjeta, { radio: 160 });
foco.quita();
```
