---
element: Contenido
order: 2
tab: Formatos
summary: Cómo escribe ALMA: voz, estilo, etiquetas de acción y formatos de Chile.
---

## Formatos de Chile (`es-CL`)

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
