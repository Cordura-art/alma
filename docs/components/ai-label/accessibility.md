---
component: AILabel
tab: Accesibilidad
summary: Lo que AILabel resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Un nombre que se entiende.** Un lector de pantalla no dice «IA»: dice «Generado por IA», o «Generado por IA y editado».
- **Dice si se abre.** Cuando tiene explicación es un botón, y su nombre termina en «Ver explicación». Anuncia si está abierta o cerrada.
- **La explicación es de `Popover`**: recibe el foco al abrirse, Escape la cierra y el foco vuelve a la marca.
- **No depende del color.** La marca es ícono y texto.
- **Área que responde** del alto de un control, aunque la marca se vea de 24 px.

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega a la marca, si se abre. |
| Enter, Espacio | Abre o cierra la explicación. |
| Esc | Cierra la explicación y vuelve a la marca. |

## Recomendaciones de diseño

- Pon la marca antes o junto al título de lo generado, no al final: quien recorre la página con un lector tiene que saberlo antes de leer el contenido.
- Una marca por contenedor. Diez marcas seguidas en una lista se leen diez veces: usa una en el encabezado de la lista.
- En una imagen generada, además de la marca, empieza el texto alternativo con «Imagen generada:».

## Consideraciones de desarrollo

- No reemplaces el texto por el ícono solo.
- Si lo generado cambia solo, por ejemplo porque se volvió a generar, actualiza `when`.

Pendiente: VoiceOver y NVDA.
