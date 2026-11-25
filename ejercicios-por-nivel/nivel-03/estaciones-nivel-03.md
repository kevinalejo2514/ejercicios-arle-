# Nivel 03 · ¿Por qué usar servicios? (Hojas 24 a 33)

## Apertura · Recuerda sin mirar (Hoja 24)
- **¿Por qué el estado de un servicio va en una señal privada?**
  - Para que nadie desde afuera del servicio pueda modificarlo directamente y todo cambio pase de forma controlada por los métodos del servicio.

---

## E01 · ¿Sabías que? · Reto flash (Hoja 25)
1. **Tablero de turnos y caja de la cafetería:** Son dos partes vecinas e independientes que no están una dentro de la otra.
2. **¿Cómo sabe el tablero qué número llamó la caja?** Ambos están conectados a un mismo registro central de turnos: la caja avanza el número y el tablero lee ese mismo número.
3. **¿Quién guarda el número y quién solo lo lee?** El servicio `Turno` guarda y actualiza el número; el componente `Pantalla` solo lo lee, y `Caja` pide avanzar al siguiente.

---

## E02 · Explicación breve: cuatro razones para un servicio (Hoja 25)
- **Paso 1 · Resumen en una frase:** Un servicio sirve para compartir estado entre componentes vecinos, no repetir cálculos (DRY), separar responsabilidades entre dibujar y calcular, y probar la lógica sin pantalla con `TestBed.inject()` y Vitest.
- **Paso 2 · Duda para preguntar:** ¿Qué diferencia hay entre escribir `new Carrito()` y escribir `providers: [Carrito]` en un componente?

---

## E03 · Código ejemplo: Predice antes de ejecutar (Hoja 26)
- **Archivos de código:** `menu/menu.ts`, `menu/menu.html`, `encabezado/encabezado.ts`, `encabezado/encabezado.html`, `app.html`.
1. **Si pulsas «Agregar» en los tres productos, ¿qué número muestra el encabezado?**
   - Muestra `Carrito: 3`.
2. **Si en `encabezado.ts` cambias `inject(Carrito)` por `new Carrito()`, ¿el encabezado seguirá cambiando? ¿Por qué?**
   - No seguirá cambiando (quedará siempre en `0`), porque `new Carrito()` crea otra instancia distinta e independiente de la que recibe `Menu` con `inject(Carrito)`.

---

## E05 · Pregunta a la IA por partes del código (Hoja 27)
- **P1 (Componentes hermanos):** Comparten datos inyectando ambos el mismo servicio con `inject()`, sin necesidad de pasar los datos por el componente padre `App`.
- **P2 (Separar responsabilidades):** El componente se encarga de dibujar la pantalla y escuchar clics, mientras el servicio guarda los datos y hace los cálculos (por ejemplo, un reproductor donde la barra muestra el nombre de la canción y el servicio controla la lista de reproducción).
- **P3 (`TestBed.inject()`):** Solicita la instancia del servicio al entorno de pruebas de Angular para comprobar sus métodos y señales directamente en milisegundos sin abrir el navegador.

| Parte del código | Qué dijo la IA (en tus palabras) | ¿Coincide con la anatomía? | ¿Cómo lo comprobaste? |
| :--- | :--- | :--- | :--- |
| Componentes hermanos | Dos componentes vecinos leen y cambian el mismo estado pidiendo el mismo servicio. | Sí | Comparando con las filas 3, 6 y 8 de E04 en `<app-encabezado />` y `<app-menu />`. |
| Separar responsabilidades | El componente muestra y responde a clics; el servicio guarda y calcula. | Sí | Comparando con las filas 4 y 5 de E04 (`Encabezado` sin estado propio). |
| `TestBed.inject()` | Entrega el servicio en una prueba unitaria sin renderizar pantallas. | Sí | Ejecutando `turno.spec.ts` con Vitest. |

---

## E06 · Buenas prácticas (Hoja 28)
1. **¿Qué otro dato de Pídelo U necesitan ver dos pantallas a la vez? ¿En qué servicio iría?**
   - El **turno actual** de atención (lo necesitan ver `Caja` y `Pantalla`), e iría en el servicio `Turno`; o la cantidad de favoritos marcados, que iría en el servicio `Favoritos`.
2. **Escriban una prueba en palabras: «Si agrego…, espero que…»:**
   - «Si agrego una empanada al servicio `Carrito`, espero que `carrito.cantidad()` sea `1` y `carrito.total()` sea `2500`.»

---

## E07 · El caso: el menú y la caja no decían lo mismo (Hoja 28)
- **Problema:** Con el descuento de `$500` del combo, el menú decía `$6000` y la caja cobraba `$5500`.
- **Causa:** El cálculo del total estaba repetido en tres componentes (menú, resumen y caja) y Mateo olvidó programar el descuento en el menú.
- **Unión de fichas:**
  - **CÁLCULOS (3):** El mismo total se calculaba por separado en tres pantallas.
  - **DIFERENCIA ($500):** Diferencia del descuento entre los `$6000` del menú y los `$5500` de la caja.
  - **TOTAL (1):** `1` único `computed` en el servicio `Carrito` leído por las tres pantallas.
  - **PRUEBA (1,18 s):** Tiempo en que Vitest comprueba automáticamente el servicio sin abrir pantalla.

---

## E08 · Tips de diseño · Reto de diseño (Hoja 29)

| Dato compartido | ¿Qué pantallas lo muestran? | ¿Dónde y cómo se ve? |
| :--- | :--- | :--- |
| **Cantidad en el carrito** | `Encabezado`, `Menú` y `Resumen`. | En el mismo sitio superior derecho del encabezado (`Carrito: N`), siempre con la misma palabra. |
| **Total del pedido** | `Resumen` (y pantalla de pago/caja). | Al final de la lista de productos como `Total: $N`, siempre visible. |
| **Turno actual** | `Pantalla` (tablero de turnos) y `Caja`. | En grande como título `Turno N` en el tablero y junto al botón `Llamar siguiente` en caja. |

---

## E09 · Misión guiada: el tablero de turnos (Hojas 30 y 31)
- **Archivos resueltos:** `servicios/turno.ts`, `servicios/turno.spec.ts`, `pantalla/pantalla.ts`, `pantalla/pantalla.html`, `caja/caja.ts`, `caja/caja.html`.
- **Paso 6 · Rompe a propósito:**

| Cambio a propósito | ¿Qué pasó en pantalla o en la prueba? | ¿Por qué? |
| :--- | :--- | :--- |
| `providers: [Turno]` en `caja.ts` | Al pulsar «Llamar siguiente», la pantalla se queda en «Turno 1». | `providers: [Turno]` crea otra instancia exclusiva para `Caja`, rompiendo el estado compartido con `Pantalla`. |
| `new Turno()` en `pantalla.ts` | La pantalla se queda en «Turno 1» sin enterarse de los clics en `Caja`. | `new Turno()` crea manualmente un objeto aparte en vez de pedir a Angular la instancia compartida con `inject(Turno)`. |
| `toBe(3)` en el segundo `expect` | La prueba falla con `AssertionError: expected 2 to be 3`. | El turno empieza en `1` y tras llamar una sola vez a `turno.siguiente()` vale `2`, no `3`. |

---

## E10 · Comodines (Hoja 32)
- **Quitar opciones (P2):** Tachamos `@Service()` y `carrito.cantidad()`.
- **Usar pista (P4):** Pista usada en `P4` (filas 4 a 7 de la anatomía E04).

---

## E11 · Preguntas de evaluación y Reto bonus (Hoja 32)
- **P1:** `Que dos componentes no anidados compartan el mismo estado.`
- **P2:** `new Carrito()`
- **P3:** **V (Verdadero).** `TestBed.inject()` permite obtener y probar la lógica y las señales del servicio directamente con Vitest sin necesidad de montar componentes ni abrir el navegador.
- **P4 (Orden correcto):**
  1. `[1]` Clic en el botón del menú
  2. `[2]` El menú llama a `carrito.agregar(p)`
  3. `[3]` El servicio actualiza su señal
  4. `[4]` `computed` recalcula la cantidad
  5. `[5]` El encabezado muestra el número nuevo
- **P5:** Significa que el valor real obtenido fue `2`, pero la prueba esperaba (`toBe`) que fuera `3`.
- **P6:** En una app de pedidos como Pídelo U (o cualquier tienda), el encabezado y el resumen comparten los productos elegidos; crearía el servicio `Carrito` que guardaría la lista privada de productos, la cantidad y el total.

### Reto bonus · Caza el error (`menu.ts`)
1. **¿Qué línea causa el problema?** La línea 7: `providers: [Carrito],`.
2. **¿Por qué el encabezado no se entera?** Porque `providers: [Carrito]` le ordena a Angular crear una instancia nueva y propia de `Carrito` solo para `Menu`, distinta de la instancia raíz que lee `Encabezado`.
3. **Cómo debe quedar el decorador:**
   ```ts
   @Component({
     imports: [],
     selector: 'app-menu',
     styleUrl: './menu.css',
     templateUrl: './menu.html',
   })
   ```

---

## E12 · Tendencias 2026 (Hoja 33)
- **Cifra elegida y práctica unida a la misión:** Cada `ng g s` genera su archivo `.spec.ts` listo para ejecutarse en Vitest (corredor por defecto desde v21, que corre pruebas como la del carrito o `turno.spec.ts` en ~1,18 s).
- **Postura:** Escribir pruebas es un ahorro de tiempo, porque comprueba en poco más de un segundo que cálculos críticos (como turnos, cantidades o descuentos) no se rompan antes de publicar.

---

## E13 · ¿Qué diría un diseñador front? (Hoja 33)
1. **Frase de Nathan Curtis aplicada a Pídelo U:** Igual que un sistema de diseño sirve reglas visuales comunes a varias pantallas, un servicio como `Carrito` o `Turno` sirve un único estado y cálculo confiable a todos los componentes vecinos.
2. **Lupa del diseñador:**
   - *El contador del carrito se ve igual en todas las pantallas:* **Sí** — `Encabezado` muestra `Carrito: {{ carrito.cantidad() }}` en un único lugar fijo.
   - *Cada cambio muestra una confirmación:* **Sí** — el contador y el turno cambian al instante tras cada clic.
   - *Lo que se repite está siempre en el mismo lugar:* **Sí** — el encabezado permanece arriba del menú.
3. **Si cada pantalla calcula el total a su manera, ¿qué diría un diseñador front?** Que destruye la coherencia de la experiencia de usuario al mostrar importes contradictorios durante el mismo pedido.
- **Explícalo en 60 segundos:** En el caso, el menú y la caja cobraban distinto porque cada pantalla tenía su propia fórmula para el total y olvidaron poner el descuento en una; al llevar el cálculo a un solo `computed` dentro del servicio `Carrito` y respaldarlo con una prueba en Vitest, todas las pantallas muestran siempre el mismo valor.
