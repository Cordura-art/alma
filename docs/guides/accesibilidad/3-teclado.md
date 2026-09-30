---
element: Accesibilidad
order: 1
tab: Teclado
summary: El piso de ALMA es WCAG 2.2 AA en los cuatro temas, con foco visible, teclado y movimiento reducido.
---

## Reglas

- Todo lo interactivo se alcanza con Tab, en el orden en que se lee.
- El foco siempre se ve.
- Nada atrapa el foco, salvo un diálogo modal (y siempre se sale con Esc).
- Nada cambia de contexto solo por recibir el foco.

## Teclas de ALMA

| Tecla | Hace |
|---|---|
| Tab / Mayús+Tab | Pasa al control siguiente o anterior. |
| Enter | Activa botones y enlaces; envía formularios. |
| Espacio | Activa botones; marca casillas y switches. |
| Flechas | Se mueven dentro de un grupo: pestañas, radios, menús, calendario. |
| Inicio / Fin | Primera y última opción de un grupo. |
| Esc | Cierra menús, diálogos, popovers y tooltips. |

Cada guía de componente tiene su tabla de teclado en la pestaña **Accesibilidad**.

## Foco al cambiar de vista

- Al navegar a otra página, lleva el foco a su título (`h1`).
- Al abrir un diálogo, el foco entra; al cerrarlo, vuelve al botón que lo abrió (ALMA lo hace).
- Al borrar un elemento de una lista, lleva el foco al siguiente, o al anterior si era el último.
- Ofrece «Saltar al contenido» como primer enlace de la página.
