import { TestBed } from '@angular/core/testing';

import { PeminjamanApiService } from './peminjaman-api.service';

describe('PeminjamanApiService', () => {
  let service: PeminjamanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeminjamanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
