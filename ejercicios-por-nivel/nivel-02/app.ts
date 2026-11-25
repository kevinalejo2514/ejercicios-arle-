import { Component } from '@angular/core';
import { Resumen } from './resumen/resumen';
import { PanelFavoritos } from './panel-favoritos/panel-favoritos';

@Component({
  imports: [Resumen, PanelFavoritos],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
