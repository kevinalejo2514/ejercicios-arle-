import { Component, inject } from '@angular/core';
import { Turno } from '../servicios/turno';

@Component({
  imports: [],
  selector: 'app-pantalla',
  styleUrl: './pantalla.css',
  templateUrl: './pantalla.html',
})
export class Pantalla {
  protected readonly turno = inject(Turno);
}
