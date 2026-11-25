import { Component, inject } from '@angular/core';
import { Carrito } from '../servicios/carrito';
import { Catalogo } from '../servicios/catalogo';

@Component({
  imports: [],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  protected readonly productos =
    inject(Catalogo).todos();
  protected readonly carrito = inject(Carrito);
}
