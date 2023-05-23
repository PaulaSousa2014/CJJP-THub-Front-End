import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickPartyComponent } from './click-party.component';

describe('ClickPartyComponent', () => {
  let component: ClickPartyComponent;
  let fixture: ComponentFixture<ClickPartyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClickPartyComponent]
    });
    fixture = TestBed.createComponent(ClickPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
