import { TestBed } from '@angular/core/testing';

import { MobilApiService } from './mobil-api.service';

describe('MobilApiService', () => {
  let service: MobilApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobilApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
