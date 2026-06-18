import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInviteLinkContainer } from './game-invite-link-container';

describe('GameInviteLinkContainer', () => {
  let component: GameInviteLinkContainer;
  let fixture: ComponentFixture<GameInviteLinkContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameInviteLinkContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(GameInviteLinkContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
