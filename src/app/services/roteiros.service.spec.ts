import { TestBed } from '@angular/core/testing';

import { RoteirosService } from './roteiros.service';

describe('RoteirosService', () => {
  let service: RoteirosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoteirosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
