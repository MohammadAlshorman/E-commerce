import { TestBed } from '@angular/core/testing';

import { CustomerLoginRegistrationService } from './customer-login-registration.service';

describe('CustomerLoginRegistrationService', () => {
  let service: CustomerLoginRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerLoginRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
