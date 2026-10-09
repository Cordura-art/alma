---
component: WebView
tab: Uso
summary: Contenido de fuera dentro de una app, con su origen siempre a la vista.
---


## Resumen

`WebView` muestra una página de otro sitio dentro de una app: unas condiciones, una ayuda, un pago. Lleva una barra que dice de dónde viene. Es la *web view* de Apple.

![Un WebView. Arriba, su barra: un candado y el sitio de donde viene la página, «ejemplo.cl», y a la derecha dos botones, recargar y abrir en otra pestaña. En el cuerpo, en lugar de la página, el mensaje «Este contenido no se puede mostrar aquí» y el enlace «Abrir ejemplo.cl».](assets/Componentes/web-view-bloqueada.png)

## Anatomía

1. **Barra:** un candado y el sitio de donde viene la página. La gente tiene que saber que eso no es tuyo.
2. **Acciones:** recargar y abrir en otra pestaña.
3. **Cuerpo:** la página. Mientras llega, un indicador; si no se deja mostrar, un mensaje y el enlace para abrirla aparte.

## Cuándo usarla

- Para contenido breve de otro sitio que no conviene sacar de contexto.

## Cuándo no

- **Para hacer un navegador.** No tiene dirección ni historial.
- **Para contenido propio:** constrúyelo con ALMA.
- Si el otro sitio no permite mostrarse dentro de otro: ábrelo afuera.

## Reglas

- **El origen siempre a la vista.** La persona tiene que saber que eso no es tuyo.
- **Siempre se puede abrir afuera.**
- **Está encerrada:** lo de adentro no alcanza la app que lo contiene.
- **Si no se puede mostrar, lo dice** y ofrece el enlace. Nunca queda un rectángulo vacío.

## Dónde no funciona

Muchos sitios prohíben mostrarse dentro de otro, y algunos entornos (como los artefactos de Claude) no permiten incrustar otros sitios. Para esos casos está `blocked`.

## Relacionados

`Window` · `Link` · `Sheet`.

## Referencias

- Apple, Human Interface Guidelines: Web views.
