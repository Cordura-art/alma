---
efecto: Grano
id: grano
familia: Fondo
summary: Manchas amplias de color que se mezclan despacio, bajo un grano fino y quieto como el del papel.
---

## Cuándo

Para dar color y textura a una sección entera sin dibujar nada: una apertura, una pantalla de bienvenida, el fondo de una cita.

Recuerda que el texto no va directo sobre un fondo vivo: aquí el color cambia de lugar y, con él, el contraste.

## Cómo funciona

Un dibujo lento dice, en cada punto, cuál de los colores hay. Antes de leerlo, otro dibujo corre un poco el lugar donde se lee: eso hace que las manchas se enrosquen en vez de quedar como parches.

El grano es un valor fijo para cada punto de la pantalla: no parpadea. Las manchas toman el acento y, en menor medida, el color del texto, sobre el fondo de la página.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Escala | El tamaño de las manchas. Más alto, manchas más chicas. |
| Mezcla | Cuánto se enroscan unas en otras. En cero, son parches suaves. |
| Fuerza | Cuánto color llevan. |
| Grano | Cuánto se nota el grano. En cero, es un degradado limpio. |
| Velocidad | Qué tan rápido se mueven. |

## Reacción

Las manchas se corren apenas hacia donde va el puntero.

## Código

```js
var grano = AlmaEfectos.monta('grano', elemento, { escala: 0.8, grano: 0.06 });
grano.quita();
```
