import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelFavoritos } from './panel-favoritos';

describe('PanelFavoritos', () => {
  let component: PanelFavoritos;
  let fixture: ComponentFixture<PanelFavoritos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelFavoritos],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelFavoritos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
