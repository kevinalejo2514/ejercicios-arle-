import { Component, inject } from '@angular/core';
import { Turno } from '../servicios/turno';

@Component({
  imports: [],
  selector: 'app-caja',
  styleUrl: './caja.css',
  templateUrl: './caja.html',
})
export class Caja {
  protected readonly turno = inject(Turno);
}
