import { TestBed } from '@angular/core/testing';

import { RandomOrgApiService } from './random-org-api.service';

describe('RandomOrgApiService', () => {
  let service: RandomOrgApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomOrgApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
