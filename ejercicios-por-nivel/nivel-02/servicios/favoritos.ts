import { Service, computed, signal } from '@angular/core';

@Service()
export class Favoritos {
  private readonly ids = signal<number[]>([]);

  readonly lista = this.ids.asReadonly();
  readonly cuantos = computed(() => this.ids().length);

  marcar(id: number): void {
    this.ids.update((actual) => [...actual, id]);
  }

  limpiar(): void {
    this.ids.set([]);
  }
}
