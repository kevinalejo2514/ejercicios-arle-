# Nivel 04 · `input()`: datos que entran (Hojas 34 a 43)

## Apertura · Recuerda sin mirar (Hoja 34)
- **¿Qué pasa si un componente escribe `providers: [Carrito]` en su decorador?**
  - Angular crea una instancia nueva y exclusiva de `Carrito` para ese componente, rompiendo el estado compartido con los demás componentes de la app.

---

## E01 · ¿Sabías que? · Reto flash (Hoja 35)
1. **Etiquetas de precio de la vitrina:** Todas tienen el mismo formato visual, una al lado de la otra.
2. **¿Qué cambia de una etiqueta a otra y qué se repite?**
   - Se repite el diseño y la disposición; cambia el nombre del producto, su precio y si está destacado.
3. **«Entradas» que necesita cada etiqueta:**
   - `producto` (obligatoria) y `destacado` (opcional).

---

## E02 · Explicación breve: los datos bajan por las entradas (Hoja 35)
- **Paso 1 · Resumen en una frase:** Una entrada declarada con `input()` o `input.required()` es una señal de solo lectura que el componente padre llena desde su plantilla con `[entrada]="valor"` y el hijo lee con paréntesis `entrada()`.
- **Paso 2 · Duda para preguntar:** ¿Qué ocurre si el componente hijo intenta modificar el valor de una entrada con `.set()`?

---

## E03 · Código ejemplo: Predice antes de ejecutar (Hoja 36)
- **Archivos de código:** `producto-card/producto-card.ts`, `producto-card/producto-card.html`, `menu/menu.ts`, `menu/menu.html`.
1. **Si cambias `[destacado]="p.id === 2"` por `[destacado]="true"`, ¿cuántas tarjetas dirán «Recomendado»?**
   - Las `3` tarjetas dirán «Recomendado».
2. **Si borras `[producto]="p"` del menú, ¿la app abre con tarjetas vacías o no compila? ¿Por qué?**
   - No compila (error `NG8008` antes de abrir la app), porque `producto` fue declarada con `input.required<Producto>()` y es obligatoria.

---

## E05 · Pregunta a la IA por partes del código (Hoja 37)
- **P1 (`input()` vs. `input.required()`):** `input.required()` obliga al padre a pasar siempre el dato (si falta, falla al compilar con `NG8008`), mientras `input(valor)` es opcional y usa el valor por defecto cuando el padre no lo pasa.
- **P2 (`producto().nombre`):** Porque toda entrada creada con `input()` es una señal de solo lectura (`InputSignal`), y las señales se leen invocándolas con paréntesis `()`.
- **P3 (`[producto]="p"`):** Los corchetes evalúan la variable `p` de TypeScript y entregan el objeto `Producto`; si se quitan (`producto="p"`), pasa literalmente el texto `"p"` como string.

| Parte del código | Qué dijo la IA (en tus palabras) | ¿Coincide con la anatomía? | ¿Cómo lo comprobaste? |
| :--- | :--- | :--- | :--- |
| `input.required()` | Declara una entrada obligatoria que el padre debe enviar para que compile. | Sí | Comparando con la fila 2 de E04 y probando quitar la entrada (`NG8008`). |
| `producto()` | Lee el valor actual de la señal de entrada con paréntesis. | Sí | Comparando con la fila 5 de E04 y viendo el aviso `NG8109` al quitar los paréntesis. |
| `[producto]="p"` | Evalúa la expresión `p` del padre y la entrega a la entrada del hijo. | Sí | Comparando con la fila 8 de E04 en `menu.html`. |

---

## E06 · Buenas prácticas (Hoja 38)
1. **¿Qué entradas le pondrían a una tarjeta de «Combo del día»? Nombre y tipo de cada una:**
   - `nombre`: `input.required<string>()`
   - `precio`: `input.required<number>()`
   - `destacado`: `input(false)` (`boolean`)
2. **¿Cuándo conviene que una entrada sea obligatoria y cuándo opcional?**
   - **Obligatoria (`input.required()`)**: cuando la tarjeta no tiene sentido ni puede mostrarse bien sin ese dato (como `producto` o `dia`).
   - **Opcional (`input(valor)`)**: cuando el dato tiene un caso normal por defecto y solo cambia en algunas tarjetas (como `destacado = input(false)` o `especial = input(false)`).

---

## E07 · El caso: tres tarjetas, una empanada (Hoja 38)
- **Problema:** Salían tres tarjetas idénticas en pantalla que decían «Empanada».
- **Causa:** Mateo hizo que cada `ProductoCard` pidiera `Catalogo` con `inject()` y mostrara siempre el primer producto, porque la tarjeta hija no sabía qué posición le tocaba.
- **Unión de fichas:**
  - **TARJETAS (3):** `3` tarjetas idénticas que decían «Empanada».
  - **ENTRADAS (2):** `2` entradas en la tarjeta corregida: `producto` y `destacado`.
  - **COMPONENTE (1):** `1` sola clase `ProductoCard` reutilizada tres veces.
  - **SERVICIOS (0):** `0` servicios inyectados dentro de `ProductoCard` (el padre pasa el dato).

---

## E08 · Tips de diseño · Reto de diseño (Hoja 39)

| Entrada de la tarjeta | Tipo de dato | ¿Cómo se ve en pantalla? |
| :--- | :--- | :--- |
| `producto` | `Producto` (`input.required<Producto>()`) | Título `<h3>` con el nombre y párrafo `<p>` con `$precio`. |
| `destacado` | `boolean` (`input(false)`) | Clase `.destacado` más etiqueta con texto visible `<span>Recomendado</span>` (no solo color). |
| `agotado` (nueva) | `boolean` (`input(false)`) | Texto visible `<span>Agotado</span>` indicando que no está disponible, sin depender únicamente del color. |

---

## E09 · Misión guiada: el horario de la cafetería (Hojas 40 y 41)
- **Archivos resueltos:** `horario-card/horario-card.ts`, `horario-card/horario-card.html`, `horarios/horarios.ts`, `horarios/horarios.html`.
- **Paso 6 · Rompe a propósito:**

| Cambio a propósito | ¿Qué mensaje o qué pasó? | ¿Por qué? |
| :--- | :--- | :--- |
| Quitar `[cierra]="h.cierra"` | No compila: `NG8008: Required input 'cierra' from component HorarioCard must be specified`. | `cierra` fue declarada con `input.required<string>()` y el padre está obligado a pasarla. |
| Escribir `{{ dia }}` sin paréntesis | Muestra aviso `NG8109` («is a function and should be invoked») y dibuja el texto de la función en lugar del día. | `dia` es una señal (`InputSignal`) y debe leerse con paréntesis `dia()`. |
| `this.especial.set(true)` en un método | No compila: `TS2339: Property 'set' does not exist on type 'InputSignal<boolean>'`. | Las entradas creadas con `input()` son señales de solo lectura; el hijo no puede cambiarlas. |

---

## E10 · Comodines (Hoja 42)
- **Quitar opciones (P2):** Tachamos `[producto]` y `(producto)`.
- **Usar pista (P5):** Pista usada en `P5` (tercer párrafo de E02: adentro, una entrada es una señal de solo lectura y el hijo no la puede cambiar).

---

## E11 · Preguntas de evaluación y Reto bonus (Hoja 42)
- **P1:** `Una propiedad del hijo que el padre llena desde la plantilla.`
- **P2:** `producto()`
- **P3:** **F (Falso).** Una entrada creada con `input()` es una señal de solo lectura (`InputSignal`) que no posee `set()`; solo el componente padre decide su valor.
- **P4 (Relaciona):**
  - `input.required<Producto>()` → **El padre debe pasarla**
  - `input(false)` → **Opcional, vale false**
  - `[producto]="p"` → **El padre entrega p**
  - `producto().nombre` → **El hijo lee la entrada**
- **P5:** El hijo intentó cambiar el valor de su propia entrada con `set()`, y no se puede porque `InputSignal` es de solo lectura.
- **P6:** Porque si la tarjeta pidiera `Catalogo` directamente no sabría cuál de todos los productos mostrar; en cambio, el padre (`Menu`) recorre la lista con `@for` y le entrega a cada tarjeta el producto que le toca mediante `[producto]="p"`.

### Reto bonus · Caza el error (`menu.html`)
1. **¿Qué le falta a la etiqueta de la línea 3?** Le falta pasar la entrada obligatoria `[producto]="p"`.
2. **¿Qué ventaja tiene que el error salga al compilar?** Previene el fallo antes de abrir la aplicación, evitando mostrar tarjetas rotas o con valores `undefined` al usuario.
3. **Etiqueta corregida:**
   ```html
   <app-producto-card [producto]="p" [destacado]="p.id === 2" />
   ```

---

## E12 · Tendencias 2026 (Hoja 43)
- **Cifra elegida y práctica unida a la misión:** Más del `+90 %` usa componentes standalone y `input()` es estable desde `v19` y recomendado en proyectos nuevos de Angular 22, tal como usamos en `ProductoCard` y `HorarioCard`.
- **Postura:** Cuando un componente acumula demasiadas entradas sueltas se vuelve difícil de usar; es mejor agrupar datos relacionados en un objeto tipado (como `Producto`) y dejar entradas sueltas solo para variaciones puntuales como `destacado`.

---

## E13 · ¿Qué diría un diseñador front? (Hoja 43)
1. **Frase de Jakob Nielsen aplicada a Pídelo U:** `input.required()` aplica prevención de errores desde la compilación (`NG8008`), evitando que una tarjeta llegue a la pantalla sin producto.
2. **Lupa del diseñador:**
   - *Todas las tarjetas tienen la misma estructura:* **Sí** — todas usan el mismo componente `<article>` con `<h3>` y `<p>`.
   - *«Recomendado» se lee con texto, no solo con color:* **Sí** — incluye `<span>Recomendado</span>` además de `[class.destacado]`.
   - *El nombre del producto funciona como título:* **Sí** — se marca con `<h3>{{ producto().nombre }}</h3>`.
3. **Si una tarjeta muestra «undefined», ¿qué diría un diseñador front?** Que el sistema expuso un fallo técnico interno al usuario en vez de prevenirlo antes de mostrar la pantalla.
- **Explícalo en 60 segundos:** En el caso, las tres tarjetas decían «Empanada» porque cada una inyectaba `Catalogo` por su cuenta sin saber qué lugar ocupaba; cuando el padre `Menu` recorre la lista y pasa `[producto]="p"` a un `input.required()` del hijo, cada tarjeta muestra el producto exacto que le corresponde.
