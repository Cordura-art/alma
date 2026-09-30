---
component: TabBar
tab: Uso
summary: Una barra inferior para moverse entre las secciones principales de la app en el teléfono.
---


## Resumen

`TabBar` muestra, abajo en el teléfono, de 3 a 5 secciones principales de la app, siempre a mano. Es la *tab bar* de Apple.

### Cuándo usarla
- Para la navegación principal en el teléfono.

### Cuándo no usarla
- **Para acciones:** `Toolbar`. La barra de pestañas solo navega.
- **Para cambiar de panel dentro de una vista:** `Tabs` o `SegmentedControl`.
- **Desde 1056 px (`bp-lg`):** `Sidebar` con los mismos destinos.

## Anatomía

1. **Barra** `ui-01` con borde superior.
2. **Ítem**: ícono y etiqueta.
3. **Ítem actual**: ícono relleno y color `nav-selected`.
4. **Insignia** (opcional): un número o «!» sobre el ícono.

> **Imagen pendiente:** anatomía numerada con cuatro ítems y una insignia, en el teléfono y en tablet.

## Reglas

- De 3 a 5 ítems, sin pestaña «Más».
- Siempre visible al cambiar de sección; solo un modal la tapa.
- Nunca ocultes ni desactives un ítem. Si una sección está vacía, explícalo dentro de la sección.
- La insignia solo para lo crítico: algo nuevo o pendiente.

## Contenido

- Etiquetas de **una palabra**, con sustantivo («Inicio», «Viajes», «Billetera»).
- Íconos conocidos; el actual se ve relleno.

## Comportamiento

| Ancho | Ítem |
|---|---|
| Menos de 672 px | Ícono arriba y etiqueta abajo, en 11 px. |
| Desde 672 px | Ícono y etiqueta en una fila, en 14 px. |

- Con `fixed`, queda pegada abajo y respeta el área segura del teléfono.
- Tocar el ítem actual no hace nada distinto: la sección sigue igual.

## Relacionados

`Sidebar` · `Toolbar` · `Tabs`.

## Referencias

- Apple, Human Interface Guidelines: Tab bars.
