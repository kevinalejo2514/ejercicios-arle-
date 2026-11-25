import { Component, inject } from '@angular/core';
import { Carrito } from '../servicios/carrito';
import { Catalogo } from '../servicios/catalogo';

@Component({
  imports: [],
  selector: 'app-resumen',
  styleUrl: './resumen.css',
  templateUrl: './resumen.html',
})
export class Resumen {
  protected readonly carrito = inject(Carrito);
  protected readonly productos =
    inject(Catalogo).todos();
}
