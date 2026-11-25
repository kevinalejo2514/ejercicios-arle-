import { Component } from '@angular/core';
import { Encabezado } from './encabezado/encabezado';
import { Menu } from './menu/menu';
import { Resumen } from './resumen/resumen';

@Component({
  imports: [Encabezado, Menu, Resumen],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
