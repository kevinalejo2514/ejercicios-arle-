# Cierre de ruta y Repaso final (Hojas 54 y 55)

## Salón de insignias y Mapa de progreso (Hoja 54)
- **Nivel 01 · ¿Qué es un servicio?** — Insignia: *Primer servicio* (`>= 140 XP`, `200 XP` máximo)
- **Nivel 02 · Estructura de un servicio** — Insignia: *Constructor/a de servicios* (`>= 140 XP`, `200 XP` máximo)
- **Nivel 03 · ¿Por qué usar servicios?** — Insignia: *Pieza compartida* (`>= 140 XP`, `200 XP` máximo)
- **Nivel 04 · `input()`: datos que entran** — Insignia: *Receptor/a de datos* (`>= 140 XP`, `200 XP` máximo)
- **Nivel 05 · `output()`: avisos que salen** — Insignia: *Mensajero/a de eventos* (`>= 140 XP`, `200 XP` máximo)
- **Ruta completa** — Insignia: *Maestro/a de conexiones* (`>= 800 XP` hasta `1.000 XP`)

---

## Reto final · Pídelo U 1.0: unan las cinco piezas en una pantalla (Hoja 54)
Todas las piezas están integradas y conectadas en `src/app/`:
1. **Servicio:** `src/app/servicios/catalogo.ts` (`Catalogo` con `@Service()`).
2. **Estructura:** `src/app/servicios/carrito.ts` (`Carrito` con `signal` privada `items`, `asReadonly()`, `computed` `cantidad` y `total`, y métodos `agregar()`, `quitar()`, `vaciar()`).
3. **Por qué:** `Encabezado` y `Menu` comparten el mismo `Carrito` con `inject(Carrito)`, y `src/app/servicios/carrito.spec.ts` / `turno.spec.ts` prueban el servicio con `TestBed.inject()`.
4. **`input()`:** `ProductoCard` recibe `[producto]` con `input.required<Producto>()` y `[destacado]` con `input(false)`.
5. **`output()`:** `ProductoCard` emite `(agregar)` con `output<Producto>()` y `Menu` lo escucha llamando a `carrito.agregar($event)`.
6. **Diseño:** `src/styles.css` y las plantillas aplican contraste `>= 4.5:1`, botones `>= 24x24 px`, estado vacío explícito («Elige algo del menú») y anuncio del contador con `aria-live="polite"`.

---

## Mi plano final · 3 · 2 · 1 (Hoja 54)
- **3 ideas que me llevo:**
  1. Un servicio con `@Service()` crea una sola instancia (singleton) que se pide con `inject()`.
  2. El estado vive en una `signal` privada, se lee con `asReadonly()` y `computed`, y solo cambia mediante métodos con `set()` o `update()`.
  3. Los datos bajan del padre al hijo con `input()` (`[entrada]`) y los avisos suben del hijo al padre con `output()` (`(evento)` y `$event`).
- **2 cosas que aplicaré en un proyecto:**
  1. Centralizar los datos compartidos en servicios con señales privadas en lugar de duplicarlos en varios componentes.
  2. Probar la lógica y cálculos de los servicios sin pantalla usando `TestBed.inject()` y Vitest.
- **1 pregunta que aún tengo:**
  - ¿Cuándo conviene usar `httpResource` para cargar el catálogo desde un servidor real en Angular 22?

---

## Repaso final · Mensajes reales que ya sabes leer (Hoja 55)

| Mensaje que apareció en este cuaderno | ¿Qué lo causa? | Nivel |
| :--- | :--- | :--- |
| `NG0201: No provider found for Catalogo.` | Falta el decorador `@Service()` en la clase `Catalogo`. | 01 |
| `NG0203: inject() function must be called from an injection context` | Se llamó a `inject()` dentro de un método en lugar de al declarar una propiedad de la clase. | 01 |
| `TS2341: Property 'items' is private and only accessible within class 'Carrito'.` | Un componente intentó acceder directamente a una señal `private` en lugar de usar lecturas públicas o métodos. | 02 |
| `AssertionError: expected 2 to be 3` | La prueba unitaria esperaba `3`, pero el valor real devuelto fue `2`. | 03 |
| `NG8008: Required input 'producto' from component ProductoCard must be specified.` | El componente padre olvidó pasar una entrada declarada con `input.required()`. | 04 |
| `TS2339: Property 'set' does not exist on type 'InputSignal<boolean>'.` | El componente hijo intentó cambiar una entrada `input()`, que es de solo lectura. | 04 |
| `TS2345: Argument of type 'Event' is not assignable to parameter of type 'Producto'.` | El nombre del evento entre paréntesis en el padre no coincide con el `output()` del hijo y Angular lo trata como un `Event` del DOM. | 05 |
