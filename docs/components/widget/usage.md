---
component: Widget
tab: Uso
summary: Una idea de una app, para leer de un vistazo sin abrirla.
---


## Resumen

`Widget` muestra un poco del contenido de una app fuera de ella: en el escritorio, o en un panel. Se lee de un vistazo y, al tocarlo, abre la app en ese lugar. Es el *widget* de Apple.

Antes de usarlo, lee el patrón **Entorno**.

## Cuándo usarlo

- Para lo que una persona mira varias veces al día: su próximo viaje, su saldo, el clima.
- Para información que cambia durante el día.

## Cuándo no

- **Como acceso directo.** Un widget que solo repite el ícono de la app no aporta: para eso está el `Dock`.
- **Para algo que cambia cada segundo.** Eso es una `LiveActivity`.
- **Dentro de la app.** Un elemento que se parece a un widget y no se comporta como uno confunde. Dentro de la app, es una `Card`.
- **Para hacer una tarea.** A lo más, una acción simple.

## Anatomía

1. **Título:** de qué es, con el ícono de su app.
2. **Contenido:** una idea. Lo más importante, grande.
3. **Cuándo:** de cuándo es lo que muestra.

![Anatomía de Widget, en sus tamaños chico y mediano: el título con el ícono de la app (1), el contenido con el dato principal en grande (2) y, al pie, de cuándo es el dato (3).](assets/Componentes/widget-anatomia.png)

## Tamaños

Van sobre una grilla de celdas de 160 px, con 16 px entre ellas.

| Tamaño | `size` | Celdas | Para |
|---|---|---|---|
| Chico | `sm` | 1 × 1 | Un solo dato. |
| Mediano | `md` | 2 × 1 | Un dato y su contexto. |
| Grande | `lg` | 2 × 2 | Una lista corta, o un gráfico. |
| Muy grande | `xl` | 4 × 2 | Varias capas de lo mismo. |

No ofrezcas todos los tamaños por ofrecerlos. Un tamaño mayor muestra **más** de la misma idea, no lo mismo estirado.

## Contenido

- **Una idea**, la que más importa de esa app. En todos los tamaños es la misma idea.
- **Se lee de un vistazo.** Poco denso para entenderlo en un segundo; lo bastante para que valga tenerlo.
- **Lo principal, grande.** Usa la clase `alma-widget__figure` para la cifra.
- **Fresco.** Si nunca cambia, nadie lo mira. Y dice de cuándo es: «Hace 5 min».
- **Sin logo.** El ícono y el título ya dicen de quién es.
- **Si falta iniciar sesión, lo dice:** «Inicia sesión para ver tus viajes».
- **Nada privado a la vista.** Un widget lo ve quien pase.

## Comportamiento

- Todo el widget es un solo acceso: abre la app donde está eso.
- En los tamaños mediano y mayores puede llevar uno o dos controles propios.
- No se actualiza en vivo: se refresca cada tanto.

## Relacionados

`LiveActivity` · `Desktop` · `Card` · Entorno · Profundidad.

## Referencias

- Apple, Human Interface Guidelines: Widgets, Complications.
