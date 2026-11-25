# Nivel 01 · ¿Qué es un servicio? (Hojas 04 a 13)

## Apertura · Recuerda sin mirar (Hoja 04)
- **¿Qué es un componente en Angular y qué archivos crea `ng generate component`?**
  - Un componente es una clase con el decorador `@Component` que dibuja una parte de la pantalla (con su plantilla HTML) y responde a clics.
  - El comando `ng generate component` (`ng g c`) crea 4 archivos: `.ts` (clase), `.html` (plantilla), `.css` (estilos) y `.spec.ts` (prueba).

---

## E01 · ¿Sabías que? · Reto flash (Hoja 05)
1. **¿Quién cocina y quién atiende en la cafetería del campus?**
   - La cocina prepara los pedidos para todas las mesas y los mostradores atienden directamente a quienes piden.
2. **Tres cosas que la cocina hace para todas las mesas:**
   - Guarda el menú del día, hace los cálculos y habla con el servidor (concentra lo que todos los mostradores necesitan).
3. **¿Qué sería «servicio» y qué «componente» en una app?**
   - **Servicio**: la cocina (guarda datos y lógica compartida en un solo lugar).
   - **Componente**: el mostrador (dibuja una parte de la pantalla y responde a clics).

---

## E02 · Explicación breve: la cocina de la app (Hoja 05)
- **Paso 1 · Resumen en una frase:** Un servicio es una clase de TypeScript marcada con `@Service()` de la que Angular crea una sola instancia para toda la app y la entrega con `inject()` a cualquier componente que la pida.
- **Paso 2 · Duda para preguntar:** ¿Qué error muestra Angular si la clase del servicio no tiene el decorador `@Service()`?

---

## E03 · Código ejemplo: Predice antes de ejecutar (Hoja 06)
- **Archivos de código:** `modelos/producto.ts`, `servicios/catalogo.ts`, `menu/menu.ts`, `menu/menu.html`.
1. **Si agregas un cuarto producto en `catalogo.ts`, ¿en qué otros archivos tienes que escribirlo para verlo en pantalla?**
   - En ningún otro archivo. `menu.ts` ya obtiene la lista con `this.catalogo.todos()` y `menu.html` la recorre con `@for`.
2. **Si otro componente también hace `inject(Catalogo)`, ¿recibe la misma lista o una copia nueva? ¿Por qué?**
   - Recibe la misma lista (la misma instancia), porque `@Service()` deja el servicio como singleton en la raíz: una sola instancia para toda la app.

---

## E05 · Pregunta a la IA por partes del código (Hoja 07)
- **P1 (`@Service()`):** Marca la clase como servicio y la deja disponible como una única instancia en toda la app; en Angular 22 reemplaza a `@Injectable({ providedIn: 'root' })` en la mayoría de los casos.
- **P2 (`inject(Catalogo)`):** Funciona al declarar una propiedad porque Angular ejecuta esa línea dentro de un contexto de inyección; dentro de un método normal falla con el error `NG0203`.
- **P3 (`Singleton`):** Significa que existe una sola instancia compartida en toda la aplicación (por ejemplo, un único tablero horario central en una estación que todas las pantallas leen).

| Parte del código | Qué dijo la IA (en tus palabras) | ¿Coincide con la anatomía? | ¿Cómo lo comprobaste? |
| :--- | :--- | :--- | :--- |
| `@Service()` | Registra la clase como servicio disponible en toda la app con una sola instancia. | Sí | Comparando con la fila 2 de E04 y ejecutando `ng serve`. |
| `inject()` | Pide el servicio a Angular al declarar la propiedad de la clase. | Sí | Comparando con la fila 6 de E04 y probando moverlo a un método (`NG0203`). |
| `Singleton` | Angular crea una única copia del servicio y entrega esa misma a todos los componentes. | Sí | Usando dos etiquetas en pantalla y viendo que leen la misma lista. |

---

## E06 · Buenas prácticas (Hoja 08)
1. **Dos datos de Pídelo U que deberían vivir en un servicio y por qué:**
   - **El menú de productos (`Catalogo`)**: porque varias pantallas (menú, resumen, caja) necesitan mostrar exactamente los mismos nombres y precios sin copias repetidas.
   - **Los avisos de la cafetería (`Avisos`)**: porque cualquier pantalla o tablero debe leer los mismos avisos actualizados desde un único lugar.
2. **¿Qué pasaría si cada componente creara su propia lista con `new Catalogo()`?**
   - Cada componente tendría su propia copia aislada en memoria en vez de recibir la única instancia compartida que administra Angular con `inject()`.

---

## E07 · El caso: tres pantallas, tres precios (Hoja 08)
- **Problema:** Varios estudiantes vieron la empanada a `$2800` en el celular y pagaron `$2500` en la caja (`$300` de diferencia).
- **Causa:** La lista de productos estaba copiada en 3 componentes (menú, resumen y caja) y Mateo olvidó actualizar la copia de la caja.
- **Unión de fichas:**
  - **COPIAS (3):** Lista de productos copiada en menú, resumen del pedido y pantalla de la caja.
  - **OLVIDADA (1):** La copia de la pantalla de la caja se quedó con el precio viejo (`$2500`).
  - **DIFERENCIA ($300):** Entre los `$2800` que subió don Hernán y los `$2500` cobrados en caja.
  - **SERVICIO (1):** Un solo servicio `Catalogo` con el menú del día pedido con `inject()` por las tres pantallas.

---

## E08 · Tips de diseño · Reto de diseño (Hoja 09)

| Pantalla de Pídelo U | ¿Qué datos muestra? | ¿De qué servicio vendrían? |
| :--- | :--- | :--- |
| **Menú** | Nombres y precios de los productos del día (`Empanada $2500`, `Arepa con queso $4000`, `Jugo de mora $3500`). | `Catalogo` |
| **Encabezado** | Nombre `Pídelo U` y cantidad de productos en el pedido. | `Carrito` |
| **Resumen del pedido** | Lista de productos agregados, cantidad y total a pagar. | `Carrito` |

- **Esquema de pantallas (Paso 2):**
  1. **Menú:** Encabezado `Pídelo U`, título `Menú de hoy`, filas con nombre y precio a la vista (datos desde `Catalogo`), botón `Ver mi pedido`.
  2. **Encabezado:** Barra superior con contraste suficiente mostrando `Pídelo U` y `Carrito: N` (dato desde `Carrito`).
  3. **Resumen del pedido:** Título `Tu pedido`, productos elegidos con su precio y `Total` (datos desde `Carrito`).

---

## E09 · Misión guiada: el servicio `Avisos` y `Tablero` (Hojas 10 y 11)
- **Archivos resueltos:** `servicios/avisos.ts`, `tablero/tablero.ts`, `tablero/tablero.html`.
- **Paso 6 · Rompe a propósito:**

| Cambio a propósito | ¿Qué mensaje o qué pasó? | ¿Por qué? |
| :--- | :--- | :--- |
| Borrar `@Service()` de `avisos.ts` | La pantalla queda vacía y en la consola aparece `NG0201: No provider found for Avisos`. | Sin `@Service()`, Angular no registra la clase como proveedor y no puede entregarla. |
| Mover `inject(Avisos)` dentro de un método | Falla con el error `NG0203: inject() function must be called from an injection context`. | `inject()` debe llamarse al declarar la propiedad de la clase, no dentro de un método normal. |
| Escribir `<app-tablero />` dos veces | Se muestran dos tableros iguales en pantalla con los mismos avisos. | Se crean dos instancias del componente `Tablero`, pero ambas reciben la misma instancia única del servicio `Avisos`. |

---

## E10 · Comodines (Hoja 12)
- **Quitar opciones (P2):** Tachamos `new()` y `emit()`.
- **Usar pista (P5):** Pista usada en `P5` (tercer párrafo de E02: Angular crea una sola instancia y entrega esa misma a todos los que la piden).

---

## E11 · Preguntas de evaluación y Reto bonus (Hoja 12)
- **P1:** `Una clase con datos o lógica que varios componentes comparten.`
- **P2:** `inject()`
- **P3:** **F (Falso).** Con `@Service()`, Angular crea una sola instancia (singleton) para toda la app y entrega esa misma instancia a cada componente que la pide con `inject()`.
- **P4 (Orden correcto):**
  1. `[1]` Generar el servicio con `ng g s`
  2. `[2]` Escribir los datos y un método
  3. `[3]` Pedirlo con `inject()` en el componente
  4. `[4]` Recorrer los datos con `@for`
  5. `[5]` Ver la lista en el navegador
- **P5:** El otro componente ve el precio nuevo actualizado, porque ambos componentes reciben exactamente la misma instancia única de `Catalogo`.
- **P6:** Porque los datos estaban copiados en tres componentes separados y, cuando cambió el precio de la empanada, olvidaron actualizar la copia de la pantalla de la caja.

### Reto bonus · Caza el error (`catalogo.ts`)
1. **¿Qué le falta a la clase `Catalogo`?** Le falta el decorador `@Service()` y su importación desde `'@angular/core'`.
2. **¿Por qué Angular no la puede entregar?** Porque sin `@Service()` la clase no está registrada en el sistema de inyección de dependencias (`NG0201: No provider found for Catalogo`).
3. **Líneas que faltan y dónde van:**
   - En la línea 1: `import { Service } from '@angular/core';`
   - Justo encima de `export class Catalogo`: `@Service()`

---

## E12 · Tendencias 2026 (Hoja 13)
- **Cifra elegida y práctica unida a la misión:** En Angular `v22`, `@Service()` es el nuevo decorador que genera `ng g s` por defecto para compartir datos como hicimos en `Avisos` y `Catalogo`, mientras TypeScript es el lenguaje N.º 1 en GitHub.
- **Postura:** En una aplicación de uso diario, datos como la lista de productos o las notificaciones/avisos viven en un servicio compartido para que todas las pantallas muestren siempre la misma información sin duplicarla.

---

## E13 · ¿Qué diría un diseñador front? (Hoja 13)
1. **Frase de Brad Frost aplicada a Pídelo U:** Si una parte como el servicio `Catalogo` mantiene un único menú coherente, todas las pantallas del todo (menú, resumen y caja) muestran los mismos nombres y precios sin contradicciones.
2. **Lupa del diseñador:**
   - *Nombres y precios iguales en todas las pantallas:* **Sí** — salen de un único servicio (`Catalogo` / `Avisos`).
   - *El menú se entiende de un vistazo:* **Sí** — lista clara con nombre y precio juntos (`{{ p.nombre }} · ${{ p.precio }}`).
   - *Los textos usan las palabras de la cafetería:* **Sí** — títulos cotidianos como «Menú de hoy» y «Avisos de la cafetería».
3. **Si cada pantalla guarda su propia copia del menú, ¿qué diría un diseñador front?** Que rompe la consistencia y la confianza de quien pide, porque verá precios distintos según la pantalla.
- **Explícalo en 60 segundos:** En la cafetería, los componentes son los mostradores que atienden y dibujan en pantalla, mientras el servicio (`@Service()`) es la cocina única que guarda los datos; cada mostrador pide a esa misma cocina con `inject()`.
