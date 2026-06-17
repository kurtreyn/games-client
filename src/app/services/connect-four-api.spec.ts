import { TestBed } from '@angular/core/testing';

import { ConnectFourApi } from './connect-four-api';

describe('ConnectFourApi', () => {
  let service: ConnectFourApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectFourApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
