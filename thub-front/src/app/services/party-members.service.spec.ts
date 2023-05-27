import { TestBed } from '@angular/core/testing';

import { PartyMembersService } from './party-members.service';

describe('PartyMembersService', () => {
  let service: PartyMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
