import { TestBed } from '@angular/core/testing';

import { ForallService } from './forall.service';

describe('ForallService', () => {
  let service: ForallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
