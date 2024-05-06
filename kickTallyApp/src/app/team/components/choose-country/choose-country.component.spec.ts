import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCountryComponent } from './choose-country.component';

describe('ChooseCountryComponent', () => {
  let component: ChooseCountryComponent;
  let fixture: ComponentFixture<ChooseCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCountryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
