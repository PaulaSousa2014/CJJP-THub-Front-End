import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherprofileComponent } from './otherprofile.component';

describe('OtherprofileComponent', () => {
  let component: OtherprofileComponent;
  let fixture: ComponentFixture<OtherprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherprofileComponent]
    });
    fixture = TestBed.createComponent(OtherprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
