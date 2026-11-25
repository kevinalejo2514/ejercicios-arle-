# Nivel 05 · `output()`: avisos que salen (Hojas 44 a 53)

## Apertura · Recuerda sin mirar (Hoja 44)
- **¿Cómo pasa el padre un dato a una entrada del hijo? Escribe un ejemplo:**
  - Usando enlace de propiedad con corchetes `[nombre]="valor"` en la plantilla del padre. Ejemplo: `<app-producto-card [producto]="p" />`.

---

## E01 · ¿Sabías que? · Reto flash (Hoja 45)
1. **El timbre que suena cuando un pedido está listo:** Avisa que ocurrió una acción sin saber quién lo escuchará.
2. **¿Quién lo toca y quién reacciona?** El componente hijo toca el timbre (`emit()`); el componente padre escucha el evento `(evento)` y reacciona.
3. **¿Qué dato debería viajar con el aviso?** El producto (`Producto`) al agregar, o el `id` (`number`) al quitar un producto del pedido.

---

## E02 · Explicación breve: los avisos suben por las salidas (Hoja 45)
- **Paso 1 · Resumen en una frase:** Una salida declarada con `output()` permite que el componente hijo dispare un evento propio con `emit(dato)` para que el padre lo escuche con `(evento)="metodo($event)"` y decida qué hacer.
- **Paso 2 · Duda para preguntar:** ¿Por qué un evento propio de `output()` no sube automáticamente hasta `App` si el padre directo no lo escucha?

---

## E03 · Código ejemplo: Predice antes de ejecutar (Hoja 46)
- **Archivos de código:** `producto-card/producto-card.ts`, `producto-card/producto-card.html`, `menu/menu.ts`, `menu/menu.html`.
1. **Si la tarjeta emitiera `this.producto().nombre`, ¿compilaría? ¿Por qué?**
   - No compilaría (error `TS2345`), porque `agregar` fue declarada como `output<Producto>()` y `nombre` es un `string`, no un `Producto`.
2. **Si dos tarjetas distintas emiten `agregar`, ¿cómo sabe el menú qué producto agregar?**
   - Porque cada tarjeta emite `this.producto()` en su propia llamada `this.agregar.emit(this.producto())`, y el menú recibe ese objeto específico dentro de `$event`.

---

## E05 · Pregunta a la IA por partes del código (Hoja 47)
- **P1 (`(click)` vs. `(agregar)`):** `(click)` es un evento nativo del DOM disparado por el navegador al hacer clic, mientras `(agregar)` es una salida personalizada (`output()`) declarada por el componente hijo `ProductoCard`.
- **P2 (`$event`):** Es la variable especial de Angular en la plantilla que contiene el dato exacto enviado por `emit(...)` cuando se escucha una salida propia (aquí, el objeto `Producto` o el `id`).
- **P3 (Tarjeta sin servicio):** Al no inyectar `Carrito`, `ProductoCard` queda desacoplada y puede reutilizarse en distintas pantallas (menú, favoritos, etc.) dejando que cada padre decida qué servicio llamar.

| Parte del código | Qué dijo la IA (en tus palabras) | ¿Coincide con la anatomía? | ¿Cómo lo comprobaste? |
| :--- | :--- | :--- | :--- |
| `(click)` y `(agregar)` | `(click)` es evento del DOM; `(agregar)` escucha la salida del hijo. | Sí | Comparando con las filas 4 y 8 de E04. |
| `$event` | Transporta el dato emitido por `emit()` hacia el método del padre. | Sí | Comparando con la fila 8 de E04 y probando quitar `$event` (`TS2554`). |
| Tarjeta sin servicio | El hijo solo avisa; el padre decide qué servicio actualizar. | Sí | Comparando con la fila 5 de E04 (`inject(Carrito)` en `Menu`). |

---

## E06 · Buenas prácticas (Hoja 48)
1. **¿Qué otra salida le pondrían a la tarjeta? Nombre y tipo de dato que llevaría:**
   - `readonly marcarFavorito = output<number>();` (llevaría el `id` del producto como `number`, o `Producto`).
2. **¿Cuándo usarían `output()` y cuándo un servicio para comunicar dos componentes?**
   - **`output()`:** cuando la comunicación va de un componente hijo directo hacia su componente padre (aviso de interacción).
   - **Servicio (`@Service()`):** cuando dos o más componentes hermanos/vecinos o pantallas distintas necesitan compartir el mismo estado.

---

## E07 · El caso: la tarjeta que hacía de todo (Hoja 48)
- **Problema:** Al usar `ProductoCard` en la pantalla de favoritos, cada clic agregaba productos al carrito en lugar de marcarlos como favoritos.
- **Causa:** Andrés inyectó `Carrito` directamente dentro de `ProductoCard`, atando la tarjeta a una sola acción.
- **Unión de fichas:**
  - **USOS (2):** `2` pantallas usando la misma tarjeta (`Menú` y `Favoritos`).
  - **ERROR (1):** Favorito que terminaba agregado en el carrito por error.
  - **SALIDA (1):** `1` salida `output<Producto>()` llamada `agregar` en la tarjeta.
  - **SERVICIOS (0):** `0` servicios inyectados en la tarjeta nueva.

---

## E08 · Tips de diseño · Reto de diseño (Hoja 49)

| Momento | ¿Qué ve la persona? | ¿Qué evento o dato lo provoca? |
| :--- | :--- | :--- |
| **Antes del clic** | Botón `Agregar` con estado interactivo claro y tamaño mínimo `24x24 px`. | Renderizado inicial de `ProductoCard` con `[producto]`. |
| **Justo después del clic** | Respuesta inmediata (`<= 0,1 s`), contador del carrito actualizado y anunciado (`aria-live="polite"`), más confirmación tipo «Agregaste empanada · Deshacer». | `(click)="pedir()"` → `agregar.emit(producto)` → `(agregar)="agregarAlCarrito($event)"` → `carrito.agregar()`. |
| **Si algo falla** | Mensaje de error en palabras simples explicando qué pasó y cómo reintentar («No se pudo agregar: reintenta»). | Falla al procesar la acción en el padre/servicio. |

---

## E09 · Misión guiada: quitar del pedido (`ItemPedido`) (Hojas 50 y 51)
- **Archivos resueltos:** `servicios/carrito.ts` (método `quitar`), `item-pedido/item-pedido.ts`, `item-pedido/item-pedido.html`, `resumen/resumen.ts`, `resumen/resumen.html`.
- **Paso 6 · Rompe a propósito:**

| Cambio a propósito | ¿Qué mensaje o qué pasó? | ¿Por qué? |
| :--- | :--- | :--- |
| Escribir `(quitarr)` con doble `r` | No compila: `TS2345: Argument of type 'Event' is not assignable to parameter of type 'number'`. | `(quitarr)` no coincide con ninguna salida de `ItemPedido`; Angular lo trata como evento DOM y `$event` pasa a ser `Event` en lugar de `number`. |
| Emitir el producto en vez del `id` | No compila: `TS2345: Argument of type 'Producto' is not assignable to parameter of type 'number'`. | La salida `quitar` fue declarada como `output<number>()`, por lo que `emit()` solo acepta un `number`. |
| Inyectar `Carrito` en `ItemPedido` | Compila y funciona, pero rompe la separación de responsabilidades. | `ItemPedido` queda atado al servicio `Carrito` y deja de ser una pieza reutilizable que solo avisa a su padre. |

---

## E10 · Comodines (Hoja 52)
- **Quitar opciones (P2):** Tachamos `El clic del mouse` y `undefined`.
- **Usar pista (P5):** Pista usada en `P5` (tercer párrafo de E02: en `$event` llega el producto emitido).

---

## E11 · Preguntas de evaluación y Reto bonus (Hoja 52)
- **P1:** `Para avisar al padre que algo pasó, con un dato.`
- **P2:** `El producto emitido`
- **P3:** **F (Falso).** Los eventos propios de Angular creados con `output()` no hacen burbujeo por el DOM; solo los oye el componente padre directo que escribe `(evento)` en su plantilla.
- **P4 (Orden correcto):**
  1. `[1]` Clic en el botón de la tarjeta
  2. `[2]` `pedir()` llama a `emit(producto)`
  3. `[3]` El menú recibe `(agregar)` con `$event`
  4. `[4]` El menú llama a `carrito.agregar()`
  5. `[5]` El encabezado muestra el número nuevo
- **P5:** Como `(agregarr)` no existe como `output()` del hijo, Angular lo interpreta como un evento estándar del DOM donde `$event` es de tipo `Event`, el cual no es asignable al parámetro de tipo `Producto`.
- **P6:**
  - **`output()`:** para que un hijo avise a su padre directo (ej. `ItemPedido` avisa a `Resumen` con `(quitar)` que el usuario pulsó «Quitar»).
  - **Servicio:** para compartir un mismo estado entre componentes hermanos o pantallas separadas (ej. `Menu` y `Encabezado` comparten el servicio `Carrito`).

### Reto bonus · Caza el error (`menu.html`)
1. **¿Qué falta en la línea 6?** Falta pasar `$event` como argumento: `(agregar)="agregarAlCarrito($event)"`.
2. **¿Qué dato trae lo que falta y de dónde viene?** Trae el `Producto` emitido por la tarjeta hija `ProductoCard` mediante `this.agregar.emit(this.producto())`.
3. **Línea corregida:**
   ```html
   (agregar)="agregarAlCarrito($event)"
   ```

---

## E12 · Tendencias 2026 (Hoja 53)
- **Cifra elegida y práctica unida a la misión:** El `84 %` usa o planea usar IA para programar, pero el `45 %` se frustra depurando código generado por IA; por eso Angular publicó *Agent Skills* para escribir Angular moderno (`output()`, `input()`, `@Service()`, `inject()`) y evitar el antiguo `@Output() + EventEmitter`.
- **Postura:** Se entiende mejor equilibrar ambos: pocas salidas claras entre padre e hijo para avisar acciones de UI, y servicios específicos para el estado compartido de la aplicación.

---

## E13 · ¿Qué diría un diseñador front? (Hoja 53)
1. **Frase de Jef Raskin («Para el cliente, la interfaz es el producto») aplicada a Pídelo U:** Si el botón «Agregar» o «Quitar» en pantalla responde al instante y actualiza el contador del encabezado, el estudiante confía en que su pedido está funcionando.
2. **Lupa del diseñador:**
   - *Cada botón cambia de estado al tocarlo:* **Sí** — botón con tamaño accesible (`>= 24x24 px`) y cursor/estado claro.
   - *El contador del carrito confirma la acción:* **Sí** — el encabezado actualiza `Carrito: {{ carrito.cantidad() }}` con `aria-live="polite"`.
   - *Si algo falla, el mensaje dice cómo arreglarlo:* **Sí** — la guía define mensajes simples con acción de reintento.
3. **Si «Agregar» no responde al tocarlo, ¿qué diría un diseñador front?** Que la interfaz está rota para el cliente, porque no hay retroalimentación ni confirmación de la acción.
- **Explícalo en 60 segundos:** Al hacer clic en «Agregar» dentro de `ProductoCard`, `pedir()` dispara `this.agregar.emit(this.producto())`; el padre `Menu` escucha `(agregar)="agregarAlCarrito($event)"`, llama a `this.carrito.agregar(producto)`, la señal `items` se actualiza con `update()`, el `computed` `cantidad` se recalcula y `Encabezado` muestra el nuevo número al instante.
