import { TestBed } from '@angular/core/testing';

import { CasesApiService } from './cases-api.service';

describe('CasesApiService', () => {
  let service: CasesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
