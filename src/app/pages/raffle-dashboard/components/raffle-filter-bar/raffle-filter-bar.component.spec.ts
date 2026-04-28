import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleFilterBar } from './raffle-filter-bar';

describe('RaffleFilterBar', () => {
  let component: RaffleFilterBar;
  let fixture: ComponentFixture<RaffleFilterBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaffleFilterBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaffleFilterBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
