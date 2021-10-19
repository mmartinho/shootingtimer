import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencaoComponent } from './atencao.component';

describe('AtencaoComponent', () => {
  let component: AtencaoComponent;
  let fixture: ComponentFixture<AtencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
