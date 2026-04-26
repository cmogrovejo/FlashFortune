import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessUnit } from './add-business-unit';

describe('AddBusinessUnit', () => {
  let component: AddBusinessUnit;
  let fixture: ComponentFixture<AddBusinessUnit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBusinessUnit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBusinessUnit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
