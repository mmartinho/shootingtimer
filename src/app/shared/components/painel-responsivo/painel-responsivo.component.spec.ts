import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelResponsivoComponent } from './painel-responsivo.component';

describe('PainelResponsivoComponent', () => {
  let component: PainelResponsivoComponent;
  let fixture: ComponentFixture<PainelResponsivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelResponsivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelResponsivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
