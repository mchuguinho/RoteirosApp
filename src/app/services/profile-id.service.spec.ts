import { TestBed } from '@angular/core/testing';

import { ProfileIdService } from './profile-id.service';

describe('ProfileIdService', () => {
  let service: ProfileIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
