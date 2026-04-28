import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleTable } from './raffle-table.component';

describe('RaffleTable', () => {
  let component: RaffleTable;
  let fixture: ComponentFixture<RaffleTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaffleTable]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RaffleTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
