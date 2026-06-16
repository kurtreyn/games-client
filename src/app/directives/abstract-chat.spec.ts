import { AbstractChat } from './abstract-chat';

describe('AbstractChat', () => {
  it('should create an instance', () => {
    const directive = new AbstractChat();
    expect(directive).toBeTruthy();
  });
});
