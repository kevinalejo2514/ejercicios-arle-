import { Component, inject } from '@angular/core';
import { Carrito } from '../servicios/carrito';
import { ItemPedido } from '../item-pedido/item-pedido';

@Component({
  imports: [ItemPedido],
  selector: 'app-resumen',
  styleUrl: './resumen.css',
  templateUrl: './resumen.html',
})
export class Resumen {
  protected readonly carrito = inject(Carrito);
}
