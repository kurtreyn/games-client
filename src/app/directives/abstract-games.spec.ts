import { AbstractGames } from './abstract-games';

describe('AbstractGames', () => {
  it('should create an instance', () => {
    const directive = new AbstractGames();
    expect(directive).toBeTruthy();
  });
});
