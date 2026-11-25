import { Service } from '@angular/core';
import { Producto } from '../modelos/producto';

@Service()
export class Catalogo {
  private readonly productos: Producto[] = [
    { id: 1, nombre: 'Empanada', precio: 2500 },
    { id: 2, nombre: 'Arepa con queso', precio: 4000 },
    { id: 3, nombre: 'Jugo de mora', precio: 3500 },
  ];

  todos(): Producto[] {
    return this.productos;
  }
}
