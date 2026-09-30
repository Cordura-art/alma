---
component: Sheet
tab: Accesibilidad
summary: Qué resuelve ALMA en la hoja.
---


## Qué ofrece ALMA

Todo lo de `Modal`:
- `role="dialog"` con `aria-modal="true"`, nombrada por su título.
- Foco atrapado, Esc cierra y el foco vuelve al botón que la abrió.
- La página de fondo no hace scroll.
- La barra de agarre es decorativa y los lectores de pantalla no la anuncian.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab / Mayús+Tab | Recorre los controles de la hoja, en círculo. |
| Esc | Cierra. |

## Recomendaciones de diseño

- No dependas del gesto de arrastrar para cerrar: ALMA no lo tiene, y quien usa teclado o un lector no lo puede hacer. Deja siempre visible «Cerrar».
- Las opciones dentro de la hoja deben medir al menos 44 px de alto.

## Consideraciones de desarrollo

- Declara `viewport-fit=cover` para que la hoja respete el área segura del teléfono.

## Verificación

axe sin problemas con la hoja abierta, en los cuatro temas. Pendiente: VoiceOver en iPhone y TalkBack.
