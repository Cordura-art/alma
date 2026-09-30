# Breadcrumb

La ruta desde el inicio hasta la página actual.


## Uso

### Resumen

`Breadcrumb` muestra dónde está la persona dentro de la jerarquía del sitio y le permite subir a cualquier nivel con un clic. Sigue el *breadcrumb* de Carbon.

#### Cuándo usarlo
- En sitios o apps con tres niveles o más.
- Cuando se llega a una página profunda desde un buscador o un enlace directo.

#### Cuándo no usarlo
- **En jerarquías de uno o dos niveles:** sobra.
- **En el teléfono:** prefiere «Volver» en la `Toolbar`.
- **Para pasos de un proceso:** `ProgressIndicator`.
- **Como historial de navegación:** muestra la jerarquía, no el camino que siguió la persona.

### Anatomía

1. **Enlaces** a los niveles superiores.
2. **Separador** `/`.
3. **Página actual**: texto, no enlace.
4. **Menú «…»** con los niveles plegados, si la ruta es larga.

> **Imagen pendiente:** una ruta de 3 niveles y otra de 6 con el menú «…» abierto.

### Rutas largas

Con más de `maxItems` niveles (4 por defecto), se ven el primero, el menú «…» y los últimos; los del medio quedan en el menú.

| Niveles | `maxItems` 4 | Se ve |
|---|---|---|
| 3 | — | Todos. |
| 6 | 4 | Inicio / … / Nivel 5 / Actual |

### Contenido

- Las etiquetas son los títulos de cada página, cortos.
- El primer nivel es el inicio del sitio o la sección («Inicio», «Cuenta»).
- La página actual va al final, igual a su título.

### Ubicación

Arriba de la página, sobre el título, alineado con él.

### Relacionados

`Toolbar` (con «Volver») · `Sidebar` · `Link`.

### Referencias

- IBM, Carbon Design System: Breadcrumb.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Enlace | color del texto | `link-text` |
| Separador | color | `breadcrumb-separator` |
| Página actual | color del texto | `breadcrumb-current` |
| Enlace:focus | contorno | `focus` (2 px, separado 2 px) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Enlace | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Página actual | 14 / 0,875 | `font-weight-emphasis` | — |

El subrayado aparece al pasar el cursor, 0,2 em bajo el texto.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Separador | relleno lateral | 8 px |
| Enlace | alto mínimo (área de toque) | 44 px |
| Enlace | radio del contorno de foco | `radius-nav` |
| Menú «…» | estilo | `PullDownButton` de ícono sin borde |

Si la ruta no cabe a lo ancho, pasa a la línea siguiente.

> **Imagen pendiente:** anatomía acotada.

### Contraste

Enlaces y página actual a 4,5:1; el separador a 3:1, en los cuatro temas.

## Código

### Uso

```js
const { Breadcrumb } = window.AlmaDS;
h(Breadcrumb, { items: [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Viajes', href: '#viajes' },
  { label: 'Santiago → Viña del Mar' }] })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | `Array<{ label, href?, onClick? }>` | — | Del nivel más alto a la página actual. |
| `maxItems` | `number` (mínimo 3) | `4` | Niveles visibles antes de plegar. |
| `label` | `string` | `'Ruta de navegación'` | Nombre del `nav`. |

El último ítem siempre es la página actual: su `href` se ignora.

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un `nav` nombrado «Ruta de navegación», con una lista ordenada de niveles.
- La página actual es texto con `aria-current="page"`, no un enlace.
- El separador `/` está oculto para los lectores de pantalla.
- El menú «…» dice cuántos niveles guarda: «Mostrar 2 niveles más».
- Cada enlace tiene un área de toque de 44 px de alto.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los enlaces y el menú «…». |
| Enter | Abre el enlace. |
| Enter, Espacio o ↓ (en «…») | Abre el menú; ver `PullDownButton`. |

### Recomendaciones de diseño

- Si hay dos rutas en la página, dale a cada una un `label` distinto.

### Consideraciones de desarrollo

- Pon la ruta antes del título de la página en el orden del documento, así el lector la encuentra en el camino.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
