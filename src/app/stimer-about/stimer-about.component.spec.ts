import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StimerAboutComponent } from './stimer-about.component';

describe('StimerAboutComponent', () => {
  let component: StimerAboutComponent;
  let fixture: ComponentFixture<StimerAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StimerAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StimerAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
