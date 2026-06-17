import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsocketTest } from './websocket-test';

describe('WebsocketTest', () => {
  let component: WebsocketTest;
  let fixture: ComponentFixture<WebsocketTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsocketTest],
    }).compileComponents();

    fixture = TestBed.createComponent(WebsocketTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
