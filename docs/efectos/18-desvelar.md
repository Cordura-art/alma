---
efecto: Desvelar
id: desvelar
familia: Texto
summary: Las palabras de un pasaje pasan de tenues a plenas, una tras otra, a medida que se avanza por la página.
---

## Cuándo

Para un pasaje corto que se lee al paso, en una página larga de presentación: una declaración, una cita, el cierre de una sección.

No lo uses en lo primero que se ve al abrir, donde no hay nada que desplazar, ni en texto de un producto.

## Cómo funciona

Aquí nada corre con el tiempo. Cuántas palabras están plenas depende de cuánto ha subido el pasaje por la ventana: empieza cuando asoma por abajo y termina cuando llega al medio. Al volver atrás, se atenúan de nuevo.

Es la receta «avanzar» del movimiento de marca: sigue al desplazamiento, no al reloj.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Tenue | Qué tan apagada está una palabra antes de su turno. |
| Palabras a la vez | Cuántas palabras están a medio camino al mismo tiempo. Más, el paso es más suave. |

## Accesibilidad

El texto verdadero está siempre en la página, entero y fuera de la vista, para un lector de pantalla. Con menos movimiento, el pasaje está pleno desde el principio.

Una palabra tenue no cumple el contraste por sí sola. Por eso el pasaje tiene que poder leerse entero con solo avanzar un poco: mantenlo corto, y no pongas nada importante únicamente ahí.

## Código

```js
var pasaje = AlmaEfectos.monta('desvelar', parrafo, { tenue: 0.3 });
pasaje.pasa();   // lo recorre solo una vez, para probarlo
```
