---
efecto: Halo
id: halo
familia: Fondo
summary: Un anillo de luz que respira y la estela que deja al abrirse.
---

## Cuándo

Para abrir: detrás del nombre en una portada o en la primera sección de una página. Uno por pantalla.

No lo uses detrás de un formulario, una tabla o un texto largo. Ahí distrae.

## Cómo funciona

No se dibuja de nuevo en cada cuadro. Cada cuadro toma el anterior, lo agranda apenas desde el centro, lo deja apagarse un poco y le suma un anillo fino. La luz vieja se abre hacia afuera y se enrosca: esa es la estela.

Usa dos luces, que toman el acento y el color del texto, sobre el fondo de la página. Al cambiar de tema o de entidad, cambian solas.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Tamaño | El radio del anillo. |
| Pulso | Cuánto suben y bajan los pétalos. En cero, es un círculo. |
| Pétalos | Cuántas puntas tiene el anillo. |
| Estela | Cuánto dura la luz que queda. |
| Giro | Cuánto se enrosca la estela, y hacia qué lado. |
| Velocidad | Qué tan rápido respira. |
| Centro | Dónde está el anillo. Puede quedar fuera de la vista y dejar ver solo la estela. |

## Reacción

El centro se inclina hacia el puntero, sin apuro.

## Código

```js
var halo = AlmaEfectos.monta('halo', elemento, { tamano: 1.4, x: -0.3 });
halo.ajusta('estela', 0.9);
halo.quita();
```
