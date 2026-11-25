import { Component } from '@angular/core';
import { Menu } from './menu/menu';
import { Tablero } from './tablero/tablero';

@Component({
  imports: [Menu, Tablero],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
