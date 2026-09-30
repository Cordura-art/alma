---
component: DatePicker
tab: Accesibilidad
summary: Qué resuelve ALMA en el selector de fecha.
---


## Qué ofrece ALMA

- El botón se llama «Elegir fecha», o «Cambiar fecha, martes, 31 de marzo de 2026» si ya hay una.
- El calendario es un diálogo (`role="dialog"`) con una grilla (`role="grid"`), nombrados por el mes.
- Cada día se anuncia completo («martes, 31 de marzo de 2026»); hoy lleva `aria-current="date"` y los fuera de rango, `aria-disabled`.
- «Mes anterior» y «Mes siguiente» tienen nombre.
- Al cerrar, el foco vuelve al botón del calendario.

### Interacciones de teclado (en el calendario)

| Tecla | Acción |
|---|---|
| ← / → | Día anterior o siguiente. |
| ↑ / ↓ | El mismo día de la semana anterior o siguiente. |
| Inicio / Fin | Inicio y fin de la semana. |
| Re Pág / Av Pág | Mes anterior o siguiente. |
| Mayús + Re Pág / Av Pág | Año anterior o siguiente. |
| Enter | Elige el día. |
| Esc | Cierra sin cambiar. |

## Recomendaciones de diseño

- Escribir la fecha siempre funciona: nadie está obligado a usar el calendario.

## Verificación

axe sin problemas en los cuatro temas con el calendario abierto; teclado probado. Pendiente: VoiceOver y NVDA.
