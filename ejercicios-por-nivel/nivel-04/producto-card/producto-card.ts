import { Component, input } from '@angular/core';
import { Producto } from '../modelos/producto';

@Component({
  imports: [],
  selector: 'app-producto-card',
  styleUrl: './producto-card.css',
  templateUrl: './producto-card.html',
})
export class ProductoCard {
  readonly producto = input.required<Producto>();
  readonly destacado = input(false);
}
