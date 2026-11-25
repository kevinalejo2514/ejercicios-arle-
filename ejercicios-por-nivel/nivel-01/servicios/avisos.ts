import { Service } from '@angular/core';

@Service()
export class Avisos {
  private readonly lista: string[] = [
    'Hoy hay arepa de choclo',
    'Combo de empanada y jugo de mora',
  ];

  todos(): string[] {
    return this.lista;
  }
}
