import { TestBed } from '@angular/core/testing';

import { GameLobbyApi } from './game-lobby-api';

describe('GameLobbyApi', () => {
  let service: GameLobbyApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLobbyApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
