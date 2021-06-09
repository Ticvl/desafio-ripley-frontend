import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaDestinatarioComponent } from './transferencia-destinatario.component';

describe('TransferenciaDestinatarioComponent', () => {
  let component: TransferenciaDestinatarioComponent;
  let fixture: ComponentFixture<TransferenciaDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciaDestinatarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
