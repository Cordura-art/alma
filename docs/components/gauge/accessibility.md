---
component: Gauge
tab: Accesibilidad
summary: Lo que Gauge resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Es un medidor** (`role="meter"`) con nombre, valor, mínimo y máximo.
- **El valor se lee como texto:** «32 de 44», no «72 %».
- **El número está siempre a la vista:** nada depende de calcular el largo de una barra.
- **El relleno contrasta 3:1** con su recorrido.
- **El estado va con su palabra**, además del color.

## Teclado

No recibe el foco: informa, no se opera.

## Recomendaciones de diseño

- Rotula los extremos si no son evidentes: sin ellos, «18» no dice si es mucho o poco.
- Si el valor cambia solo, no lo anuncies cada vez. Anuncia cuando cruza algo que importa.
- No uses rojo y verde como única diferencia entre dos medidores.

## Consideraciones de desarrollo

- Pasa `valueLabel` con la unidad dicha en palabras si la abreviatura no se lee bien.
- Con `status`, pasa siempre `statusText` y muéstralo también junto al medidor.

Pendiente: VoiceOver y NVDA.
