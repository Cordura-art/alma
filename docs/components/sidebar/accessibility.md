---
component: Sidebar
tab: Accesibilidad
summary: Qué resuelve ALMA en la barra lateral.
---


## Qué ofrece ALMA

### Comportamiento
- Es un `nav` nombrado por `label`.
- Cada destino es un enlace; el actual lleva `aria-current="page"`.
- Cada título de grupo es un botón con `aria-expanded`.
- El botón mostrar/ocultar dice lo que hará: «Ocultar barra lateral» o «Mostrar barra lateral».
- Con contador, el destino se anuncia con él: «Viajes, 3 nuevos».
- El destino actual se distingue por el fondo y el ícono relleno, no solo por el color del texto.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre el botón, los títulos de grupo y los destinos. |
| Enter | Abre el destino. |
| Enter o Espacio (en un título) | Pliega o despliega el grupo. |

## Recomendaciones de diseño

- Si hay otro `nav` en la página, dale a cada uno un `label` distinto.
- Cada destino mide al menos 44 px de alto.

## Consideraciones de desarrollo

- Al navegar, mueve el foco al título de la página nueva, no lo dejes en la barra.
- En el teléfono, si la muestras, ocúltala al elegir un destino.

## Verificación

axe sin problemas en los cuatro temas; teclado probado en el sitio de documentación, que usa esta barra. Pendiente: VoiceOver y NVDA.
