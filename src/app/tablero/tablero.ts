import { Component, inject } from '@angular/core';
import { Avisos } from '../servicios/avisos';

@Component({
  imports: [],
  selector: 'app-tablero',
  styleUrl: './tablero.css',
  templateUrl: './tablero.html',
})
export class Tablero {
  private readonly avisos = inject(Avisos);
  protected readonly lista = this.avisos.todos();
}
