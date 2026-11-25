import { Component, inject } from '@angular/core';
import { Catalogo } from '../servicios/catalogo';

@Component({
  imports: [],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  private readonly catalogo = inject(Catalogo);
  protected readonly productos = this.catalogo.todos();
}
