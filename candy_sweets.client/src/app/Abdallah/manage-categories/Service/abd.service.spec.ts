import { TestBed } from '@angular/core/testing';

import { AbdService } from './abd.service';

describe('AbdService', () => {
  let service: AbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
