import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorarioCard } from './horario-card';

describe('HorarioCard', () => {
  let component: HorarioCard;
  let fixture: ComponentFixture<HorarioCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HorarioCard);
    fixture.componentRef.setInput('dia', 'Lunes');
    fixture.componentRef.setInput('abre', '7:00');
    fixture.componentRef.setInput('cierra', '18:00');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
