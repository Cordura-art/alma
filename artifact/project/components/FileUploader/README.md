# FileUploader

Subir uno o varios archivos, con un botón o una zona para arrastrar.


## Uso

### Resumen

`FileUploader` deja elegir o arrastrar archivos y muestra cada uno con su estado. Sigue el *file uploader* de Carbon. La subida real la hace tu código; el componente muestra el estado.

#### Cuándo usarlo
- Adjuntar documentos: el carnet, una boleta, fotos.

#### Cuándo no usarlo
- **En un modal, con varios archivos:** la lista crece hacia abajo; usa una página.

### Tipos

| Tipo | Propiedad | Uso |
|---|---|---|
| Botón | por defecto | «Agregar archivos», `tinted` para no competir con la acción principal. |
| Zona | `dropZone` | Zona punteada para arrastrar o hacer clic. |

### Anatomía

1. **Título**: para qué es la carga.
2. **Descripción**: formatos y tamaño.
3. **Botón** o **zona**.
4. **Lista de archivos**, cada uno con su estado y Quitar.

![FileUploader con su zona para arrastrar y una lista con un archivo subido, uno subiendo y uno con error.](assets/Componentes/file-uploader-lista.png)

### Estados de cada archivo

| Estado | Aspecto | Quitar |
|---|---|---|
| `uploading` | `ActivityIndicator` | No, mientras sube. |
| `complete` | Check verde | Sí. |
| `error` | Borde e ícono rojos y un mensaje | Sí. |

### Contenido

- **Título:** «Carnet de identidad».
- **Descripción:** «PDF o JPG, hasta 5 MB».
- **Zona:** «Arrastra tus archivos aquí o haz clic para elegirlos».
- **Error:** qué pasó y qué hacer: «El archivo pesa 8 MB. Sube uno de hasta 5 MB».
- Los nombres largos se recortan en el medio; el completo aparece al pasar el cursor.

### Relacionados

`Button` · `ProgressBar` · `ActivityIndicator` · Formularios.

### Referencias

- IBM, Carbon Design System: File uploader.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Título | color del texto | `text-01` |
| Descripción | color del texto | `text-02` |
| Zona | borde (1 px, punteado) | `file-uploader-border` |
| Zona:hover o al arrastrar | borde (sólido) / fondo | `file-uploader-border-hover` / `file-uploader-bg-hover` |
| Zona | color del texto | `text-02` (`text-01` al pasar el cursor) |
| Zona:focus | contorno | `focus` (2 px, separado 2 px) |
| Archivo | fondo | `file-uploader-file-bg` |
| Archivo con error | borde | `file-uploader-file-border-error` |
| Check | color | `status-icon-success` |
| Ícono de error | color | `status-icon-error` |
| Mensaje de error | color del texto | `text-error` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 14 / 0,875 | `font-weight-heading` |
| Descripción y error | 12 / 0,75 | `font-weight-body` |
| Zona y nombre del archivo | 14 / 0,875 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Cargador | ancho máximo | 480 px (30 rem) |
| Zona | alto mínimo, relleno | 128 px, 24 px |
| Zona | radio | `radius-panel` |
| Ícono de la zona | tamaño | 32 px (`upload`) |
| Archivo | alto mínimo, radio | 44 px, `radius-tag` |
| Archivos | separación | 8 px |

![Medidas de FileUploader: alto de la zona, borde punteado y radio, alto de cada archivo y separación entre archivos.](assets/Componentes/file-uploader-medidas.png)

### Movimiento

El borde de la zona cambia en `duration-fast-02`.

### Contraste

Textos a 4,5:1; borde de la zona a 3:1, en los cuatro temas.

## Código

### Uso

```js
const { FileUploader } = window.AlmaDS;
const [files, setFiles] = React.useState([]);
h(FileUploader, { title: 'Carnet de identidad', description: 'PDF o JPG, hasta 5 MB', dropZone: true, accept: '.pdf,.jpg',
  files,
  onAdd: (nuevos) => { setFiles(f => f.concat(nuevos.map(x => ({ id: x.name, name: x.name, status: 'uploading' })))); subir(nuevos); },
  onRemove: (f) => setFiles(fs => fs.filter(x => x.id !== f.id)) })
```

Al terminar cada subida, cambia su `status` a `'complete'` o a `'error'` con su `error`.

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | `string` | `'Subir archivos'` | Para qué es. |
| `description` | `string` | — | Formatos y tamaño. |
| `buttonLabel` / `buttonVariant` | `string` | `'Agregar archivos'` / `'tinted'` | El botón. |
| `dropZone` / `dropLabel` | `boolean` / `string` | `false` | La zona. |
| `multiple` / `accept` | `boolean` / `string` | — | Como en `<input type="file">`. |
| `files` | `Array<{ id, name, status, error }>` | `[]` | Los archivos. |
| `onAdd` / `onRemove` | `(files) => void` / `(file) => void` | — | — |
| `disabled` | `boolean` | `false` | — |

## Accesibilidad

### Qué ofrece ALMA

- El botón y la zona son botones reales: se activan con Enter o Espacio, no solo arrastrando.
- La descripción (formatos y tamaño) queda unida al botón o a la zona con `aria-describedby`.
- La lista se nombra con el título.
- Cada archivo dice su estado: «Subiendo …», «Subido» o su error.
- Quitar se llama «Quitar» más el nombre del archivo.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega al botón o a la zona, y luego a cada Quitar. |
| Enter o Espacio | Abre el selector de archivos, o quita. |

### Recomendaciones de diseño

- Arrastrar nunca es la única forma: la zona también se puede activar.

### Consideraciones de desarrollo

- Al quitar un archivo con el teclado, lleva el foco al siguiente Quitar, o al botón si no quedan.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
