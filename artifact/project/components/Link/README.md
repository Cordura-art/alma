# Link

Un enlace de texto que lleva a otra página o sección.


## Uso

### Resumen

`Link` lleva a otro lugar: otra página, otra sección, otro sitio. Si la acción cambia algo (guardar, pagar, borrar), es un `Button`.

#### Cuándo usarlo
- Dentro de un texto, para ir a más información.
- Suelto (`standalone`), para ir a una página relacionada: «Ver condiciones del pasaje».

#### Cuándo no usarlo
- **Para una acción:** `Button`.
- **Para la navegación principal:** `TabBar`, `Sidebar`.

### Tipos

| Tipo | Propiedad | Aspecto |
|---|---|---|
| Dentro de un texto | — | Subrayado siempre. |
| Suelto | `standalone` | Medium, subrayado al pasar el cursor. |
| Externo | `external` | Abre en otra pestaña y muestra el ícono `launch`. |
| Página actual | `current` | Marca la página actual. |

> **Imagen pendiente:** los cuatro tipos, en reposo, con cursor encima, visitado y con foco.

### Contenido

- El texto se entiende solo: «Ver condiciones del pasaje», nunca «Haz clic aquí» ni «Más».
- Si lleva a un archivo, dilo: «Descargar boleta (PDF, 120 KB)».

### Comportamiento

- Los visitados cambian de color.
- Los externos abren en otra pestaña; úsalos solo para sitios de terceros.

### Relacionados

`Button` · `Breadcrumb` · `Card`.

### Referencias

- IBM, Carbon Design System: Link.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Enlace | color del texto | `link-text` |
| Enlace visitado | color del texto | `link-text-visited` |
| Enlace:focus | contorno | `focus` (2 px, separado 2 px) |

### Tipografía

| Elemento | Tamaño | Peso | Subrayado |
|---|---|---|---|
| Dentro de un texto | el del texto | el del texto | 1 px, a 0,2 em; 2 px al pasar el cursor |
| Suelto | el del texto | `font-weight-emphasis` | solo al pasar el cursor |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Ícono `launch` | tamaño, separación | 16 px, 0,25 em |
| Contorno de foco | radio | 2 px |

### Contraste

`link-text` a 4,5:1 sobre la página y los contenedores, en los cuatro temas. Dentro de un texto el subrayado lo distingue, no solo el color (WCAG 1.4.1).

## Código

### Uso

```js
const { Link } = window.AlmaDS;
h('p', null, 'Revisa las ', h(Link, { href: '#condiciones' }, 'condiciones del pasaje'), ' antes de pagar.')
h(Link, { href: 'https://www.cordura.art', external: true, standalone: true }, 'Visitar Cordura')
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `href` | `string` | — | El destino. |
| `children` | `node` | — | El texto. |
| `external` | `boolean` | `false` | Otra pestaña, ícono y aviso. |
| `standalone` | `boolean` | `false` | Enlace suelto. |
| `current` | `boolean` | `false` | Página actual. |
| `target` / `rel` | `string` | — | Si no es `external`. |
| `onClick` | `(e) => void` | — | — |

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un `<a>` real.
- Los externos avisan al lector «(se abre en otra pestaña)» y llevan `rel="noopener noreferrer"`.
- La página actual lleva `aria-current="page"`.
- Dentro de un texto van subrayados, así no dependen del color.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega al enlace. |
| Enter | Lo abre. |

### Recomendaciones de diseño

- Texto que se entienda fuera de contexto: el lector puede listar todos los enlaces de la página.
- No uses el mismo texto para dos destinos distintos.

### Consideraciones de desarrollo

- No uses un enlace sin `href` para una acción: usa `Button`.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
