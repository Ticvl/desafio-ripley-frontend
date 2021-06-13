import { TestBed } from '@angular/core/testing';

import { ActivarRutaGuard } from './activar-ruta.guard';

describe('ActivarRutaGuard', () => {
  let guard: ActivarRutaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivarRutaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
