# Accordion

Secciones que se abren y se cierran para mostrar contenido largo por partes.


## Uso

### Resumen

`Accordion` muestra una lista de títulos; cada uno abre su contenido. Sirve para mostrar contenido largo por partes sin llenar la pantalla. Es el *accordion* de Carbon y el *disclosure group* de Apple.

#### Cuándo usarlo
- Preguntas frecuentes.
- Detalles secundarios de algo: el desglose de un pedido, las condiciones de un pasaje.

#### Cuándo no usarlo
- **Lo que casi todos necesitan ver:** muéstralo abierto.
- **Los errores de un formulario:** nunca escondidos.
- **Paneles del mismo nivel que se comparan:** `Tabs`.
- **Navegación:** `Sidebar`.

### Anatomía

1. **Título**: un botón a todo el ancho.
2. **Flecha** (`chevron`), que gira al abrir.
3. **Contenido.**
4. **Separadores** entre secciones.

> **Imagen pendiente:** preguntas frecuentes con una sección abierta.

### Contenido

- Títulos cortos: una pregunta o un tema («¿Cuánto equipaje puedo llevar?»).
- El contenido, breve; si crece mucho, es otra página.

### Comportamiento

- Por defecto se pueden abrir varias a la vez (`allowMultiple`, como en Carbon); con `allowMultiple: false`, abrir una cierra la otra.
- `defaultOpen` abre las que conviene ver primero.
- Una sección desactivada se ve pero no se abre.

### Relacionados

`Tabs` · `List` · `ProductCard`.

### Referencias

- IBM, Carbon Design System: Accordion.
- Apple, Human Interface Guidelines: Disclosure controls.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Separadores | borde (1 px) | `accordion-border` |
| Título | color del texto | `text-01` |
| Título:hover | fondo | `accordion-header-bg-hover` |
| Título desactivado | color del texto | `disabled-03` |
| Flecha | relleno | `icon-02` |
| Título:focus | contorno | `focus` (2 px, por dentro) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 14 / 0,875 | `font-weight-heading` | — |
| Contenido | 14 / 0,875 | `font-weight-body` | 1,6 |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Acordeón | ancho máximo | 672 px (42 rem) |
| Título | relleno | 8 px arriba y abajo, 16 px a los lados |
| Título y flecha | separación | 16 px |
| Contenido | relleno | 16 px a los lados, 24 px abajo |

> **Imagen pendiente:** anatomía acotada.

### Tamaño

| Densidad | Alto mínimo del título (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

### Movimiento

La flecha gira en `duration-fast-02`; el contenido aparece bajando 4 px en `duration-moderate-02` con `easing-entrance-productive`. Con movimiento reducido, sin animación.

### Contraste

Títulos y contenido a 4,5:1; flecha a 3:1, en los cuatro temas.

## Código

### Uso

```js
const { Accordion } = window.AlmaDS;
h(Accordion, { headingLevel: 2, defaultOpen: ['equipaje'], items: [
  { id: 'equipaje', title: '¿Cuánto equipaje puedo llevar?', content: h('p', null, 'Una maleta de hasta 20 kg y un bolso de mano.') },
  { id: 'cambio', title: '¿Puedo cambiar la fecha?', content: h('p', null, 'Sí, hasta 4 horas antes de la salida.') }] })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | `Array<{ id, title, content, disabled? }>` | — | Las secciones. |
| `defaultOpen` | `string[]` | `[]` | Ids abiertos al inicio. |
| `allowMultiple` | `boolean` | `true` | `false`: una sola abierta. |
| `onChange` | `(open: string[]) => void` | — | Recibe las abiertas. |
| `headingLevel` | `2–6` | `3` | Nivel de los títulos. |
| `id` | `string` | automático | — |

## Accesibilidad

### Qué ofrece ALMA

- Cada título es un encabezado (`headingLevel`) con un botón dentro, con `aria-expanded` y `aria-controls`.
- Cada contenido es una región nombrada por su título; cerrado, queda oculto también para el lector.
- La flecha es decorativa.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los títulos y el contenido abierto. |
| Enter o Espacio | Abre o cierra. |
| ↓ / ↑ | Pasa al título siguiente o anterior, en círculo. |
| Inicio / Fin | Primer y último título. |

### Recomendaciones de diseño

- Ajusta `headingLevel` a la jerarquía de la página.

### Verificación

axe sin problemas en los cuatro temas; teclado probado. Pendiente: VoiceOver y NVDA.
