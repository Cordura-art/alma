---
efecto: La colección
familia: Efectos
summary: Lo que se mueve detrás, entre y debajo de las cosas, escrito por nosotros y guardado en un solo lugar.
---

## Cuatro familias

| Familia | Qué es | Dónde va |
|---|---|---|
| Fondo | Algo vivo detrás del contenido. | Una portada, una sección de apertura, una pantalla de espera larga. |
| Transición | El paso de una cosa a otra. | Entre dos vistas, entre dos estados de una misma pieza. |
| Reacción | La respuesta a quien toca. | Bajo el puntero, al pulsar, al desplazar. |
| Texto | Una línea o una cifra que se mueve al llegar. | Un titular, un dato destacado. |

## Lo que todo efecto cumple

1. **Sus colores son tokens.** Los lee del lugar donde está puesto: en una entidad, el efecto es de la entidad, sin tocarlo.
2. **Usa el reloj de ALMA.** Pide sus cuadros al mismo reloj que todo lo demás, y sus tiempos salen de los tokens de movimiento.
3. **Solo trabaja cuando se ve.** Fuera de la vista o con la página oculta, se detiene.
4. **Respeta a quien pide menos movimiento.** Un fondo queda como una imagen quieta, nunca en blanco. Una reacción no se mueve, y lo que hay debajo funciona igual. Un texto está entero desde el principio.
5. **Es decoración.** No lleva información, y quien no ve la página no lo encuentra. Un texto que se mueve guarda aparte su texto verdadero, que es el que se lee en voz alta.
6. **No depende de nadie.** Está escrito aquí, sin librerías.

## El texto encima

Un fondo vivo cambia de claro a oscuro bajo las letras. Por eso el texto nunca va directo sobre él: va sobre un recuadro con el fondo de la página, como en una portada.

## Cómo crece

Cada efecto nuevo parte de mirar cómo lo resuelven otros, entender la idea y escribirla de nuevo con las reglas de arriba. Entra a la colección cuando tiene su página aquí, con sus ajustes a la vista.

## La presencia de una IA

El Velo y el Halo juntos son la presencia de una IA. `AlmaEfectos.presencia(elemento, 'reposo')` monta los dos y devuelve `estado(nombre)` para cambiar el Halo: `reposo`, `escuchando`, `pensando`, `respondiendo` y `apagada`. Cuándo usarla está en la guía **Interfaces de IA › Presencia**.
