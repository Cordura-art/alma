---
component: Toolbar
tab: Accesibilidad
summary: Qué resuelve ALMA en la barra de herramientas.
---


## Qué ofrece ALMA

### Comportamiento
- Es un `header`; el título es un `h1`.
- Volver se llama «Volver» (o `backLabel`).
- Las acciones de ícono usan su `label` como nombre.
- Más se llama «Más acciones» y abre un menú (ver `PullDownButton`).

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre Volver, el buscador, las acciones y Más. |
| Enter o Espacio | Activa el botón con foco. |

## Recomendaciones de diseño

- El título de la barra es el `h1` de la vista: no pongas otro `h1` en el contenido. Si la página ya tiene su título, deja `title` vacío.
- Dale a cada acción de ícono un `label` que diga qué hace.

## Consideraciones de desarrollo

- Al navegar, lleva el foco al título de la vista nueva.
- Usa una sola `Toolbar` por vista.

## Verificación

axe sin problemas en los cuatro temas; probada también en el teléfono a 375 px. Pendiente: VoiceOver y NVDA.
