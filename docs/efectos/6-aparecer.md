---
efecto: Aparecer
id: aparecer
familia: Transición
summary: Una pieza toma forma cuando entra a la vista: de borrosa a nítida, subiendo un poco.
---

## Cuándo

Para las piezas de una página larga de presentación: cada sección, cada imagen, al llegar a ella.

No lo uses en un producto ni en lo primero que se ve al abrir. Ahí la persona viene a hacer algo, y esperar a que el contenido aparezca la frena.

## Cómo funciona

Se pone sobre la pieza misma. Espera transparente, borrosa y un poco más abajo; cuando una décima parte de ella entra a la vista, toma su lugar. Pasa una sola vez.

Toma `duration-slow-02` y la curva de entrada expresiva.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Desenfoque | Qué tan borrosa parte. En cero, solo cambia de transparente a sólida. |
| Subida | Desde cuánto más abajo llega. |

## Accesibilidad

La pieza está en la página todo el tiempo: un lector de pantalla la encuentra aunque todavía no haya aparecido. Con menos movimiento, está a la vista desde el principio.

## Código

```js
var entrada = AlmaEfectos.monta('aparecer', pieza, { subida: 24 });
entrada.pasa();   // otra vez
```
