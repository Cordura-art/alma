# FileUploader

Carga de uno o varios archivos, con un botón o una zona para arrastrar, y la lista de archivos con su estado (el cargador de archivos de IBM Carbon).

## Contenido
- `title`: una línea que diga para qué es la carga.
- `description`: límites de formato y tamaño («PDF o JPG, hasta 5 MB»).
- Botón: «Agregar archivos» con ícono `add`. Es `tinted` para no competir con el primario de la vista.
- Zona (`dropZone`): «Arrastra tus archivos aquí o haz clic para elegirlos». También se activa con teclado.
- Los nombres largos se acortan en el medio y el nombre completo aparece al pasar el cursor.

## Estados de cada archivo
- `uploading`: `ActivityIndicator`; no se puede quitar mientras sube.
- `complete`: check verde y botón para quitar.
- `error`: borde e ícono rojos y un mensaje que dice qué hacer.

## Qué aporta quien lo usa
`files`, `onAdd(files)` y `onRemove(file)`. La subida real la maneja tu código y actualiza el `status` de cada archivo.

## No
No lo pongas en un modal si se suben varios archivos: la lista crece hacia abajo.
