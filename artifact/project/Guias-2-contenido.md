# Contenido

Cómo escribe ALMA: voz, estilo, etiquetas de acción y formatos de Chile.


## Voz y tono

### La voz

- Español neutro, de tú, con los formatos de Chile.
- Frases cortas. Una idea por frase.
- Directa y cercana. Sin tecnicismos, sin exageraciones.
- La voz es siempre la misma; el tono se ajusta al momento.

### El tono según el momento

| Momento | Tono | Ejemplo |
|---|---|---|
| Una tarea | Directo | «Elige tu asiento.» |
| Un error | Calmado, sin culpas | «No pudimos cobrar tu pasaje. Revisa la tarjeta o usa otra.» |
| Un logro | Cálido, breve | «Listo. Tu pasaje está en tu billetera.» |
| Algo salió mal y es serio | Sobrio, sin chistes | «Tu viaje fue cancelado por la empresa. Te devolvimos $7.000.» |

### No

- Sin signos de exclamación en errores.
- Sin «inválido», «ilegal», «fallo fatal».
- Sin emoji en la interfaz.
- La marca en inglés se escribe como en su perfil: «We are a motion languages studio».

## Estilo de escritura

### Mayúsculas

- Solo al inicio y en nombres propios, también en títulos y botones: «Mis viajes», no «Mis Viajes».

### Puntuación

- Títulos, botones y etiquetas, sin punto final.
- Mensajes y descripciones en oraciones completas, con punto.
- Puntos suspensivos (…) en lo que está en curso («Pagando…») y en opciones que piden más datos («Personalizado…»).

### Errores

- Qué pasó y cómo seguir, en ese orden: «No se pudo conectar. Revisa tu conexión y vuelve a intentarlo.»
- En campos, la ayuda dice la regla antes («Mínimo 4 caracteres») y el error dice cómo arreglarlo («Escribe un correo con @»).
- Los códigos técnicos al final y solo si ayudan al soporte: «(código 504)».

### Estados vacíos

Título con lo que falta, una frase con el porqué y una acción. Ver el patrón **Estados vacíos**.

### Números

- Con cifras, no con letras: «3 viajes».
- Montos siempre con su símbolo: «$7.000».

## Etiquetas de acción

### Reglas

- **Verbo primero**, que diga lo que pasa: «Pagar $7.000», «Eliminar tarjeta», «Ver proyecto».
- Nunca «Sí», «OK» ni «Aceptar» cuando hay algo más preciso.
- En diálogos de confirmación, el botón repite el verbo del título: «¿Eliminar la tarjeta?» → «Eliminar» y «Cancelar».
- Mientras carga, el botón dice qué hace: «Pagando…», «Guardando…».
- Enlaces con texto que se entienda solo: «Ver condiciones del pasaje», nunca «Haz clic aquí».

### Palabras de ALMA

| Acción | Usa | Evita |
|---|---|---|
| Crear algo nuevo | Crear, Agregar | Nuevo (solo) |
| Guardar cambios | Guardar | Aplicar, OK |
| Quitar de una lista, se puede recuperar | Quitar | Borrar |
| Borrar para siempre | Eliminar | Quitar |
| Cerrar sin guardar | Cancelar | Volver, No |
| Cerrar algo informativo | Cerrar | OK |
| Ir a más detalle | Ver … | Más, Clic aquí |
| Volver a intentar | Reintentar | Intentar de nuevo |

## Formatos

### Formatos de Chile (`es-CL`)

Usa siempre `Intl` con `'es-CL'`; no armes los formatos a mano.

| Dato | Formato | Cómo |
|---|---|---|
| Moneda | $7.000 (sin decimales) | `new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })` |
| Números | 1.234,5 | `n.toLocaleString('es-CL')` |
| Porcentaje | 25% | `{ style: 'percent' }` |
| Fecha corta | 31 mar 2026 | `{ day: '2-digit', month: 'short', year: 'numeric' }` |
| Fecha larga | martes, 31 de marzo de 2026 | `{ dateStyle: 'full' }` |
| Hora | 14:30 (24 horas) | `{ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }` |
| RUT | 12.345.678-5 | Con puntos y guion; el dígito verificador en mayúscula (K). |
| Teléfono | +56 9 1234 5678 | Código de país, luego grupos de 1, 4 y 4. |

- Fechas relativas solo para lo reciente («hace 5 minutos», «ayer»); después, fecha exacta. Usa `Intl.RelativeTimeFormat('es-CL')`.
- Sin `hourCycle`, la hora sale como «02:30 p. m.».
- En tablas, números y montos alineados a la derecha con cifras tabulares.
