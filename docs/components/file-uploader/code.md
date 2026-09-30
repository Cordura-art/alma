---
component: FileUploader
tab: Código
summary: Cómo usar FileUploader en React.
---


## Uso

```js
const { FileUploader } = window.AlmaDS;
const [files, setFiles] = React.useState([]);
h(FileUploader, { title: 'Carnet de identidad', description: 'PDF o JPG, hasta 5 MB', dropZone: true, accept: '.pdf,.jpg',
  files,
  onAdd: (nuevos) => { setFiles(f => f.concat(nuevos.map(x => ({ id: x.name, name: x.name, status: 'uploading' })))); subir(nuevos); },
  onRemove: (f) => setFiles(fs => fs.filter(x => x.id !== f.id)) })
```

Al terminar cada subida, cambia su `status` a `'complete'` o a `'error'` con su `error`.

## Propiedades

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
