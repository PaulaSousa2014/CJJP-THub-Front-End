import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinifooterComponent } from './minifooter.component';

describe('MinifooterComponent', () => {
  let component: MinifooterComponent;
  let fixture: ComponentFixture<MinifooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinifooterComponent]
    });
    fixture = TestBed.createComponent(MinifooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
