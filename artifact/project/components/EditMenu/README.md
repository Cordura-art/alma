# EditMenu

Lo que se puede hacer con lo seleccionado, en una barra junto a la selección.


## Uso

### Resumen

`EditMenu` aparece junto a un texto seleccionado y ofrece qué hacer con él: copiarlo, buscarlo, preguntarle a la IA. Es el *edit menu* de Apple.

### Cuándo usarlo

- En texto que la gente lee y quiere reutilizar: una respuesta, un documento.
- Para ofrecer la IA sobre una selección: «Preguntar a la IA», «Resumir».

### Cuándo no

- Sobre un ítem que ya tiene `ContextMenu`. Uno u otro, no los dos.
- Para acciones que no dependen de la selección.

### Reglas

- **Pocas acciones:** de dos a cinco, las más probables para ese texto.
- **Las de siempre, primero:** copiar, buscar.
- **Verbo solo:** «Copiar», «Buscar».
- **Nada vive solo aquí.** Aparece con un gesto que no todos hacen: las mismas acciones están en el menú Edición.
- **Se va solo** al quitar la selección, o con Esc.

### Relacionados

`ContextMenu` · `MenuBar` · `ChatMessage` · Menús · Interfaces de IA.

### Referencias

- Apple, Human Interface Guidelines: Edit menus.

## Estilo

### Color y estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | fondo | Vidrio medio, con `shadow-floating` |
| Acción | texto | 14 px, `text-01` |
| Acción bajo el cursor | fondo | `hover-ui` |
| Acción | alto | 32 px |
| Barra | relleno | `space-4` |
| Barra / acción | radio | `radius-panel` / `radius-chip` |
| Barra y selección | distancia | `space-8`, encima y centrada |

## Código

### Uso

```js
h(EditMenu, {
  items: [{ value: 'copiar', label: 'Copiar', icon: 'copy' }, { value: 'ia', label: 'Preguntar a la IA', icon: 'ai-generate' }],
  onAction: function (accion, texto) { hacer(accion, texto); }
}, contenido)
```

«copiar» copia sola, si no le pasas `onSelect`.

### Propiedades

| Propiedad | Tipo | Uso |
|---|---|---|
| `children` | contenido | El texto que se puede seleccionar. |
| `items` | `[{ value, label, icon, onSelect }]` | Las acciones. Por defecto, «Copiar». |
| `onAction` | `(value, texto) => void` | Recibe la acción y el texto seleccionado. |
| `label` | texto | El nombre de la barra. |

## Accesibilidad

### Qué ofrece ALMA

- **Es una barra de herramientas con nombre.**
- **Aparece también al seleccionar con el teclado** (Mayúsculas + flechas).
- **Esc la cierra.**

### En tus manos

- **Pon las mismas acciones en otro lugar.** Seleccionar texto es difícil o imposible para algunas personas, y un lector de pantalla no anuncia que la barra apareció.
- No tapes con la barra el texto seleccionado.

Pendiente: VoiceOver y NVDA.
