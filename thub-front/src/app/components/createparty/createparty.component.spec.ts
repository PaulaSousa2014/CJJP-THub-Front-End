import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepartyComponent } from './createparty.component';

describe('CreatepartyComponent', () => {
  let component: CreatepartyComponent;
  let fixture: ComponentFixture<CreatepartyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatepartyComponent]
    });
    fixture = TestBed.createComponent(CreatepartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
