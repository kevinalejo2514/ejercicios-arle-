import { Service, signal } from '@angular/core';

@Service()
export class Turno {
  private readonly numero = signal(1);

  readonly actual = this.numero.asReadonly();

  siguiente(): void {
    this.numero.update((n) => n + 1);
  }
}
