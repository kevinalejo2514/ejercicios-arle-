import { Component } from '@angular/core';
import { Encabezado } from './encabezado/encabezado';
import { Menu } from './menu/menu';
import { Resumen } from './resumen/resumen';
import { Tablero } from './tablero/tablero';
import { PanelFavoritos } from './panel-favoritos/panel-favoritos';
import { Pantalla } from './pantalla/pantalla';
import { Caja } from './caja/caja';
import { Horarios } from './horarios/horarios';

@Component({
  imports: [
    Encabezado,
    Menu,
    Resumen,
    Tablero,
    PanelFavoritos,
    Pantalla,
    Caja,
    Horarios,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
