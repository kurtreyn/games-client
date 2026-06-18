import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUsersBadge } from './active-users-badge';

describe('ActiveUsersBadge', () => {
  let component: ActiveUsersBadge;
  let fixture: ComponentFixture<ActiveUsersBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveUsersBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveUsersBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
