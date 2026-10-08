---
pattern: Deshacer
summary: Dejar que una persona se arrepienta, en vez de preguntarle antes si está segura.
---

## Cuándo

Siempre que una acción se pueda revertir. Dejar deshacer es mejor que pedir confirmación: no interrumpe a quien sabe lo que hace y salva a quien se equivocó.

La confirmación queda para lo que de verdad no tiene vuelta.

## Deshacer o confirmar

| La acción | Qué hacer |
|---|---|
| Se puede revertir: archivar, mover, quitar de una lista, marcar como leído. | Se hace al tiro y se ofrece «Deshacer». |
| No se puede revertir: eliminar una cuenta, enviar un pago, borrar para siempre. | Se confirma antes (ver **Diálogos**). |
| Se puede revertir, pero toca a muchos elementos. | Se hace, se ofrece «Deshacer» y se dice cuántos fueron: «12 viajes archivados». |

Si algo no se puede revertir hoy, considera hacerlo reversible: una papelera en vez de un borrado.

## Cómo se ofrece

Un aviso en `ToastRegion` con lo que pasó y una sola acción:

1. **Qué pasó**, en pasado: «Viaje archivado».
2. **«Deshacer»**, como acción del aviso.

El aviso no tapa lo que la persona estaba haciendo, y deshacer devuelve todo exactamente a como estaba: mismo lugar, mismo orden, misma selección.

> **Imagen pendiente:** una lista de viajes donde se acaba de archivar uno, con el aviso «Viaje archivado» y su acción «Deshacer», en tema oscuro y claro.

## Cuánto dura

- Un aviso con «Deshacer» se queda más que uno informativo: dale tiempo de sobra para leer y decidir, o déjalo fijo (`duration: 0`) hasta que se cierre.
- El tiempo se detiene mientras el puntero o el foco están sobre el aviso.
- Cuando el aviso se va, la acción sigue teniendo vuelta por otro camino: una sección «Archivados», una papelera.

## En un editor

Donde se escribe o se dibuja, deshacer es una historia de pasos:

- **Deshacer** y **Rehacer** están a la vista, en la `Toolbar`, y responden a las teclas de siempre.
- Cada paso es una acción completa de la persona, no cada letra.
- Los botones se desactivan cuando no hay nada que deshacer o rehacer.
- El nombre dice qué se va a deshacer cuando no es obvio: «Deshacer mover».

## Accesibilidad

- El aviso se anuncia sin quitar el foco de donde estaba.
- «Deshacer» se alcanza con teclado, y hay otra manera de revertir cuando el aviso ya se fue.
- Al deshacer, se anuncia el resultado: «Viaje restaurado».

## No hagas

- Preguntar «¿Estás seguro?» para algo que se deshace con un toque.
- Un «Deshacer» que desaparece antes de que alcance a leerse.
- Deshacer a medias: devolver el elemento, pero no a su lugar.
- Ofrecer «Deshacer» para algo que ya no se puede revertir.

## Relacionados

`ToastRegion` · `Toolbar` · Notificaciones · Diálogos · Arrastrar y soltar.
