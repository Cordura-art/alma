# WebView

Contenido de fuera dentro de una app, con su origen siempre a la vista.


## Uso

### Resumen

`WebView` muestra una página de otro sitio dentro de una app: unas condiciones, una ayuda, un pago. Lleva una barra que dice de dónde viene. Es la *web view* de Apple.

### Cuándo usarla

- Para contenido breve de otro sitio que no conviene sacar de contexto.

### Cuándo no

- **Para hacer un navegador.** No tiene dirección ni historial.
- **Para contenido propio:** constrúyelo con ALMA.
- Si el otro sitio no permite mostrarse dentro de otro: ábrelo afuera.

### Reglas

- **El origen siempre a la vista.** La persona tiene que saber que eso no es tuyo.
- **Siempre se puede abrir afuera.**
- **Está encerrada:** lo de adentro no alcanza la app que lo contiene.
- **Si no se puede mostrar, lo dice** y ofrece el enlace. Nunca queda un rectángulo vacío.

### Dónde no funciona

Muchos sitios prohíben mostrarse dentro de otro, y algunos entornos (como los artefactos de Claude) no permiten incrustar otros sitios. Para esos casos está `blocked`.

### Relacionados

`Window` · `Link` · `Sheet`.

### Referencias

- Apple, Human Interface Guidelines: Web views.

## Estilo

### Color y estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | fondo y borde | `ui-01` y `border-subtle` |
| Origen | texto | 14 px, `text-01` |
| Candado | color | `text-02` |
| Barra | alto | El de un control |
| Cuerpo | alto | 360 px (`height`) |
| Borde y radio | — | `border-subtle` y `radius-panel` |

## Código

### Uso

```js
h(WebView, { src: 'https://www.ejemplo.cl/condiciones', title: 'Condiciones de cambio', height: 420 })

// Donde no se puede incrustar
h(WebView, { src: url, title: 'Condiciones de cambio', blocked: true })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `src` | texto | — | La dirección. |
| `title` | texto | El dominio | El nombre del contenido. |
| `origin` | texto | El dominio | Lo que muestra la barra. |
| `height` | número | 360 | El alto, en px. |
| `blocked` | sí o no | no | No intenta mostrarlo: ofrece abrirlo afuera. |
| `sandbox` | texto | `allow-scripts allow-forms allow-popups` | Lo que se le permite a lo de adentro. |

## Accesibilidad

### Qué ofrece ALMA

- **El marco tiene nombre:** el título del contenido.
- **Recargar y abrir afuera tienen nombre completo.**
- **La espera se anuncia.**

### En tus manos

- Lo de adentro es de otro: su accesibilidad no depende de ALMA. Ofrece siempre abrirlo afuera.
- No abras en una `WebView` algo que pida iniciar sesión o pagar sin que la persona sepa en qué sitio está.

Pendiente: VoiceOver y NVDA.
