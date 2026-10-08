---
component: SourceList
tab: Accesibilidad
summary: Lo que SourceList resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Es una lista ordenada con nombre**: un lector dice «Fuentes, lista de 2 elementos».
- **Cada enlace se entiende solo**: «Fuente 1: Tu pasaje del 31 de marzo», no «1».
- **El número en el texto también**: se anuncia «Fuente 1», y lleva a su fuente.
- **Al desplegar**, el foco pasa a la primera fuente que apareció.
- **La fuente a la que se llegó se marca**, con color y sin depender solo de él: es además donde queda la vista.

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Recorre los números del texto, las fuentes y «Ver las 8». |
| Enter | Sigue el enlace, o despliega la lista. |

## Recomendaciones de diseño

- El título de la fuente tiene que decir qué es sin ver el resto. «Documento» o «Ver» no sirven.
- Si una afirmación no tiene fuente, dilo en el texto. La falta de número no se nota con un lector.

## Consideraciones de desarrollo

- Usa el mismo `id` en la lista y en sus `SourceRef`. Con dos listas en la página, cada una el suyo.
- No pongas los números del texto como `sup` sueltos: sin enlace no llevan a nada y se leen como un número perdido.

Pendiente: VoiceOver y NVDA.
