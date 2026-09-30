# Toolbar

La barra superior con el título de la vista, la navegación y las acciones frecuentes.


## Uso

### Resumen

`Toolbar` confirma dónde está la persona (el título), le permite volver o buscar y le da las acciones frecuentes sobre el contenido. Es la *toolbar* y la barra de navegación de Apple.

#### Cuándo usarla
- Arriba de cada vista de una app.
- Cuando la vista tiene un buscador o dos o tres acciones frecuentes.

#### Cuándo no usarla
- **Para navegar entre secciones:** `TabBar` o `Sidebar`.
- **Para las acciones de un elemento:** van en el elemento (una tarjeta, una fila) o en su `PullDownButton`.

### Anatomía

1. **Volver** (opcional): botón de ícono `arrow--left`.
2. **Título** de la vista.
3. **Buscador** (opcional): un `SearchField`.
4. **Acciones**: botones `plain`, normalmente de ícono.
5. **Más** (opcional): un menú con las acciones menos usadas.

![Anatomía de Toolbar en escritorio y en el teléfono, donde el buscador baja a su propia fila. Numerados: volver (1), título (2), buscador (3), acciones (4) y más (5).](assets/Componentes/toolbar-anatomia.png)

### Reglas

- **Un título útil** que confirme dónde está la persona. Si sería redundante, déjalo vacío.
- **Pocas acciones**, que se distingan y se puedan tocar. Las demás van en **Más** (`moreActions`); úsalo solo si hace falta.
- **Sin fondos pesados ni controles teñidos:** la barra usa el color de la página, y las acciones son botones `plain`.
- Las acciones de ícono llevan nombre y, si ayuda, un `Tooltip`.

### Comportamiento

| Ancho | Buscador |
|---|---|
| Menos de 672 px | En su propia fila, debajo del título y las acciones, a todo el ancho. |
| Desde 672 px | En la misma fila, entre el título y las acciones. |

- Con `sticky`, queda fija arriba al desplazar la página.
- Un título largo se corta con puntos suspensivos.

### Relacionados

`SearchField` · `PullDownButton` · `TabBar` · `Sidebar` · `Breadcrumb`.

### Referencias

- Apple, Human Interface Guidelines: Toolbars; Navigation bars.
- IBM, Carbon Design System: UI shell (header).

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Barra | fondo | `toolbar-bg` (la página, `ui-02`) |
| Barra | borde inferior (1 px) | `toolbar-border` |
| Título | color del texto | `text-01` |
| Acciones y Volver | estilo | `Button` plain de ícono |
| Más | estilo | `PullDownButton` de ícono sin borde |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 20 / 1,25 | `font-weight-heading` | 1,4 |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | alto mínimo | 56 px |
| Barra | relleno lateral | 8 px |
| Grupos | separación | 8 px |
| Título | margen lateral | 8 px |
| Buscador | ancho | crece desde 320 px, hasta 480 px |
| Acciones | separación | 4 px |
| Buscador (menos de 672 px) | relleno | 8 px a los lados y abajo |

![Medidas de Toolbar: alto de la barra, relleno lateral, separación entre grupos y botones de acción de 44 px.](assets/Componentes/toolbar-medidas.png)

### Capas

Con `sticky`, la barra está en `z-header` y respeta el área segura superior del teléfono.

### Contraste

Título y acciones a 4,5:1 sobre `toolbar-bg`, en los cuatro temas.

## Código

### Uso

```js
const { Toolbar, SearchField } = window.AlmaDS;
h(Toolbar, { title: 'Mis viajes', sticky: true, onBack: goBack,
  search: h(SearchField, { placeholder: 'Buscar viajes o ciudades', onChange: setQuery }),
  actions: [{ label: 'Filtrar', icon: 'filter', onPress: openFilters }],
  moreActions: ['Exportar…', { value: 'borrar', label: 'Borrar historial', role: 'destructive' }],
  onMoreAction: handleMore })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | `string` | — | Título de la vista. Se dibuja como `h1`. |
| `onBack` / `backLabel` | `() => void` / `string` | — / `'Volver'` | Muestra Volver. |
| `search` | `node` | — | Un `SearchField`. |
| `actions` | `Array<{ label, icon, text?, variant?, role?, onPress }>` | — | Acciones frecuentes. Con `text: true` se ve la etiqueta; si no, es un botón de ícono con `label` como nombre. |
| `moreActions` / `onMoreAction` | `MenuOption[]` / `(value) => void` | — | El menú Más. |
| `sticky` | `boolean` | `false` | Fija arriba. |

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un `header`; el título es un `h1`.
- Volver se llama «Volver» (o `backLabel`).
- Las acciones de ícono usan su `label` como nombre.
- Más se llama «Más acciones» y abre un menú (ver `PullDownButton`).

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre Volver, el buscador, las acciones y Más. |
| Enter o Espacio | Activa el botón con foco. |

### Recomendaciones de diseño

- El título de la barra es el `h1` de la vista: no pongas otro `h1` en el contenido. Si la página ya tiene su título, deja `title` vacío.
- Dale a cada acción de ícono un `label` que diga qué hace.

### Consideraciones de desarrollo

- Al navegar, lleva el foco al título de la vista nueva.
- Usa una sola `Toolbar` por vista.

### Verificación

axe sin problemas en los cuatro temas; probada también en el teléfono a 375 px. Pendiente: VoiceOver y NVDA.
