---
component: Breadcrumb
tab: Accesibilidad
summary: Qué resuelve ALMA en la ruta de navegación.
---


## Qué ofrece ALMA

### Comportamiento
- Es un `nav` nombrado «Ruta de navegación», con una lista ordenada de niveles.
- La página actual es texto con `aria-current="page"`, no un enlace.
- El separador `/` está oculto para los lectores de pantalla.
- El menú «…» dice cuántos niveles guarda: «Mostrar 2 niveles más».
- Cada enlace tiene un área de toque de 44 px de alto.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los enlaces y el menú «…». |
| Enter | Abre el enlace. |
| Enter, Espacio o ↓ (en «…») | Abre el menú; ver `PullDownButton`. |

## Recomendaciones de diseño

- Si hay dos rutas en la página, dale a cada una un `label` distinto.

## Consideraciones de desarrollo

- Pon la ruta antes del título de la página en el orden del documento, así el lector la encuentra en el camino.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
