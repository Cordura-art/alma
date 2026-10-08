# Widget

Una idea de una app, para leer de un vistazo sin abrirla.


## Uso

### Resumen

`Widget` muestra un poco del contenido de una app fuera de ella: en el escritorio, o en un panel. Se lee de un vistazo y, al tocarlo, abre la app en ese lugar. Es el *widget* de Apple.

Antes de usarlo, lee el patrón **Entorno**.

### Cuándo usarlo

- Para lo que una persona mira varias veces al día: su próximo viaje, su saldo, el clima.
- Para información que cambia durante el día.

### Cuándo no

- **Como acceso directo.** Un widget que solo repite el ícono de la app no aporta: para eso está el `Dock`.
- **Para algo que cambia cada segundo.** Eso es una `LiveActivity`.
- **Dentro de la app.** Un elemento que se parece a un widget y no se comporta como uno confunde. Dentro de la app, es una `Card`.
- **Para hacer una tarea.** A lo más, una acción simple.

### Anatomía

1. **Título:** de qué es, con el ícono de su app.
2. **Contenido:** una idea. Lo más importante, grande.
3. **Cuándo:** de cuándo es lo que muestra.

![Anatomía de Widget, en sus tamaños chico y mediano: el título con el ícono de la app (1), el contenido con el dato principal en grande (2) y, al pie, de cuándo es el dato (3).](assets/Componentes/widget-anatomia.png)

### Tamaños

Van sobre una grilla de celdas de 160 px, con 16 px entre ellas.

| Tamaño | `size` | Celdas | Para |
|---|---|---|---|
| Chico | `sm` | 1 × 1 | Un solo dato. |
| Mediano | `md` | 2 × 1 | Un dato y su contexto. |
| Grande | `lg` | 2 × 2 | Una lista corta, o un gráfico. |
| Muy grande | `xl` | 4 × 2 | Varias capas de lo mismo. |

No ofrezcas todos los tamaños por ofrecerlos. Un tamaño mayor muestra **más** de la misma idea, no lo mismo estirado.

### Contenido

- **Una idea**, la que más importa de esa app. En todos los tamaños es la misma idea.
- **Se lee de un vistazo.** Poco denso para entenderlo en un segundo; lo bastante para que valga tenerlo.
- **Lo principal, grande.** Usa la clase `alma-widget__figure` para la cifra.
- **Fresco.** Si nunca cambia, nadie lo mira. Y dice de cuándo es: «Hace 5 min».
- **Sin logo.** El ícono y el título ya dicen de quién es.
- **Si falta iniciar sesión, lo dice:** «Inicia sesión para ver tus viajes».
- **Nada privado a la vista.** Un widget lo ve quien pase.

### Comportamiento

- Todo el widget es un solo acceso: abre la app donde está eso.
- En los tamaños mediano y mayores puede llevar uno o dos controles propios.
- No se actualiza en vivo: se refresca cada tanto.

### Relacionados

`LiveActivity` · `Desktop` · `Card` · Entorno · Profundidad.

### Referencias

- Apple, Human Interface Guidelines: Widgets, Complications.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Widget | fondo | Vidrio medio (`glass-regular`) |
| Widget | borde | `border-subtle` |
| Título e ícono, fecha | color | `text-02` |
| Contenido | color | `text-01` |
| Bajo el cursor | velo | `text-01` al 6 % |
| Foco | contorno | `focus` |

Sobre el vidrio medio van `text-01` y `text-02`. No uses `text-03`.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título, fecha | 11 / 0,6875 | `font-weight-emphasis`; la fecha, `font-weight-body` |
| Cifra principal (`alma-widget__figure`) | 32 / 2, cifras del mismo ancho | `font-weight-heading` |
| Contenido | `web-body-s` o `web-label-s` | — |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Celda de la grilla | lado | 160 px |
| Entre widgets | separación | `space-16` |
| Chico / mediano / grande / muy grande | tamaño | 160 × 160 · 336 × 160 · 336 × 336 · 688 × 336 px |
| Widget | relleno | `space-16` |
| Widget | radio | El doble de `radius-panel` |
| Partes | separación | `space-8` |

## Código

### Uso

```js
const { Widget } = window.AlmaDS;

h('div', { className: 'alma-widgets' },
  h(Widget, { size: 'sm', title: 'Próximo viaje', icon: 'ticket', updated: 'Hace 5 min', onOpen: abrirViaje },
    h('p', { className: 'alma-widget__figure' }, '08:30'),
    h('p', { className: 'web-body-s' }, 'Viña del Mar')),
  h(Widget, { size: 'md', title: 'Billetera', icon: 'wallet', loading: cargando }, contenido))
```

`alma-widgets` es la grilla: celdas de 160 px que se acomodan solas al ancho.

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | texto | — | De qué es. Obligatorio. |
| `icon` | texto | — | El ícono de su app. |
| `size` | `sm`, `md`, `lg`, `xl` | `sm` | El tamaño. |
| `children` | contenido | — | El contenido. |
| `updated` | texto | — | De cuándo es: «Hace 5 min». |
| `onOpen` | función | — | Al tocarlo. |
| `href` | texto | — | En vez de `onOpen`: un enlace. |
| `openLabel` | texto | «Abrir» y el título | El nombre del acceso. |
| `loading` | sí o no | no | Muestra la espera. |

## Accesibilidad

### Qué ofrece ALMA

- **Es un artículo con nombre:** su título. Se puede saltar de widget en widget.
- **Un solo acceso, con nombre:** «Abrir Próximo viaje». No hay que adivinar qué se toca.
- **El contenido se lee en orden:** título, contenido, de cuándo es.
- **El contraste no depende del fondo:** el vidrio medio lo asegura.
- **La espera se anuncia:** «Cargando Clima en Viña».

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al widget, y a sus controles si los tiene. |
| Enter | Abre la app. |

### Recomendaciones de diseño

- El dato principal se entiende sin el resto: «08:30» junto a «Viña del Mar», no solo «08:30».
- No dependas del color para decir un estado. «Atrasado» se escribe.
- No pongas en un widget nada que la persona no querría que vea quien pasa.

### Consideraciones de desarrollo

- No anuncies cada actualización: un widget se consulta, no avisa. Para avisar está `ToastRegion`.
- Pasa siempre `updated` si el dato puede estar viejo.

Pendiente: VoiceOver y NVDA.
