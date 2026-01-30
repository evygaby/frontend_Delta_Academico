/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ProcesosService } from './Procesos.service';

describe('Service: Procesos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcesosService]
    });
  });

  it('should ...', inject([ProcesosService], (service: ProcesosService) => {
    expect(service).toBeTruthy();
  }));
});
