---
component: PopUpButton
tab: Uso
summary: Un botón que abre una lista corta de opciones excluyentes y muestra la elegida.
---

## Resumen

`PopUpButton` presenta una elección entre opciones mutuamente excluyentes sin ocupar espacio: el botón muestra la opción actual y, al abrirlo, aparece la lista. Es el «menú emergente» de Apple y el «dropdown» de Carbon.

### Cuándo usarlo
- Elegir una opción que afecta el contenido o la vista: ordenar, moneda, idioma, cantidad por página.
- Cuando hay poco espacio o las opciones no necesitan verse todas a la vez.
- Hasta unas 7 opciones.

### Cuándo no usarlo
- **Acciones** («Compartir», «Eliminar»): `PullDownButton`.
- **Varias opciones a la vez:** `Combobox` múltiple o `Checkbox`.
- **Muchas opciones** que la persona buscaría por nombre: `Combobox`.
- **2 a 5 opciones que conviene ver juntas:** `RadioGroup` o `SegmentedControl`.

## Anatomía

1. **Etiqueta** (opcional, recomendada): anticipa las opciones sin abrir el menú.
2. **Botón:** esquinas `radius-button`, con la opción actual y el ícono `chevron--sort`.
3. **Menú:** panel flotante con la lista.
4. **Opción elegida:** marcada con un check.
5. **Nota al pie** (opcional): explica algo de las opciones.

![Anatomía de PopUpButton con el menú abierto. Numerados: etiqueta (1), botón (2), menú (3), opción elegida (4) y nota al pie (5).](assets/Componentes/pop-up-button-anatomia.png)

## Contenido

- **Etiqueta:** el nombre de lo que se elige, corto («Ordenar por», «Moneda»).
- **Opciones:** una o dos palabras, en un orden con sentido (lógico, por frecuencia o alfabético), sin repetir la etiqueta en cada una.
- **Opción por defecto:** la que más gente quiere; nunca una vacía como «Seleccionar…».
- **Opción que pide más datos:** agrégala al final con puntos suspensivos («Personalizado…») y explica en la nota al pie.

## Comportamiento

| Estado | Qué cambia |
|---|---|
| Reposo | Borde `popup-border`. |
| Puntero encima | Borde `popup-border-hover`. |
| Abierto | Borde `popup-border-open`; el menú aparece debajo. |
| Foco | Anillo de foco en el botón; dentro del menú, en la opción. |
| Desactivado | Al 45 % de opacidad; no se abre. |

- Elegir cierra el menú, muestra la opción en el botón y devuelve el foco al botón.
- Un clic fuera o Esc cierran sin cambiar nada.
- Las opciones desactivadas se ven pero no se pueden elegir ni recorrer.

![Los estados de PopUpButton en tema oscuro y claro: en reposo, abierto con la opción elegida marcada, con el puntero sobre una opción, y desactivado.](assets/Componentes/pop-up-button-estados.png)

## Relacionados

`PullDownButton` · `Combobox` · `SegmentedControl` · `RadioGroup`.

## Referencias

- Apple, Human Interface Guidelines: Pop-up buttons.
- IBM, Carbon Design System: Dropdown.
