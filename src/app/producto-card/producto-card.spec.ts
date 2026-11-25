import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoCard } from './producto-card';

describe('ProductoCard', () => {
  let component: ProductoCard;
  let fixture: ComponentFixture<ProductoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoCard);
    fixture.componentRef.setInput('producto', {
      id: 1,
      nombre: 'Empanada',
      precio: 2500,
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
