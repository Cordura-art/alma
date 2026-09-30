---
element: Temas
order: 6
tab: Resumen
summary: Cuatro temas: oscuro por defecto, claro y sus versiones de alto contraste.
---

## Los cuatro temas

| Tema | Id | Para |
|---|---|---|
| **Oscuro** | `dark` | Por defecto. Productos de Cordura y piezas de marca. |
| **Claro** | `light` | Documentos e interfaces de trabajo. Son los valores del theme de origen en Figma. |
| **Oscuro · alto contraste** | `dark-hc` | Quien pide más contraste en su sistema. |
| **Claro · alto contraste** | `light-hc` | Ídem, en claro. |

![La misma tarjeta de viaje en los cuatro temas de ALMA: oscuro, claro, oscuro de alto contraste y claro de alto contraste.](assets/Temas/tarjeta.png)

## Qué cambia entre temas

Solo los valores de los tokens semánticos y de componente. Los nombres, las medidas, la tipografía y el comportamiento son los mismos: una interfaz hecha con tokens funciona en los cuatro sin cambiar nada.

## Alto contraste

- Texto a 7:1 (WCAG AAA); texto grande a 4,5:1.
- Bordes, foco e íconos a 3:1 o más.
- Las superficies y los controles se separan con bordes, no solo con tono.
- Algunos tokens de componente apuntan a otro color solo en alto contraste; así el tema, y no el CSS, resuelve cada caso.

## Elegir el tema

- Por defecto, ALMA sigue al sistema: Oscuro o Claro según la preferencia de la persona, y alto contraste si lo pidió.
- Una zona puede tener su propio tema: el atributo `data-theme` aplica a todo lo que contiene.
- Si la interfaz ofrece elegir, muestra los cuatro con su nombre y recuerda la elección.
