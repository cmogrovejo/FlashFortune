import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopNav } from './dashboard-top-nav';

describe('DashboardTopNav', () => {
  let component: DashboardTopNav;
  let fixture: ComponentFixture<DashboardTopNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTopNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTopNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
