import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofilepruebaComponent } from './editprofileprueba.component';

describe('EditprofilepruebaComponent', () => {
  let component: EditprofilepruebaComponent;
  let fixture: ComponentFixture<EditprofilepruebaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditprofilepruebaComponent]
    });
    fixture = TestBed.createComponent(EditprofilepruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
