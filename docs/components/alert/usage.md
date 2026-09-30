---
component: Alert
tab: Uso
summary: Un diálogo que interrumpe para comunicar algo importante y pedir una decisión.
---


## Resumen

`Alert` interrumpe para decir algo esencial y pedir una decisión con dos o tres respuestas. Sigue las alertas de Apple. Úsala poco: cada alerta detiene lo que la persona estaba haciendo.

### Cuándo usarla
- Antes de una acción destructiva poco común que **no** se puede deshacer.
- Cuando algo falló y hay una forma útil de seguir («Reintentar»).
- Cuando falta un dato imprescindible para continuar, como una contraseña.

### Cuándo no usarla
- **Para informar sin pedir nada:** `InlineNotification` o `toast`.
- **Para acciones comunes que se pueden deshacer**, aunque borren algo: deja deshacer.
- **Al abrir la app.**
- **Para ofrecer opciones después de una acción elegida:** `Sheet` o `PullDownButton`.
- **Para una tarea con varios campos:** `Modal`.

## Anatomía

1. **Velo** (`overlay-01`).
2. **Título:** qué pasó y por qué.
3. **Mensaje** (opcional).
4. **Campo** (opcional): solo si hace falta un dato.
5. **Botones:** hasta 3.

![Anatomía de Alert: una alerta con dos botones y otra con tres botones apilados. Numerados: velo (1), título (2), mensaje (3), campo (4) y botones (5).](assets/Componentes/alert-anatomia.png)

## Botones

| Rol | Aspecto | Uso |
|---|---|---|
| `default` | `Button` filled | La opción más probable. Recibe el foco al abrir. |
| `cancel` | `Button` gray | Siempre se llama «Cancelar». Nunca es la opción por defecto. |
| `destructive` | `Button` tinted rojo | Solo para una acción destructiva que la persona **no** eligió deliberadamente. |
| `normal` | `Button` tinted | Otra opción. |

- **Dos botones:** en fila, del mismo ancho. «Cancelar» a la izquierda y la opción por defecto a la derecha.
- **Tres botones:** apilados, a todo el ancho. La opción por defecto arriba y «Cancelar» abajo.
- Si hay una acción destructiva, incluye siempre «Cancelar».
- Si quieres que la persona lea antes de actuar, no marques ninguna opción por defecto: el foco va a «Cancelar».

![El orden de los botones de Alert: en fila, «Cancelar» a la izquierda y la acción a la derecha; apilados, la acción por defecto arriba y «Cancelar» abajo.](assets/Componentes/alert-orden.png)

## Contenido

- **Título:** concreto, de hasta dos líneas. Nunca «Error» ni un código. Oración completa con puntuación, o fragmento sin punto final.
- **Mensaje:** solo si aporta, en oraciones completas. No expliques los botones.
- **Botones:** una o dos palabras que empiecen con verbo y digan el resultado («Eliminar», «Reintentar»). «Aceptar» solo en alertas puramente informativas; nunca «Sí» ni «No».
- Tono directo, neutral y cercano. No culpes a la persona.

| Mejor | Evitar |
|---|---|
| «No se pudo pagar con la tarjeta terminada en 4821» | «Error 402» |
| «¿Eliminar la tarjeta terminada en 4821?» + «Eliminar» | «¿Está seguro?» + «Sí» |

## Comportamiento

- Esc equivale a «Cancelar»; sin «Cancelar», llama a `onDismiss`.
- El foco queda atrapado en la alerta y vuelve a donde estaba al cerrar.
- Un clic en el velo no la cierra.
- Evita alertas que necesiten scroll: título corto, mensaje breve.

## Relacionados

`Modal` · `InlineNotification` · `toast` · `Sheet`.

## Referencias

- Apple, Human Interface Guidelines: Alerts.
- IBM, Carbon Design System: Modal (danger).
