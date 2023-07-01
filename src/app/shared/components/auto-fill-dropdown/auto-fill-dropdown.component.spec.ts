import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFillDropdownComponent } from './auto-fill-dropdown.component';

describe('AutoFillDropdownComponent', () => {
  let component: AutoFillDropdownComponent;
  let fixture: ComponentFixture<AutoFillDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoFillDropdownComponent]
    });
    fixture = TestBed.createComponent(AutoFillDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
