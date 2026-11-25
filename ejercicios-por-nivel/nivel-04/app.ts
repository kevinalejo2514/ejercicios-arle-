import { Component } from '@angular/core';
import { Menu } from './menu/menu';
import { Horarios } from './horarios/horarios';

@Component({
  imports: [Menu, Horarios],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
