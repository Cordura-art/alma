---
component: Snippet
tab: Accesibilidad
summary: Lo que Snippet resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Es una sección con nombre:** su título.
- **Lo que el asistente dice se lee primero**, aunque no esté a la vista: quien no ve el fragmento recibe lo mismo en palabras.
- **Los botones van en el orden de la vista:** cancelar antes que la acción.
- **El contraste está asegurado** para los tres niveles de texto: es de vidrio grueso.
- **La marca de IA se lee como «Generado por IA».**

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Recorre la marca, el contenido si se desplaza, y los botones. |
| Enter, Espacio | Activa el botón. |

## Recomendaciones de diseño

- Escribe `dialogue` para que se entienda solo: tiene que decir lo mismo que los datos a la vista, cifras incluidas.
- En una confirmación, el botón principal nombra la acción y sus datos están arriba: nadie debería confirmar sin saber qué.
- No lo cierres solo. Una confirmación espera lo que haga falta.

## Consideraciones de desarrollo

- Cuando aparece una confirmación, lleva el foco a ella si la persona la estaba esperando; si llega sola, anúnciala y deja el foco donde está.
- No es modal: no atrapa el foco. Si la decisión tiene que detener todo, usa `ActionSheet` o `Alert`.
- Pasa `scrolls` si el contenido puede pasar de 400 px.

Pendiente: VoiceOver y NVDA.
