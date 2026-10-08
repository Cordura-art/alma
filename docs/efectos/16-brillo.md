---
efecto: Brillo
id: brillo
familia: Texto
summary: Una franja de luz recorre una vez una línea de texto.
---

## Cuándo

Para una línea corta que anuncia algo: una novedad, un estado, una invitación a seguir.

No lo uses en texto que hay que leer con atención ni en más de una línea a la vez.

## Cómo funciona

La línea se pinta con un degradado en vez de un color parejo: el color de texto secundario a lo largo, y una franja del color principal que espera fuera de la vista. Al ver la línea, la franja la cruza una vez. Vuelve a cruzar al pasar el puntero o al llegar con el teclado.

No se repite sola: un brillo que no para distrae, y nadie puede detenerlo.

Dura tantas veces `duration-slow-02` como diga el ajuste.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Ancho | El grosor de la franja. |
| Duración | Cuántas veces `duration-slow-02` tarda en cruzar. |

## Ten en cuenta

Mientras tiene el efecto, la línea se ve en el color de texto secundario, no en el principal. Los dos cumplen el contraste, pero el texto queda un tono más bajo.

## Con menos movimiento

El efecto no se pone: la línea se ve como cualquier otra, en su color.

## Código

```js
var aviso = AlmaEfectos.monta('brillo', linea);
aviso.pasa();   // otra vez
```
