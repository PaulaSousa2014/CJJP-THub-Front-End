import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemecompComponent } from './memecomp.component';

describe('MemecompComponent', () => {
  let component: MemecompComponent;
  let fixture: ComponentFixture<MemecompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemecompComponent]
    });
    fixture = TestBed.createComponent(MemecompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
