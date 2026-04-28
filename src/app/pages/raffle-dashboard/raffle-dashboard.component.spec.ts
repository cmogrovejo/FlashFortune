import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleDashboard } from './raffle-dashboard';

describe('RaffleDashboard', () => {
  let component: RaffleDashboard;
  let fixture: ComponentFixture<RaffleDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaffleDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaffleDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
