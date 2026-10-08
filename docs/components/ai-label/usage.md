---
component: AILabel
tab: Uso
summary: La marca que lleva todo lo que una IA generó, y la explicación que abre.
---


## Resumen

`AILabel` dice de dónde viene lo que estás leyendo: lo generó una IA. Es el ícono `ai-label` y el texto «IA». Sola, es una marca. Con una explicación, se abre y cuenta qué hizo la IA, con qué y cuándo.

Antes de usarla, lee **Interfaces de IA › Transparencia**.

## Cuándo usarla

- Junto a todo contenido que una IA generó: un resumen, un borrador, una categoría sugerida, una imagen.
- En una sugerencia que la persona todavía no acepta.
- En lo generado que la persona editó, con `edited`.

## Cuándo no

- En contenido que no generó una IA, para que parezca más avanzado.
- En cada mensaje de una conversación con un asistente: ahí basta su nombre y el aviso bajo la caja de pedido.
- Como botón para pedirle algo a la IA. Eso es un `Button` con el ícono `ai-generate`.
- Como estado. Que la IA esté trabajando lo dice `ChatMessage` o un `ActivityIndicator`.

## Anatomía

1. **Ícono** `ai-label`.
2. **Texto:** «IA», o «IA · editado».
3. **Explicación** (opcional): se abre al tocar la marca.
4. **Qué hizo, con qué y cuándo.**
5. **Qué revisar.**
6. **Enlace al detalle** (opcional).

![Anatomía de AILabel: el ícono (1) y el texto «IA» (2) forman la marca. Abierta, muestra su explicación (3) con lo que hizo y cuándo (4), qué revisar (5) y un enlace «Cómo funciona» (6).](assets/Componentes/ai-label-anatomia.png)

## Dónde va

Va en el contenedor más chico que encierre todo lo generado, una sola por contenedor.

| Lo generado es | La marca va |
|---|---|
| Toda la página | En el encabezado, junto al título. |
| Una sección o una tarjeta | Junto a su título, o en su esquina superior derecha. |
| El valor de un campo | Al final del campo, mientras nadie lo edite. |
| Una celda de una tabla | En la celda, o en una columna propia si son muchas. |
| Una imagen | Sobre su esquina inferior izquierda. |
| Una sugerencia | Junto a sus acciones. |

## La explicación

Responde siempre lo mismo, en este orden, y cabe en cuatro líneas.

| Parte | Propiedad | Ejemplo |
|---|---|---|
| Qué hizo | `what` | «Resumí tu pasaje y los avisos de la empresa.» |
| Con qué | `basis` | «Usé tus viajes de marzo.» |
| Cuándo | `when` | «Hoy, 09:12» |
| Qué revisar | `review` | «Revisa la hora de salida antes de viajar.» |
| El detalle | `detailHref` | Un enlace «Cómo funciona». |

El nombre del modelo, sus versiones y sus límites van en la página del detalle, no aquí.

## Lo editado

Cuando la persona cambia lo generado, pasa `edited`: la marca dice «IA · editado». Con `onRevert`, la explicación ofrece volver a la versión de la IA. Si la persona lo reescribe entero, quita la marca.

## Tamaños

| Tamaño | Alto | Para |
|---|---|---|
| `sm` (por defecto) | 24 px | Junto a un título, en una tarjeta, en una celda. |
| `md` | 32 px | Junto al título de una página. |

## Relacionados

`Tag`, `Popover`, `SourceList`. La guía **Interfaces de IA**.
