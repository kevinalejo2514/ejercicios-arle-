import { TestBed } from '@angular/core/testing';
import { Turno } from './turno';

describe('Turno', () => {
  let turno: Turno;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    turno = TestBed.inject(Turno);
  });

  it('empieza en 1 y avanza al siguiente', () => {
    expect(turno.actual()).toBe(1);
    turno.siguiente();
    expect(turno.actual()).toBe(2);
  });
});
