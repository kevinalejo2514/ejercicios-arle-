import { Component } from '@angular/core';
import { Encabezado } from './encabezado/encabezado';
import { Menu } from './menu/menu';
import { Pantalla } from './pantalla/pantalla';
import { Caja } from './caja/caja';

@Component({
  imports: [Encabezado, Menu, Pantalla, Caja],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
