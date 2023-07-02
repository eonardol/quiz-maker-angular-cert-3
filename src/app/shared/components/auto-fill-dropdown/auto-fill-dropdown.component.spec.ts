import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFillDropdownComponent } from './auto-fill-dropdown.component';
import { Category } from 'src/app/models/data.models';

describe('AutoFillDropdownComponent', () => {
  let component: AutoFillDropdownComponent<Category>;
  let fixture: ComponentFixture<AutoFillDropdownComponent<Category>>;

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
