# Ejercicios Angular 22 · Piezas Conectadas (Pídelo U)

Solución completa de la guía **Piezas Conectadas · Servicios, `input()` y `output()` (Angular 22)** — proyecto **Pídelo U** (Cafetería Byte).

## 1. Aplicación Angular 22 integrada (raíz del repositorio)
En `src/app/` se encuentra el proyecto Angular 22 funcional con todas las piezas conectadas (Reto final · Pídelo U 1.0, hoja 54):
- `src/app/modelos/producto.ts` — Interfaz `Producto`
- `src/app/servicios/catalogo.ts` (+ `.spec.ts`) — Servicio `@Service()` `Catalogo`
- `src/app/servicios/avisos.ts` (+ `.spec.ts`) — Servicio `@Service()` `Avisos`
- `src/app/servicios/carrito.ts` (+ `.spec.ts`) — Servicio `@Service()` `Carrito` con `signal`, `asReadonly()`, `computed`, `agregar()`, `quitar()` y `vaciar()`
- `src/app/servicios/favoritos.ts` (+ `.spec.ts`) — Servicio `@Service()` `Favoritos`
- `src/app/servicios/turno.ts` (+ `.spec.ts`) — Servicio `@Service()` `Turno`
- `src/app/encabezado/` — `Encabezado` (`inject(Carrito)`)
- `src/app/menu/` — `Menu` (`inject(Catalogo)`, `inject(Carrito)`, usa `ProductoCard`)
- `src/app/producto-card/` — `ProductoCard` (`input.required<Producto>()`, `input(false)`, `output<Producto>()`)
- `src/app/resumen/` — `Resumen` (`inject(Carrito)`, usa `ItemPedido`)
- `src/app/item-pedido/` — `ItemPedido` (`input.required<Producto>()`, `output<number>()`)
- `src/app/tablero/` — `Tablero` (`inject(Avisos)`)
- `src/app/panel-favoritos/` — `PanelFavoritos` (`inject(Favoritos)`, `inject(Catalogo)`)
- `src/app/pantalla/` — `Pantalla` (`inject(Turno)`)
- `src/app/caja/` — `Caja` (`inject(Turno)`)
- `src/app/horarios/` — `Horarios` (usa `HorarioCard`)
- `src/app/horario-card/` — `HorarioCard` (`dia`, `abre`, `cierra`, `especial`)

## 2. Ejercicios separados por nivel (`ejercicios-por-nivel/`)
Cada nivel de la guía cuenta con su carpeta independiente con el código exacto de ese nivel y las respuestas a todas las estaciones (`Apertura`, `E01`–`E13` y `Reto bonus`):
- `ejercicios-por-nivel/nivel-01/` — Nivel 01: ¿Qué es un servicio? (`Catalogo`, `Menu`, `Avisos`, `Tablero`, `estaciones-nivel-01.md`)
- `ejercicios-por-nivel/nivel-02/` — Nivel 02: Estructura de un servicio (`Carrito`, `Resumen`, `Favoritos`, `PanelFavoritos`, `estaciones-nivel-02.md`)
- `ejercicios-por-nivel/nivel-03/` — Nivel 03: ¿Por qué usar servicios? (`Encabezado`, `Menu`, `Turno`, `turno.spec.ts`, `Pantalla`, `Caja`, `estaciones-nivel-03.md`)
- `ejercicios-por-nivel/nivel-04/` — Nivel 04: `input()` (`ProductoCard`, `Menu`, `HorarioCard`, `Horarios`, `estaciones-nivel-04.md`)
- `ejercicios-por-nivel/nivel-05/` — Nivel 05: `output()` (`ProductoCard`, `Menu`, `ItemPedido`, `Resumen`, `estaciones-nivel-05.md`)
- `ejercicios-por-nivel/cierre-y-repaso-final.md` — Hoja 54 (Salón de insignias, Mi mapa de progreso, Reto final, Mi plano final 3·2·1) y Hoja 55 (Repaso final de mensajes de error).
