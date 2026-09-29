# ProgressBar

Barra que muestra el avance de una tarea larga: determinada (con porcentaje) o indeterminada (en movimiento). Sigue la guía *Progress indicators* de Apple.

## Reglas de Apple
- **Usa la determinada siempre que puedas**: ayuda a decidir si esperar, hacer otra cosa o volver después.
- Sé preciso y parejo: no muestres 90 % en cinco segundos y el 10 % restante en cinco minutos.
- La barra nunca se queda quieta. Si el proceso se detiene, dilo y explica qué hacer.
- Si una tarea indeterminada llega a conocer su duración, pásala a determinada.
- No cambies entre barra y spinner (`ActivityIndicator`): son formas distintas.
- Descripción precisa en `description` («Subiendo 3 de 12 fotos»), no «Cargando» ni «Autenticando».

## Qué aporta quien lo usa
- `value` entre 0 y 1; sin `value` es indeterminada.
- `label`, `description` y `status` (`error`, `success`) al terminar.
- Para acciones cortas dentro de un botón, usa `Button` con `loading`. Para una espera sin avance medible, `ActivityIndicator`.

## Aspecto
Pista `ui-03`, relleno `control-on` y animación con las curvas productivas de IBM. Con movimiento reducido, la indeterminada queda fija y semitransparente.
