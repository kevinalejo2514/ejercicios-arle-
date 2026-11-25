import { Component, input, output } from '@angular/core';
import { Producto } from '../modelos/producto';

@Component({
  imports: [],
  selector: 'app-item-pedido',
  styleUrl: './item-pedido.css',
  templateUrl: './item-pedido.html',
})
export class ItemPedido {
  readonly producto = input.required<Producto>();
  readonly quitar = output<number>();

  pedirQuitar(): void {
    this.quitar.emit(this.producto().id);
  }
}
