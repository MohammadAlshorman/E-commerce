import { TestBed } from '@angular/core/testing';

import { GoolgeTranslateService } from './goolge-translate.service';

describe('GoolgeTranslateService', () => {
  let service: GoolgeTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoolgeTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
