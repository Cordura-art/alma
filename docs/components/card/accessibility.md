---
component: Card
tab: Accesibilidad
summary: Qué resuelve ALMA en la tarjeta.
---


## Qué ofrece ALMA

### Comportamiento
- Es un `article` nombrado por su título.
- En una tarjeta enlace, el enlace está en el título: el lector anuncia solo el título, no toda la tarjeta. El área de clic se extiende a toda la tarjeta.
- El anillo de foco rodea toda la tarjeta.
- Las acciones son botones propios, por encima del enlace, y se alcanzan con Tab.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega al título (el enlace) y luego a cada acción. |
| Enter | Abre el enlace o activa el botón. |

## Recomendaciones de diseño

- El título debe bastar para saber a dónde lleva la tarjeta.
- Ajusta `headingLevel` a la jerarquía de la página.

## Consideraciones de desarrollo

- `alt` vacío en imágenes decorativas; si la imagen informa, descríbela.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
