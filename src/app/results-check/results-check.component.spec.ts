import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsCheckComponent } from './results-check.component';

describe('ResultsCheckComponent', () => {
  let component: ResultsCheckComponent;
  let fixture: ComponentFixture<ResultsCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
