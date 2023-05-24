import { TestBed } from '@angular/core/testing';

import { PartiesService } from './parties.service';

describe('PartiesService', () => {
  let service: PartiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
