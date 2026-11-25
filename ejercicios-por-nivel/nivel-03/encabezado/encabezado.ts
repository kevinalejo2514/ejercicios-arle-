import { Component, inject } from '@angular/core';
import { Carrito } from '../servicios/carrito';

@Component({
  imports: [],
  selector: 'app-encabezado',
  styleUrl: './encabezado.css',
  templateUrl: './encabezado.html',
})
export class Encabezado {
  protected readonly carrito = inject(Carrito);
}
