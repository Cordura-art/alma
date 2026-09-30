---
component: Link
tab: Accesibilidad
summary: Qué resuelve ALMA en el enlace.
---


## Qué ofrece ALMA

### Comportamiento
- Es un `<a>` real.
- Los externos avisan al lector «(se abre en otra pestaña)» y llevan `rel="noopener noreferrer"`.
- La página actual lleva `aria-current="page"`.
- Dentro de un texto van subrayados, así no dependen del color.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega al enlace. |
| Enter | Lo abre. |

## Recomendaciones de diseño

- Texto que se entienda fuera de contexto: el lector puede listar todos los enlaces de la página.
- No uses el mismo texto para dos destinos distintos.

## Consideraciones de desarrollo

- No uses un enlace sin `href` para una acción: usa `Button`.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
