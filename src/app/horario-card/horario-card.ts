import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-horario-card',
  styleUrl: './horario-card.css',
  templateUrl: './horario-card.html',
})
export class HorarioCard {
  readonly dia = input.required<string>();
  readonly abre = input.required<string>();
  readonly cierra = input.required<string>();
  readonly especial = input(false);
}
