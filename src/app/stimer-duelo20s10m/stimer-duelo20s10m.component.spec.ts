import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StimerDuelo20s10mComponent } from './stimer-duelo20s10m.component';

describe('StimerDuelo20s10mComponent', () => {
  let component: StimerDuelo20s10mComponent;
  let fixture: ComponentFixture<StimerDuelo20s10mComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StimerDuelo20s10mComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StimerDuelo20s10mComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
