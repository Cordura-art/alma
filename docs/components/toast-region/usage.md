---
component: ToastRegion
tab: Uso
summary: Avisos flotantes y pasajeros que no bloquean la pantalla.
---


## Resumen

Un *toast* cuenta el resultado de una acción sin interrumpir: aparece arriba a la derecha, no bloquea nada y, si fue un éxito, se va solo. `ToastRegion` es el lugar donde aparecen y `toast()` los muestra.

### Cuándo usarlo
- Confirmar una acción que la persona acaba de hacer («Pasaje guardado en tu billetera»).
- Avisar un evento del sistema que no necesita respuesta inmediata.

### Cuándo no usarlo
- **Información que hay que leer antes de seguir:** `InlineNotification` o `Alert`.
- **El error de un campo:** el texto de error del campo.
- **Algo que solo existe en el toast:** como puede desaparecer, lo que informa debe poder verse en otra parte.
- **Un estado de carga:** un toast nunca se representa con `Skeleton`; muéstralo cuando haya resultado.

## Anatomía

Es una `InlineNotification` de tipo `toast`: ícono, título, mensaje, hora, acción y «Cerrar», sobre `ui-01` con sombra.

![Dos toasts apilados arriba a la derecha sobre la pantalla de Mis viajes: «Pago aprobado» y «Pasaje enviado a tu correo».](assets/Componentes/toast-region-pantalla.png)

## Duración

| Estado | Se cierra solo |
|---|---|
| `success`, `info` | Sí, a los 5 segundos. |
| `error`, `warning` | No: la persona los cierra. |

- La cuenta se pausa mientras el cursor o el foco están sobre el toast.
- `duration` cambia los 5 segundos; `duration: 0` lo deja fijo.
- Todos tienen «Cerrar».

## Posición

- Arriba a la derecha, 72 px bajo el borde superior (debajo de la barra de herramientas) y 16 px del borde derecho.
- Varios toasts se apilan hacia abajo, con 8 px entre ellos; el más nuevo queda abajo.
- Monta `ToastRegion` una sola vez, cerca de la raíz de la app.

## Contenido

- **Título:** el resultado, en pasado («Pasaje guardado»).
- **Mensaje:** opcional, una oración.
- **Acción:** opcional, una sola y reversible («Deshacer», «Ver pasaje»).

## Relacionados

`InlineNotification` · `Alert`.

## Referencias

- IBM, Carbon Design System: Notification (toast).
