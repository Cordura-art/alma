---
component: List
tab: Uso
summary: Una lista agrupada de filas para navegar, actuar o mostrar datos.
---


## Resumen

`List` agrupa filas sobre un fondo redondeado, con separadores que empiezan donde empieza el texto. Es la lista agrupada de Apple y la *contained list* de Carbon.

### Cuándo usarla
- Menús de ajustes y cuentas: cada fila lleva a una pantalla.
- Acciones sobre algo: cada fila hace una cosa.
- Resúmenes de datos: pares etiqueta y valor (un resumen de precios).

### Cuándo no usarla
- **Para comparar varios elementos por los mismos atributos:** `Table`.
- **Para elementos con imagen grande:** `Card`.
- **Para elegir una opción:** `RadioGroup`.

## Tipos de fila

| Fila | Propiedad | Aspecto |
|---|---|---|
| De navegación | `href` | Enlace con la flecha `chevron--right`. |
| De acción | `onClick` | Botón, sin flecha (o con `chevron`). |
| Informativa | ninguna | Texto y valor a la derecha (`trailing`). |

## Anatomía

1. **Título del grupo** (opcional).
2. **Fila**: ícono, título, subtítulo, valor y flecha.
3. **Separador**, con sangría hasta el texto.
4. **Nota al pie** (opcional).

> **Imagen pendiente:** dos grupos: uno de navegación con íconos y un resumen de precios.

## Contenido

- **Título del grupo:** lo que tienen en común las filas («Cuenta»).
- **Título de la fila:** corto, con sustantivo.
- **Subtítulo:** un dato que ayuda a elegir («2 tarjetas»).
- **Valor:** el estado o el número («Activadas», «$7.990»).
- **Nota al pie:** una aclaración breve del grupo.

## Comportamiento

- Toda la fila es el área de toque.
- Una sola acción por fila. Si una fila necesita un interruptor, pon un `Switch` en ella.

## Relacionados

`Table` · `Switch` · `Card` · `Sheet`.

## Referencias

- Apple, Human Interface Guidelines: Lists and tables.
- IBM, Carbon Design System: Contained list.
