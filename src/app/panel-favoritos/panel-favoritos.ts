import { Component, inject } from '@angular/core';
import { Catalogo } from '../servicios/catalogo';
import { Favoritos } from '../servicios/favoritos';

@Component({
  imports: [],
  selector: 'app-panel-favoritos',
  styleUrl: './panel-favoritos.css',
  templateUrl: './panel-favoritos.html',
})
export class PanelFavoritos {
  protected readonly favoritos = inject(Favoritos);
  protected readonly productos =
    inject(Catalogo).todos();
}
