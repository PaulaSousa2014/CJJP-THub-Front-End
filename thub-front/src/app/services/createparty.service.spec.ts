import { TestBed } from '@angular/core/testing';

import { CreatepartyService } from './createparty.service';

describe('CreatepartyService', () => {
  let service: CreatepartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatepartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
