import { Service, computed, signal } from '@angular/core';
import { Producto } from '../modelos/producto';

@Service()
export class Carrito {
  private readonly items = signal<Producto[]>([]);

  readonly lista = this.items.asReadonly();
  readonly cantidad = computed(() => this.items().length);
  readonly total = computed(() =>
    this.items().reduce((suma, p) => suma + p.precio, 0),
  );

  agregar(producto: Producto): void {
    this.items.update((actual) => [...actual, producto]);
  }

  vaciar(): void {
    this.items.set([]);
  }
}
