# ToastRegion y toast

Notificaciones flotantes y pasajeras, arriba a la derecha y sin bloquear la pantalla (el *toast* de IBM Carbon).

## Uso
- Monta `ToastRegion` una sola vez, cerca de la raíz de la app.
- Muestra un aviso con `AlmaDS.toast({ status, title, message })`; `toast.dismiss(id)` lo cierra.

## Reglas
- **Éxito e información se cierran solos a los 5 segundos** (Carbon). La cuenta se pausa mientras el cursor o el foco están encima (WCAG 2.2.1).
- **Errores y advertencias no se cierran solos.**
- Siempre tienen botón de cerrar.
- Como pueden desaparecer, lo que informan debe poder consultarse en otra parte, por ejemplo en la lista de viajes.
- Un toast no lleva información que haya que leer sí o sí antes de seguir: para eso, `InlineNotification` o `Alert`.
- Nunca se representan con `Skeleton`.

Aparecen con `duration-moderate-02` + `easing-entrance-expressive`, y la región los anuncia con `aria-live`.
