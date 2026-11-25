import { Component } from '@angular/core';
import { HorarioCard } from '../horario-card/horario-card';

@Component({
  imports: [HorarioCard],
  selector: 'app-horarios',
  styleUrl: './horarios.css',
  templateUrl: './horarios.html',
})
export class Horarios {
  protected readonly semana = [
    { dia: 'Lunes', abre: '7:00', cierra: '18:00' },
    { dia: 'Sábado', abre: '8:00', cierra: '12:00' },
  ];
}
