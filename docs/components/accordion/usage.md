---
component: Accordion
tab: Uso
summary: Secciones que se abren y se cierran para mostrar contenido largo por partes.
---


## Resumen

`Accordion` muestra una lista de títulos; cada uno abre su contenido. Sirve para mostrar contenido largo por partes sin llenar la pantalla. Es el *accordion* de Carbon y el *disclosure group* de Apple.

### Cuándo usarlo
- Preguntas frecuentes.
- Detalles secundarios de algo: el desglose de un pedido, las condiciones de un pasaje.

### Cuándo no usarlo
- **Lo que casi todos necesitan ver:** muéstralo abierto.
- **Los errores de un formulario:** nunca escondidos.
- **Paneles del mismo nivel que se comparan:** `Tabs`.
- **Navegación:** `Sidebar`.

## Anatomía

1. **Título**: un botón a todo el ancho.
2. **Flecha** (`chevron`), que gira al abrir.
3. **Contenido.**
4. **Separadores** entre secciones.

![Accordion de preguntas frecuentes con la sección «¿Puedo cambiar la fecha de mi pasaje?» abierta.](assets/Componentes/accordion-preguntas.png)

## Contenido

- Títulos cortos: una pregunta o un tema («¿Cuánto equipaje puedo llevar?»).
- El contenido, breve; si crece mucho, es otra página.

## Comportamiento

- Por defecto se pueden abrir varias a la vez (`allowMultiple`, como en Carbon); con `allowMultiple: false`, abrir una cierra la otra.
- `defaultOpen` abre las que conviene ver primero.
- Una sección desactivada se ve pero no se abre.

## Relacionados

`Tabs` · `List` · `ProductCard`.

## Referencias

- IBM, Carbon Design System: Accordion.
- Apple, Human Interface Guidelines: Disclosure controls.
