# Icon

Ícono de IBM Carbon dibujado como SVG dentro de la página: no descarga fuentes, se ve desde el primer instante y hereda el color.

## Cuándo usarlo
Siempre que una interfaz ALMA necesite un ícono. ALMA incluye 896 íconos de interfaz de Carbon (acciones, navegación, estados, personas, comercio y viajes). El catálogo completo, con 2.775 íconos, está en `assets/Icons/carbon-icons.json`.

## Qué aporta quien lo usa
- `name`: el nombre de Carbon, por ejemplo `arrow--right`, `checkmark--outline` o `trash-can`. Búscalo en `carbon-icons.json` (trae categorías y sinónimos) o en carbondesignsystem.com/elements/icons/library.
- `variant`: `outlined` por defecto. `filled` usa la versión `--filled` del ícono cuando existe (`checkmark--outline` pasa a `checkmark--filled`); si no existe, queda el contorno. Úsalo para estados elegidos y avisos.
- `size`: 24 px por defecto (1,5 rem, crece con el texto). También 16, 20 y 32 px, los tamaños de Carbon. 16 px solo dentro de datos densos.
- `label` si el ícono comunica algo sin texto al lado; si es decorativo, omítelo y queda oculto para lectores de pantalla.
- El color se hereda (`currentColor`): pon el ícono dentro de algo que ya use `icon-01`, `icon-02` o `text-on-interactive`.

## Íconos fuera del set incluido
Registra el catálogo una vez al cargar la página y usa cualquier nombre:

```js
fetch('assets/Icons/carbon-icons.json').then(r => r.json()).then(AlmaDS.registerIcons);
```

`registerIcons` solo acepta formas SVG simples; rechaza cualquier otra cosa. `AlmaDS.iconNames()` lista lo disponible.

## Nombres anteriores
Los nombres de Material Symbols que usaban los componentes (`arrow_forward`, `content_copy`, `expand_more`…) siguen funcionando durante la transición, con un aviso en la consola que dice el nombre de Carbon. Cámbialos.

## No
- Un solo set: no mezcles Carbon con otros íconos ni con emoji.
- Carbon tiene un solo peso y un solo estilo; no hay dos tonos, redondeado ni anguloso.
