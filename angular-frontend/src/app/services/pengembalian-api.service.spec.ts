import { TestBed } from '@angular/core/testing';

import { PengembalianApiService } from './pengembalian-api.service';

describe('PengembalianApiService', () => {
  let service: PengembalianApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PengembalianApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
