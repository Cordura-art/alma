# Tabs

Pestañas para alternar entre paneles de contenido relacionado en la misma área.


## Uso

### Resumen

`Tabs` muestra un panel a la vez entre varios paneles relacionados, sin cambiar de página. En Apple es la *tab view*; en Carbon, *tabs*.

#### Cuándo usarlo
- Para ver distintas facetas de una misma cosa: el resumen, los asientos y los pagos de un viaje.
- Cuando los paneles son independientes y no hace falta verlos juntos.

#### Cuándo no usarlo
- **Para navegar entre secciones de la app:** `TabBar` en el teléfono, `Sidebar` en tablet y escritorio.
- **Para filtrar una misma lista o cambiar su vista:** `SegmentedControl`.
- **Para pasos de un proceso:** `ProgressIndicator`.
- **Con más de 6 pestañas:** elige la vista con un `PopUpButton`.
- Al revés, no pongas pocas pestañas en un menú emergente: cambiar de panel tomaría dos toques en vez de uno.

### Anatomía

1. **Lista de pestañas**, con un borde inferior.
2. **Pestaña**: etiqueta y, opcionalmente, un ícono.
3. **Indicador**: barra de 2 px bajo la pestaña activa.
4. **Panel** con el contenido.

![Anatomía de Tabs con tres pestañas y la primera activa. Numerados: lista de pestañas (1), pestaña (2), indicador de la pestaña activa (3) y panel (4).](assets/Componentes/tabs-anatomia.png)

### Contenido

- Etiquetas con sustantivo, cortas, con mayúscula solo al inicio («Resumen», «Asientos», «Pagos»).
- Todas del mismo tipo: no mezcles sustantivos y verbos.
- Ordénalas por uso, la más usada primero; la primera se abre por defecto.
- Los controles de un panel afectan solo a ese panel.

### Comportamiento

- Un clic o las flechas cambian de pestaña; el panel cambia al instante.
- El indicador se desliza a la pestaña nueva.
- Si las pestañas no caben, la lista se desplaza hacia el lado; no pasan a una segunda línea.
- Si la persona vuelve a la misma vista, muéstrale la última pestaña que eligió (lo decide quien usa el componente, con `value`).

### Relacionados

`SegmentedControl` · `TabBar` · `Sidebar` · `PopUpButton`.

### Referencias

- Apple, Human Interface Guidelines: Tab views.
- IBM, Carbon Design System: Tabs.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Lista | borde inferior (1 px) | `tabs-border` |
| Pestaña | color del texto | `tabs-text` |
| Pestaña:hover | color del texto | `text-01` |
| Pestaña activa | color del texto | `tabs-text-selected` |
| Indicador | fondo | `tabs-indicator` |
| Pestaña:focus | contorno | `focus` (2 px, por dentro) |
| Panel:focus | contorno | `focus` (2 px, separado 2 px) |

`tabs-text-selected` y `tabs-indicator` apuntan a `nav-selected`: la pestaña activa cambia de color **y** de forma (el indicador).

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Pestaña | 14 / 0,875 | `font-weight-body` | `web-label-m` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Pestañas | separación | 8 px |
| Pestaña | relleno lateral | 16 px |
| Pestaña | radio | `radius-nav` arriba |
| Indicador | alto, radio | 2 px, 2 px |
| Indicador | margen lateral | 16 px (mide lo mismo que la etiqueta) |
| Panel | relleno | 24 px arriba y abajo |

![Medidas de Tabs: alto de la pestaña, relleno lateral, separación entre pestañas, indicador de 2 px y separación con el panel.](assets/Componentes/tabs-medidas.png)

### Tamaño

| Densidad | Alto de la pestaña (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

### Movimiento

El color del texto cambia en `duration-fast-01`; el indicador crece en `duration-moderate-01`, ambos con `easing-standard-productive`. Con movimiento reducido, el cambio es instantáneo.

### Contraste

Texto de las pestañas a 4,5:1 (7:1 en alto contraste) e indicador a 3:1, en los cuatro temas.

## Código

### Uso

```js
const { Tabs } = window.AlmaDS;
h(Tabs, { label: 'Detalle del viaje', tabs: [
  { value: 'resumen', label: 'Resumen', content: h(Resumen) },
  { value: 'asientos', label: 'Asientos', content: h(Asientos) },
  { value: 'pagos', label: 'Pagos', content: h(Pagos) }] })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `tabs` | `Array<string \| { value, label, icon, content }>` | — | Hasta 6. |
| `value` / `defaultValue` | `string` | la primera | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe la pestaña elegida. |
| `label` | `string` | — | Nombre del grupo de pestañas. |
| `children` | `node` | — | El panel, si las pestañas no traen `content`. |
| `id` | `string` | automático | — |

### Panel controlado desde fuera

```js
const [tab, setTab] = React.useState('resumen');
h(Tabs, { label: 'Detalle del viaje', value: tab, onChange: setTab, tabs: ['resumen', 'asientos'] },
  tab === 'resumen' ? h(Resumen) : h(Asientos))
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- La lista es `role="tablist"`, nombrada por `label`; cada pestaña es `role="tab"` con `aria-selected` y `aria-controls`; el panel es `role="tabpanel"`, nombrado por su pestaña.
- Solo la pestaña activa entra en el orden de Tab (*roving tabindex*): Tab salta de la lista al panel.
- El panel recibe foco, así el contenido que no tiene controles también se puede alcanzar.
- La pestaña activa se distingue por el indicador, no solo por el color.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra a la pestaña activa y luego pasa al panel. |
| → / ← | Activa la pestaña siguiente o anterior, en círculo. |
| Inicio / Fin | Activa la primera o la última. |

Las flechas activan la pestaña al instante: los paneles deben cargar rápido. Si un panel tarda, muestra un estado de carga dentro.

### Recomendaciones de diseño

- Dale siempre un `label` que diga de qué son las pestañas («Detalle del viaje»).

### Consideraciones de desarrollo

- No pongas pestañas dentro de otras pestañas.
- Si guardas la pestaña elegida, restáurala sin mover el foco.

### Verificación

axe sin problemas en los cuatro temas; teclado probado. Pendiente: VoiceOver y NVDA.
