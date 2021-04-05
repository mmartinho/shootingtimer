import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StimerDuelo20sComponent } from './stimer-duelo20s.component';

describe('StimerDuelo20sComponent', () => {
  let component: StimerDuelo20sComponent;
  let fixture: ComponentFixture<StimerDuelo20sComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StimerDuelo20sComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StimerDuelo20sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
