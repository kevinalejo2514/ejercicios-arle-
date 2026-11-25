import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemPedido } from './item-pedido';

describe('ItemPedido', () => {
  let component: ItemPedido;
  let fixture: ComponentFixture<ItemPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPedido],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemPedido);
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
