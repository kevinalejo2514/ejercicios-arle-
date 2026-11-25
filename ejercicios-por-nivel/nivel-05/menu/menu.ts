import { Component, inject } from '@angular/core';
import { Carrito } from '../servicios/carrito';
import { Catalogo } from '../servicios/catalogo';
import { Producto } from '../modelos/producto';
import { ProductoCard } from '../producto-card/producto-card';

@Component({
  imports: [ProductoCard],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  protected readonly productos = inject(Catalogo).todos();
  private readonly carrito = inject(Carrito);

  agregarAlCarrito(producto: Producto): void {
    this.carrito.agregar(producto);
  }
}
