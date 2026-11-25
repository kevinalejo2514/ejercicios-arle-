# Nivel 02 · Estructura de un servicio (Hojas 14 a 23)

## Apertura · Recuerda sin mirar (Hoja 14)
- **¿Con qué función pide un componente un servicio y en qué parte de la clase se escribe?**
  - Con la función `inject()`, y se escribe al declarar una propiedad de la clase (por ejemplo: `private readonly catalogo = inject(Catalogo);`).

---

## E01 · ¿Sabías que? · Reto flash (Hoja 15)
1. **¿Qué datos guarda la caja de la cafetería?**
   - Los productos pedidos, la cantidad de productos y el total a pagar.
2. **Lo que cualquiera puede ver vs. lo que solo la cajera puede cambiar:**
   - Cualquiera puede consultar la lista, la cantidad y el total; solo la cajera (el propio servicio) puede modificar la lista interna.
3. **Dos acciones que cambian esos datos:**
   - Agregar un producto al pedido y vaciar el pedido.

---

## E02 · Explicación breve: cuatro partes, cada una en su lugar (Hoja 15)
- **Paso 1 · Resumen en una frase:** Un servicio bien estructurado tiene `@Service()` para registrarlo, una `signal` privada para guardar el estado, lecturas públicas con `asReadonly()` y `computed`, y métodos que cambian el estado con `set()` o `update()`.
- **Paso 2 · Duda para preguntar:** ¿Por qué usar `push()` dentro de un arreglo de una señal no actualiza la pantalla?

---

## E03 · Código ejemplo: Predice antes de ejecutar (Hoja 16)
- **Archivos de código:** `servicios/carrito.ts`, `resumen/resumen.ts`, `resumen/resumen.html`.
1. **Si pulsas «+ Arepa con queso» y luego «Vaciar», ¿qué texto exacto muestra el párrafo?**
   - Muestra exactamente: `0 productos · $0`.
2. **Si un componente intenta escribir `carrito.items.set([])`, ¿qué crees que pasa al compilar? ¿Por qué?**
   - No compila (error `TS2341`), porque `items` está declarada como `private` y solo es accesible dentro de la clase `Carrito`.

---

## E05 · Pregunta a la IA por partes del código (Hoja 17)
- **P1 (`asReadonly()`):** Como `items` es `private`, ningún componente afuera puede leerla directamente; `asReadonly()` expone una señal pública de solo lectura (`lista`) sin métodos `set()` ni `update()`.
- **P2 (`set()` y `update()`):** `set()` reemplaza el valor por uno nuevo directamente (ej. poner un cronómetro en `0`), mientras `update()` calcula el nuevo valor usando el valor anterior (ej. sumar `1` segundo al tiempo actual).
- **P3 (`computed` perezoso):** Es perezoso porque no ejecuta su cálculo hasta que alguien lo lee por primera vez, y guarda el resultado en caché mientras no cambie la señal de la que depende.

| Parte del código | Qué dijo la IA (en tus palabras) | ¿Coincide con la anatomía? | ¿Cómo lo comprobaste? |
| :--- | :--- | :--- | :--- |
| `asReadonly()` | Publica la señal para leer desde afuera sin permitir modificarla. | Sí | Comparando con la fila 3 de E04 e intentando llamar `lista.set([])` (`TS2339`). |
| `set()` y `update()` | `update()` crea un valor a partir del actual y `set()` pone un valor nuevo de una vez. | Sí | Comparando con las filas 6 y 7 de E04 y probando `agregar()` y `vaciar()`. |
| `computed` | Calcula un valor derivado automáticamente cuando cambia el estado privado. | Sí | Comparando con la fila 4 de E04 y mirando `cantidad()` y `total()` en pantalla. |

---

## E06 · Buenas prácticas (Hoja 18)
1. **¿Qué datos del carrito deberían ser privados y cuáles públicos?**
   - **Privados:** `items` (`private readonly items = signal<Producto[]>([])`).
   - **Públicos:** lecturas `lista` (`asReadonly()`), `cantidad` (`computed`), `total` (`computed`), y los métodos `agregar(producto: Producto)` y `vaciar()`.
2. **¿Qué método le agregarían a `Carrito` para quitar un producto? Nombre y qué recibe:**
   - Nombre: `quitar(id: number): void` — recibe `id: number` (el identificador del producto que se desea quitar).

---

## E07 · El caso: el contador que no se movía (Hoja 18)
- **Problema:** El resumen seguía mostrando «0 productos» tras hacer clic y la pantalla de la caja borró el carrito sin que nadie supiera qué pantalla lo había hecho.
- **Causa:** Mateo usó `push()` sobre el arreglo (la señal no se entera de la mutación) y dejó la señal `items` pública para que cualquiera hiciera `items.set([])`.
- **Unión de fichas:**
  - **CONTADOR (0):** `0 productos` en pantalla tras dos clics por usar `push()`.
  - **SEÑAL (1):** `1` señal pública que cualquier pantalla podía cambiar con `items.set([])`.
  - **PARTES (4):** `4` partes del servicio ordenado: decorador, estado privado, lecturas públicas y métodos.
  - **ARCHIVO (1):** `1` solo archivo (`carrito.ts`) donde buscar cuando algo falla.

---

## E08 · Tips de diseño · Reto de diseño (Hoja 19)

| Estado del pedido | ¿Qué ve la persona? | ¿Qué dato del servicio lo decide? |
| :--- | :--- | :--- |
| **Vacío** | Mensaje claro: «Elige algo del menú» y total `$0`. | `carrito.cantidad() === 0` |
| **Con productos** | Lista de productos con sus precios, el `Total` siempre a la vista y botones `Pagar` / `Vaciar` fáciles de tocar (`>= 24x24 px`). | `carrito.lista()`, `carrito.cantidad() > 0` y `carrito.total()` |
| **Recién vaciado** | Pedido vacío con aviso de confirmación y opción de salida clara («Deshacer»). | Cambio ejecutado por el método del servicio (`vaciar()` / `quitar()`). |

---

## E09 · Misión guiada: el servicio `Favoritos` y `PanelFavoritos` (Hojas 20 y 21)
- **Archivos resueltos:** `servicios/favoritos.ts`, `panel-favoritos/panel-favoritos.ts`, `panel-favoritos/panel-favoritos.html`.
- **Paso 6 · Rompe a propósito:**

| Cambio a propósito | ¿Qué mensaje o qué pasó? | ¿Qué regla rompe? |
| :--- | :--- | :--- |
| `push(id)` en vez de `update` | Compila sin errores, pero al pulsar «Marcar» el título sigue diciendo «Mis favoritos: 0». | Crear un arreglo nuevo con `update()` en lugar de mutar con `push()`. |
| `favoritos.ids.set([])` en el panel | No compila: `TS2341: Property 'ids' is private and only accessible within class 'Favoritos'`. | Regla del estado privado: solo el propio servicio puede tocar su estado. |
| `favoritos.lista.set([])` en el panel | No compila: `TS2339: Property 'set' does not exist on type 'Signal<number[]>'`. | Las lecturas públicas (`asReadonly()`) son de solo lectura; solo los métodos cambian el estado. |

---

## E10 · Comodines (Hoja 22)
- **Quitar opciones (P2):** Tachamos `asReadonly()` y `computed()`.
- **Usar pista (P5):** Pista usada en `P5` (tabla de E02: `private readonly items` solo puede usarla el propio servicio).

---

## E11 · Preguntas de evaluación y Reto bonus (Hoja 22)
- **P1:** `Para que solo los métodos del servicio puedan cambiarla.`
- **P2:** `update()`
- **P3:** **F (Falso).** `push()` modifica el mismo arreglo por dentro sin crear uno nuevo, por lo que la señal no detecta el cambio y ni `computed` ni la pantalla se actualizan.
- **P4 (Relaciona):**
  - `@Service()` → **Lo deja disponible en toda la app**
  - `signal privada` → **Guarda el estado**
  - `asReadonly()` → **Deja leer sin cambiar**
  - `computed` → **Calcula a partir del estado**
- **P5:** Rompe la regla del **estado privado**: un componente externo intenta acceder directamente a la señal privada `items` en vez de usar las lecturas públicas o los métodos del servicio.
- **P6:** Se llamaría `quitar(id: number): void`, recibiría el `id: number` del producto y usaría `update()` para calcular un arreglo nuevo filtrando ese `id` a partir del arreglo anterior.

### Reto bonus · Caza el error (`resumen.ts`)
1. **¿Qué intenta hacer la línea 17?** Intenta vaciar la lista del carrito llamando a `set([])` sobre `this.carrito.lista`.
2. **¿Por qué `lista` no tiene `set()`?** Porque `lista` fue creada con `this.items.asReadonly()`, que devuelve un `Signal<Producto[]>` de solo lectura.
3. **Línea corregida con un método del servicio:**
   ```ts
   this.carrito.vaciar();
   ```

---

## E12 · Tendencias 2026 (Hoja 23)
- **Cifra elegida y práctica unida a la misión:** En Angular `v22`, `OnPush` es la estrategia por defecto y repinta la pantalla cuando cambian las señales que lee, tal como sucede en `Favoritos` y `Carrito` al usar `update()` y `set()`.
- **Postura:** Es preferible un servicio con métodos pequeños y claros (`agregar()`, `vaciar()`, `marcar()`, `limpiar()`), porque cada método expresa una acción concreta de negocio y facilita saber dónde buscar si algo falla.

---

## E13 · ¿Qué diría un diseñador front? (Hoja 23)
1. **Frase de Dieter Rams («Menos, pero mejor») aplicada a Pídelo U:** Exponer solo las lecturas necesarias (`lista`, `cantidad`, `total`) y pocos métodos claros evita errores y muestra en el resumen únicamente los datos que orientan a quien pide.
2. **Lupa del diseñador:**
   - *La pantalla muestra solo los datos que hacen falta:* **Sí** — cantidad, productos y total.
   - *El total del pedido siempre está a la vista:* **Sí** — calculado con `carrito.total()`.
   - *Vaciar el pedido se puede deshacer:* **En parte** — tiene botón `Vaciar` claro y en diseño (E08) se contempla acción de deshacer.
3. **Si cualquier pantalla puede cambiar el estado, ¿qué diría un diseñador front?** Que el usuario perdería sus productos de forma impredecible sin saber qué acción lo causó, arruinando el control sobre la interfaz.
- **Explícalo en 60 segundos:** El contador del caso se quedaba en `0` porque `push()` cambia el mismo arreglo sin avisar a la señal; al ordenar el servicio con una `signal` privada, lecturas públicas (`asReadonly` y `computed`) y métodos que crean un arreglo nuevo con `update()`, la pantalla siempre se entera.
