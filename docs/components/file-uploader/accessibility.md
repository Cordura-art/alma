---
component: FileUploader
tab: Accesibilidad
summary: Qué resuelve ALMA en el cargador de archivos.
---


## Qué ofrece ALMA

- El botón y la zona son botones reales: se activan con Enter o Espacio, no solo arrastrando.
- La descripción (formatos y tamaño) queda unida al botón o a la zona con `aria-describedby`.
- La lista se nombra con el título.
- Cada archivo dice su estado: «Subiendo …», «Subido» o su error.
- Quitar se llama «Quitar» más el nombre del archivo.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega al botón o a la zona, y luego a cada Quitar. |
| Enter o Espacio | Abre el selector de archivos, o quita. |

## Recomendaciones de diseño

- Arrastrar nunca es la única forma: la zona también se puede activar.

## Consideraciones de desarrollo

- Al quitar un archivo con el teclado, lleva el foco al siguiente Quitar, o al botón si no quedan.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
