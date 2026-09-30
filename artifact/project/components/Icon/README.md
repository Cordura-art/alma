# Icon

Un ícono de IBM Carbon, dibujado como SVG dentro de la página.


## Uso

### Resumen

`Icon` dibuja un ícono de IBM Carbon como SVG: se ve desde el primer instante, no descarga fuentes y hereda el color del texto. El contexto completo (la biblioteca, los tamaños, el estilo) está en el fundamento **Íconos**.

#### Cuándo usarlo
- Siempre que una interfaz de ALMA necesite un ícono.

#### Cuándo no usarlo
- **Para decorar.**
- **Junto a emoji u otros sets de íconos:** un solo set.

### Variantes

| Variante | Uso |
|---|---|
| `outlined` (por defecto) | La mayoría de los casos. |
| `filled` | Lo elegido y los avisos. Usa la versión `--filled` de Carbon si existe; si no, queda el contorno. |

### Tamaños

| Tamaño | Uso |
|---|---|
| 16 px | Datos densos. |
| 20 px | Dentro de controles. |
| 24 px (por defecto) | Junto a texto. |
| 32 px | Zonas vacías. |

![El ícono de información en contorno y en relleno, en los cuatro tamaños de ALMA: 16, 20, 24 y 32 px.](assets/Componentes/icon-tamanos.png)

### Contenido

- Usa el nombre de Carbon: `arrow--right`, `checkmark--outline`, `trash-can`. Búscalo en `assets/Icons/carbon-icons.json`, que trae categorías y sinónimos.
- Si el ícono comunica algo sin texto al lado, dale un nombre (`label`).

### Relacionados

Íconos (fundamento) · `Button` · `Tooltip`.

## Estilo

### Color

El ícono hereda el color del texto (`currentColor`). Ponlo dentro de algo que ya use:

| Token | Uso |
|---|---|
| `icon-01` | Íconos principales. |
| `icon-02` | Íconos secundarios. |
| `text-on-interactive` | Sobre lima o acero. |
| `status-icon-*` | Avisos de estado. |

### Tamaño

| Tamaño | Token | En rem |
|---|---|---|
| 16 px | `icon-size-sm` | 1 |
| 20 px | `icon-size-md` | 1,25 |
| 24 px | `icon-size-lg` | 1,5 |
| 32 px | `icon-size-xl` | 2 |

Van en `rem`: crecen con el texto.

### Estilo

Un solo peso y un solo estilo: el de Carbon, dibujado en una grilla de 32 px y escalado.

### Contraste

Un ícono que informa necesita 3:1 contra su fondo.

## Código

### Uso

```js
const { Icon } = window.AlmaDS;
h(Icon, { name: 'arrow--right' })
h(Icon, { name: 'warning', variant: 'filled', size: 20, label: 'Advertencia' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `name` | `string` | — | Nombre de Carbon. |
| `variant` | `'outlined' \| 'filled'` | `'outlined'` | — |
| `size` | `16 \| 20 \| 24 \| 32` | `24` | En px; se dibuja en rem. |
| `color` | `string` | — | Mejor heredarlo; si lo pasas, usa un token (`var(--icon-02)`). |
| `label` | `string` | — | Nombre para el lector. |
| `className` | `string` | — | — |

### Más íconos

ALMA incluye 896. Para los 2.775 de Carbon:

```js
fetch('assets/Icons/carbon-icons.json').then(r => r.json()).then(AlmaDS.registerIcons);
```

`registerIcons` solo acepta formas SVG simples y rechaza cualquier otra cosa. `AlmaDS.iconNames()` lista los disponibles. Los nombres anteriores de Material Symbols siguen funcionando, con un aviso en la consola.

## Accesibilidad

### Qué ofrece ALMA

- Sin `label`, el ícono es decorativo: queda oculto para el lector.
- Con `label`, se anuncia con ese nombre (`role="img"`).
- Crece con el texto: probado al 200 %.

### Recomendaciones de diseño

- Si el ícono está junto a un texto que dice lo mismo, déjalo decorativo.
- Un botón de solo ícono lleva el nombre en el botón (`aria-label`), no en el ícono.

### Verificación

axe sin problemas en los cuatro temas.
