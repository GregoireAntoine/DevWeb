import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateorderComponent } from './dateorder.component';

describe('DateorderComponent', () => {
  let component: DateorderComponent;
  let fixture: ComponentFixture<DateorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
