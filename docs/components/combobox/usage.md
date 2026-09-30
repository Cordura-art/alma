---
component: Combobox
tab: Uso
summary: Un campo para elegir una o varias opciones de una lista larga escribiendo para filtrar.
---

## Resumen

`Combobox` combina un campo de texto con una lista. Al escribir, la lista se filtra; con las flechas se recorre y con Enter se elige. En modo múltiple, cada elección queda como una etiqueta dentro del campo.

### Cuándo usarlo
- Listas largas (más de unas 7 opciones) que la persona conoce por su nombre: ciudades, terminales, países, bancos.
- Para elegir varias opciones de una lista larga (`multiple`).

### Cuándo no usarlo
- 2 a 5 opciones visibles: `RadioGroup` o `SegmentedControl`.
- Hasta unas 7 opciones sin necesidad de escribir: `PopUpButton`.
- Texto libre sin lista: `TextInput`.
- Buscar contenido: `SearchField`.

## Variantes

| Variante | Cuándo |
|---|---|
| Simple | Una opción: el campo muestra la elegida. |
| Múltiple (`multiple`) | Varias opciones: se muestran como `Tag` dentro del campo. |

## Anatomía

1. **Campo:** la píldora de `TextInput`, con su etiqueta flotante.
2. **Etiquetas** (múltiple): una por opción elegida, con su botón para quitar.
3. **Texto de búsqueda.**
4. **Botón de la lista:** chevron para abrir o cerrar.
5. **Lista:** panel flotante con las opciones que coinciden; en múltiple, cada una con casilla.
6. **Sin resultados:** mensaje cuando nada coincide.
7. **Ayuda** o error bajo el campo.

> **Imagen pendiente:** anatomía numerada del modo simple con la lista abierta y del modo múltiple con tres etiquetas.

## Tamaño

- Alto del campo: 56 px (40 px compacto); en múltiple crece si las etiquetas ocupan más de una línea.
- Ancho por defecto 20 rem. La lista ocupa el ancho del campo y muestra hasta 16 rem de alto; más opciones se desplazan.

## Contenido

- **Etiqueta:** lo que se elige («Destino», «Paradas de interés»).
- **Opciones:** nombres que la persona reconoce, en el orden en que los buscaría (alfabético para lugares, por frecuencia para lo reciente).
- **Sin resultados:** di qué se buscó y qué probar: «Sin resultados para «Valpo». Prueba con el nombre completo.»
- **Ayuda:** cómo encontrar lo que se busca («Escribe al menos 2 letras»).

## Comportamiento

### Filtrado
- Coincide en cualquier parte del nombre, sin importar tildes ni mayúsculas («vina» encuentra «Viña del Mar»).
- En simple, si la persona sale sin elegir, el campo vuelve a mostrar la opción elegida antes.

### Selección
- Simple: elegir cierra la lista y muestra la opción en el campo.
- Múltiple: elegir marca la casilla, agrega la etiqueta y deja la lista abierta para seguir. Quitar: el ✕ de la etiqueta o Retroceso con el campo vacío.

### Estados

| Estado | Qué cambia |
|---|---|
| Reposo, foco, error, desactivado | Como `TextInput`. |
| Lista abierta | Panel flotante bajo el campo; chevron hacia arriba. |
| Opción activa | Fondo y borde de foco, sin mover el foco del campo. |
| Sin resultados | Mensaje en lugar de la lista. |

> **Imagen pendiente:** los estados de la lista (abierta, filtrada, opción activa, sin resultados) en tema oscuro y claro.

## Relacionados

`PopUpButton` · `RadioGroup` · `SearchField` · `Tag` · `TextInput`.

## Referencias

- WAI-ARIA Authoring Practices: Combobox (lista con autocompletado).
- Apple, Human Interface Guidelines: Combo boxes.
- IBM, Carbon Design System: Dropdown y Combo box.
