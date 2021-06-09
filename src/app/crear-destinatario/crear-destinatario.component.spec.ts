import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDestinatarioComponent } from './crear-destinatario.component';

describe('CrearDestinatarioComponent', () => {
  let component: CrearDestinatarioComponent;
  let fixture: ComponentFixture<CrearDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDestinatarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
