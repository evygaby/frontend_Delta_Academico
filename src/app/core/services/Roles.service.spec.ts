/* tslint:disable:no-unused-variable */

import { TestBed,  inject } from '@angular/core/testing';
import { RolesService } from './Roles.service';

describe('Service: Roles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolesService]
    });
  });

  it('should ...', inject([RolesService], (service: RolesService) => {
    expect(service).toBeTruthy();
  }));
});
