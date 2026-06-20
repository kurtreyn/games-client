import { TestBed } from '@angular/core/testing';

import { RummyApi } from './rummy-api';

describe('RummyApi', () => {
  let service: RummyApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RummyApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
