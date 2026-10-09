---
pattern: Elegir un componente
summary: Cuál usar cuando varios se parecen: una tabla por familia.
---

## Para qué

ALMA tiene 75 componentes, y varios hacen cosas parecidas. Esta página dice cuál va en cada caso. Se entra por lo que necesitas, no por el nombre de la pieza.

## Mostrar avance, o una medida

| Necesitas | Usa |
|---|---|
| Decir que algo carga, sin saber cuánto falta | `ActivityIndicator` |
| Mostrar cuánto falta de una tarea | `ProgressBar` |
| Mostrar la forma de lo que va a llegar | `Skeleton` |
| Decir en qué paso de un flujo se está | `ProgressIndicator` |
| Un avance fino, pegado a un borde | `ProgressLine` |
| Un valor dentro de un rango: cuánto hay, dónde está | `Gauge` |
| Seguir algo que dura, fuera de su app | `LiveActivity` |

La diferencia que más se confunde: **`ProgressBar` mide algo que está pasando; `Gauge`, algo que es.**

## Detener, preguntar, confirmar

| Necesitas | Usa |
|---|---|
| Avisar de algo que la persona no esperaba | `Alert` |
| Ofrecer cómo seguir una acción que la persona inició | `ActionSheet` |
| Una tarea corta que pide atención completa | `Modal` |
| Una tarea que acompaña a la pantalla, o en un teléfono | `Sheet` |
| El permiso de un agente de IA antes de actuar | `Snippet`, de confirmación |
| Algo que se puede deshacer | Nada de lo anterior: actúa y ofrece «Deshacer» en `ToastRegion` |

## Avisar sin detener

| Necesitas | Usa |
|---|---|
| Un aviso que pertenece a un lugar de la página | `InlineNotification` |
| Un aviso breve de algo que acaba de pasar | `ToastRegion` |
| Una pantalla sin contenido todavía | `EmptyState` |
| El estado de un ítem | `Tag` |

## Explicar algo junto a un control

| Necesitas | Usa |
|---|---|
| El nombre de un botón que solo tiene ícono | `Tooltip` |
| Una explicación con texto, enlaces o un botón | `Popover` |
| Enseñar una función nueva, una vez | `Tip` |
| Decir que algo lo generó una IA, y explicarlo | `AILabel` |

## Elegir una opción

| Necesitas | Usa |
|---|---|
| Sí o no, con efecto inmediato | Una fila de `List` con su interruptor |
| Sí o no, dentro de un formulario que se envía | `Checkbox` |
| Una de dos a cuatro, todas a la vista y cortas | `SegmentedControl` |
| Una de tres a cinco, con texto que explicar | `RadioGroup` |
| Una de muchas | `PopUpButton` |
| Una de muchísimas, escribiendo para encontrarla | `Combobox` |
| Varias, de una lista corta | `Checkbox` en grupo, o `List` con vistos |
| Varias, escribiéndolas | `TokenField` |
| Un número, de a pasos | `Stepper` |
| Un valor aproximado en un rango | `Slider` |
| Una opinión | `Rating` |

## Escribir

| Necesitas | Usa |
|---|---|
| Un dato corto | `TextInput` |
| Un texto largo | `Textarea` |
| Buscar | `SearchField` |
| Un código de verificación | `DigitEntry` |
| Una fecha, o una hora | `DatePicker`, `TimePicker` |
| Pedirle algo a una IA | `PromptInput` |

## Ofrecer acciones

| Necesitas | Usa |
|---|---|
| La acción principal, a la vista | `Button` |
| Ir a otra parte | `Link` |
| Varias acciones de un botón | `PullDownButton` |
| Las acciones de un ítem, sin ocupar lugar | `ContextMenu`, y también en otro lugar a la vista |
| Acciones sobre un texto seleccionado | `EditMenu` |
| Todos los comandos de una app, en un escritorio | `MenuBar` |

## Moverse

| Necesitas | Usa |
|---|---|
| Las secciones de una app, en un teléfono | `TabBar` |
| Las secciones de una app, en pantalla ancha | `Sidebar` |
| Vistas de un mismo contenido | `Tabs` |
| El título y las acciones de una pantalla | `Toolbar` |
| Mostrar el camino hasta aquí | `Breadcrumb` |
| Pasar entre páginas de resultados | `Pagination` |
| Pasar entre pocas pantallas, deslizando | `PageControl` |

## Mostrar una jerarquía

| Necesitas | Usa |
|---|---|
| Hasta dos niveles, para navegar una app | `Sidebar` |
| Varios niveles que se abren y se cierran | `Outline` |
| Muchos niveles, viendo por dónde se vino | `ColumnView` |
| Una lista y el detalle de lo elegido | `SplitView` |
| Partes de un contenido que se despliegan | `Accordion` |

## Agrupar contenido

| Necesitas | Usa |
|---|---|
| Un tema, con su título y sus acciones | `Card` |
| Un producto, con precio | `ProductCard` |
| Un medio de pago | `PaymentCard` |
| Filas de texto | `List` |
| Datos que se comparan en columnas | `Table` |
| Ítems que se miran más que se leen | `Collection` |
| Un poco de una app, fuera de ella | `Widget` |
| La respuesta de una IA como tarjeta | `Snippet` |

La regla general: **texto en filas, imágenes en grilla, números en tabla.**

## Mostrar datos

| La pregunta | Usa |
|---|---|
| ¿Cuánto es? | El número, grande |
| ¿Cuál es mayor? | `BarChart` |
| ¿Cómo cambió? | `LineChart` |
| ¿Se relacionan? | `ScatterChart` |
| ¿Cuánto hay de un total? | `Gauge` |
| ¿Cuál es el valor exacto? | `Table` |

## Si ninguno calza

Antes de crear uno nuevo: ¿se resuelve con uno de estos y un patrón? Casi siempre sí. Si de verdad falta, se propone como una pieza de ALMA, no como algo de una sola pantalla.

## Relacionados

Jerarquía · Menús · Diálogos · Acciones · Formularios · Notificaciones · Carga · Entorno · Gráficos de datos.
