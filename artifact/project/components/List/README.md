# List

Una lista agrupada de filas para navegar, actuar o mostrar datos.


## Uso

### Resumen

`List` agrupa filas sobre un fondo redondeado, con separadores que empiezan donde empieza el texto. Es la lista agrupada de Apple y la *contained list* de Carbon.

#### Cuándo usarla
- Menús de ajustes y cuentas: cada fila lleva a una pantalla.
- Acciones sobre algo: cada fila hace una cosa.
- Resúmenes de datos: pares etiqueta y valor (un resumen de precios).

#### Cuándo no usarla
- **Para comparar varios elementos por los mismos atributos:** `Table`.
- **Para elementos con imagen grande:** `Card`.
- **Para elegir una opción:** `RadioGroup`.

### Tipos de fila

| Fila | Propiedad | Aspecto |
|---|---|---|
| De navegación | `href` | Enlace con la flecha `chevron--right`. |
| De acción | `onClick` | Botón, sin flecha (o con `chevron`). |
| Informativa | ninguna | Texto y valor a la derecha (`trailing`). |

### Anatomía

1. **Título del grupo** (opcional).
2. **Fila**: ícono, título, subtítulo, valor y flecha.
3. **Separador**, con sangría hasta el texto.
4. **Nota al pie** (opcional).

> **Imagen pendiente:** dos grupos: uno de navegación con íconos y un resumen de precios.

### Contenido

- **Título del grupo:** lo que tienen en común las filas («Cuenta»).
- **Título de la fila:** corto, con sustantivo.
- **Subtítulo:** un dato que ayuda a elegir («2 tarjetas»).
- **Valor:** el estado o el número («Activadas», «$7.990»).
- **Nota al pie:** una aclaración breve del grupo.

### Comportamiento

- Toda la fila es el área de toque.
- Una sola acción por fila. Si una fila necesita un interruptor, pon un `Switch` en ella.

### Relacionados

`Table` · `Switch` · `Card` · `Sheet`.

### Referencias

- Apple, Human Interface Guidelines: Lists and tables.
- IBM, Carbon Design System: Contained list.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Grupo | fondo | `list-bg` |
| Título del grupo | color del texto | `text-02` |
| Separador | borde (1 px) | `list-separator` |
| Fila:hover (navegación o acción) | fondo | `list-row-bg-hover` |
| Título de la fila | color del texto | `text-01` |
| Subtítulo y valor | color del texto | `text-02` |
| Ícono y flecha | relleno | `icon-02` |
| Nota al pie | color del texto | `text-02` |
| Fila:focus | contorno | `focus` (2 px, por dentro) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título del grupo | 12 / 0,75 | Medium / 500 | — |
| Título de la fila | 14 / 0,875 | Regular / 400 | 1,4 |
| Subtítulo | 12 / 0,75 | Regular / 400 | — |
| Nota al pie | 12 / 0,75 | Regular / 400 | 1,5 |

El valor usa cifras tabulares.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Lista | ancho máximo | 560 px (35 rem) |
| Grupo | radio | `radius-panel` |
| Título del grupo | margen | 16 px a la izquierda, 8 px abajo |
| Fila | relleno | 8 px arriba y abajo, 16 px a los lados |
| Elementos de la fila | separación | 16 px |
| Separador | sangría | 16 px, o 56 px con ícono |
| Flecha | tamaño | 20 px |
| Nota al pie | margen | 8 px arriba, 16 px a los lados |

> **Imagen pendiente:** anatomía acotada con ícono.

### Tamaño

| Densidad | Alto mínimo de la fila (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

### Movimiento

El fondo de una fila cambia en `duration-fast-01` con `easing-standard-productive`.

### Contraste

Textos a 4,5:1 sobre `list-bg` (7:1 en alto contraste); íconos a 3:1, en los cuatro temas.

## Código

### Uso

```js
const { List } = window.AlmaDS;
h(List, { header: 'Cuenta', items: [
  { icon: 'user', title: 'Datos personales', href: '#perfil' },
  { icon: 'wallet', title: 'Medios de pago', subtitle: '2 tarjetas', href: '#pagos' },
  { icon: 'notification', title: 'Notificaciones', trailing: 'Activadas', href: '#avisos' }] })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | `ListItem[]` | — | Las filas. |
| `header` | `string` | — | Título del grupo; nombra la lista. |
| `headingLevel` | `2–6` | `3` | Nivel del título en la página. |
| `footer` | `string` | — | Nota al pie. |
| `aria-label` | `string` | — | Nombre de la lista si no hay `header`. |
| `id` | `string` | automático | — |

`ListItem`: `{ id?, title, subtitle?, icon?, trailing?, href?, onClick?, chevron? }`.

### Resumen de precios

```js
h(List, { header: 'Resumen del viaje', footer: 'El precio incluye la tasa de embarque.', items: [
  { title: 'Pasaje', trailing: '$7.000' }, { title: 'Seguro de viaje', trailing: '$990' }, { title: 'Total', trailing: '$7.990' }] })
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Cada grupo es una `section` nombrada por su título, con una lista `ul`: el lector dice cuántas filas tiene.
- Las filas de navegación son enlaces; las de acción, botones; las informativas, texto.
- La flecha y los íconos son decorativos: el lector no los anuncia.
- Cada fila mide al menos 44 px de alto.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre las filas de navegación y de acción. |
| Enter | Abre el enlace o activa el botón. |
| Espacio | Activa una fila de acción. |

### Recomendaciones de diseño

- Sin título visible, pasa `aria-label`.
- No dependas del ícono para decir qué hace una fila: el título debe bastar.

### Consideraciones de desarrollo

- No anides botones o enlaces dentro de una fila de navegación o de acción.
- Un `Switch` va en una fila informativa, no en una de navegación.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
