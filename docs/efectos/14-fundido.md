---
efecto: Fundido
id: fundido
familia: Transición
summary: Una cosa se desenfoca y se apaga mientras la otra toma foco en su lugar.
---

## Cuándo

Para cambiar una imagen por otra sin llamar la atención: una galería que avanza sola, el antes y el después de una misma pieza. Es la transición más callada de la colección.

No lo uses entre dos textos largos: por un momento se leen los dos encima.

## Cómo funciona

Se pone sobre un elemento que tiene las dos cosas: la que está y la que viene, escondida. Las deja una sobre la otra, en el mismo lugar. Al pedirle el paso, la que está se desenfoca y se apaga, y la que viene hace el camino contrario, al mismo tiempo.

Toma `duration-slow-02` y la curva estándar expresiva.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Desenfoque | Cuánto se desenfocan al cruzarse. En cero, es un fundido simple. |

## Quién lo dispara

No decide cuándo pasar: lo decide quien lo usa. Si avanza solo, tiene que poder detenerse.

## Con menos movimiento

Cambia de una vez.

## Código

```js
var fundido = AlmaEfectos.monta('fundido', elemento, { desenfoque: 12 });
boton.addEventListener('click', fundido.pasa);
```
