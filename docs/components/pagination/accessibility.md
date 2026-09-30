---
component: Pagination
tab: Accesibilidad
summary: Qué resuelve ALMA en la paginación.
---


## Qué ofrece ALMA

### Comportamiento
- Es un `nav` nombrado «Paginación».
- El rango es una región `aria-live="polite"`: al cambiar de página, el lector dice «21–40 de 1.284 movimientos».
- Anterior y siguiente se llaman «Página anterior» y «Página siguiente», y se desactivan en los extremos.
- El selector de tamaño se llama «Elementos por página».

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre el selector y los botones. |
| Enter o Espacio | Activa el botón con foco. |

## Recomendaciones de diseño

- Usa un `itemLabel` que diga qué se cuenta.

## Consideraciones de desarrollo

- Al cambiar de página, no muevas el foco: la persona puede seguir pasando páginas. Si la tabla está arriba, lleva el scroll a su inicio.
- Si hay dos paginaciones en la página, dale a cada una un `label` distinto.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
