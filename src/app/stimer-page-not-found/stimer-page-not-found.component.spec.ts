import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StimerPageNotFoundComponent } from './stimer-page-not-found.component';

describe('StimerPageNotFoundComponent', () => {
  let component: StimerPageNotFoundComponent;
  let fixture: ComponentFixture<StimerPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StimerPageNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StimerPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
