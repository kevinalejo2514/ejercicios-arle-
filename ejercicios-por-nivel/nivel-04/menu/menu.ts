import { Component, inject } from '@angular/core';
import { Catalogo } from '../servicios/catalogo';
import { ProductoCard } from '../producto-card/producto-card';

@Component({
  imports: [ProductoCard],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  protected readonly productos = inject(Catalogo).todos();
}
