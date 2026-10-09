---
component: EditMenu
tab: Uso
summary: Lo que se puede hacer con lo seleccionado, en una barra junto a la selección.
---


## Resumen

`EditMenu` aparece junto a un texto seleccionado y ofrece qué hacer con él: copiarlo, buscarlo, preguntarle a la IA. Es el *edit menu* de Apple.

![Un párrafo sobre un viaje con la frase «martes 31 de marzo a las 08:30» seleccionada. Justo encima de la selección, una barra corta con tres acciones: «Copiar», «Buscar» y «Preguntar a la IA», cada una con su ícono.](assets/Componentes/edit-menu-seleccion.png)

## Dónde aparece

- **Sobre la selección,** centrado en ella. Deja espacio arriba del texto para que quepa.
- **No tapa lo seleccionado:** la persona necesita ver qué eligió.
- **Aparece al terminar de seleccionar,** no mientras se arrastra.

## Cuándo usarlo

- En texto que la gente lee y quiere reutilizar: una respuesta, un documento.
- Para ofrecer la IA sobre una selección: «Preguntar a la IA», «Resumir».

## Cuándo no

- Sobre un ítem que ya tiene `ContextMenu`. Uno u otro, no los dos.
- Para acciones que no dependen de la selección.

## Reglas

- **Pocas acciones:** de dos a cinco, las más probables para ese texto.
- **Las de siempre, primero:** copiar, buscar.
- **Verbo solo:** «Copiar», «Buscar».
- **Nada vive solo aquí.** Aparece con un gesto que no todos hacen: las mismas acciones están en el menú Edición.
- **Se va solo** al quitar la selección, o con Esc.

## Relacionados

`ContextMenu` · `MenuBar` · `ChatMessage` · Menús · Interfaces de IA.

## Referencias

- Apple, Human Interface Guidelines: Edit menus.
