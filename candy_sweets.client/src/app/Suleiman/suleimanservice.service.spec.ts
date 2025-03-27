import { TestBed } from '@angular/core/testing';

import { SuleimanserviceService } from './suleimanservice.service';

describe('SuleimanserviceService', () => {
  let service: SuleimanserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuleimanserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
