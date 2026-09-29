# Tabs

Pestañas para alternar entre paneles de contenido **relacionado** en la misma área (en Apple, *tab view*).

## Cuándo usarlo
- Para ver distintas facetas de una misma cosa: resumen, asientos y pagos de un viaje.
- Para navegar entre secciones de la app, usa `TabBar` (móvil) o `Sidebar` (tablet y escritorio), no `Tabs`.
- Hasta **6 pestañas**. Con más, elige la vista con un `PopUpButton`. No uses un menú emergente para cambiar entre pocas pestañas: toma dos toques en lugar de uno.

## Qué aporta quien lo usa
- `tabs`: etiquetas con sustantivo, cortas, con mayúscula solo al inicio.
- `content` en cada pestaña, o `children`.
- `label`: nombre accesible del grupo.
- Los controles de un panel solo afectan a ese panel.

## Teclado y estado
- Las flechas ← → recorren las pestañas; Inicio y Fin van a la primera y la última.
- La pestaña activa usa `nav-selected` y una barra de 2 px debajo: cambian el color y la forma. La barra se desliza en `duration-moderate-01`.
