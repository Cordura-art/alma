---
component: FileUploader
tab: Uso
summary: Subir uno o varios archivos, con un botón o una zona para arrastrar.
---


## Resumen

`FileUploader` deja elegir o arrastrar archivos y muestra cada uno con su estado. Sigue el *file uploader* de Carbon. La subida real la hace tu código; el componente muestra el estado.

### Cuándo usarlo
- Adjuntar documentos: el carnet, una boleta, fotos.

### Cuándo no usarlo
- **En un modal, con varios archivos:** la lista crece hacia abajo; usa una página.

## Tipos

| Tipo | Propiedad | Uso |
|---|---|---|
| Botón | por defecto | «Agregar archivos», `tinted` para no competir con la acción principal. |
| Zona | `dropZone` | Zona punteada para arrastrar o hacer clic. |

## Anatomía

1. **Título**: para qué es la carga.
2. **Descripción**: formatos y tamaño.
3. **Botón** o **zona**.
4. **Lista de archivos**, cada uno con su estado y Quitar.

> **Imagen pendiente:** la zona, y una lista con un archivo subiendo, uno subido y uno con error.

## Estados de cada archivo

| Estado | Aspecto | Quitar |
|---|---|---|
| `uploading` | `ActivityIndicator` | No, mientras sube. |
| `complete` | Check verde | Sí. |
| `error` | Borde e ícono rojos y un mensaje | Sí. |

## Contenido

- **Título:** «Carnet de identidad».
- **Descripción:** «PDF o JPG, hasta 5 MB».
- **Zona:** «Arrastra tus archivos aquí o haz clic para elegirlos».
- **Error:** qué pasó y qué hacer: «El archivo pesa 8 MB. Sube uno de hasta 5 MB».
- Los nombres largos se recortan en el medio; el completo aparece al pasar el cursor.

## Relacionados

`Button` · `ProgressBar` · `ActivityIndicator` · Formularios.

## Referencias

- IBM, Carbon Design System: File uploader.
