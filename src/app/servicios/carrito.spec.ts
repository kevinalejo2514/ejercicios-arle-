import { TestBed } from '@angular/core/testing';
import { Carrito } from './carrito';

describe('Carrito', () => {
  let carrito: Carrito;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    carrito = TestBed.inject(Carrito);
  });

  it('agrega un producto y calcula cantidad y total', () => {
    const empanada = { id: 1, nombre: 'Empanada', precio: 2500 };
    carrito.agregar(empanada);
    expect(carrito.cantidad()).toBe(1);
    expect(carrito.total()).toBe(2500);
  });
});
