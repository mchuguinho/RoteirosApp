import { TestBed } from '@angular/core/testing';

import { PontoIntService } from './ponto-int.service';

describe('PontoIntService', () => {
  let service: PontoIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PontoIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
