import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rummy } from './rummy';

describe('Rummy', () => {
  let component: Rummy;
  let fixture: ComponentFixture<Rummy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rummy],
    }).compileComponents();

    fixture = TestBed.createComponent(Rummy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
