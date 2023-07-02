import { Component, Input, OnInit } from '@angular/core';
import { Observable, map, startWith, tap } from 'rxjs';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Props {
  id: number;
  name: string;
}

@Component({
  selector: 'auto-fill-dropdown',
  templateUrl: './auto-fill-dropdown.component.html',
  styleUrls: ['./auto-fill-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AutoFillDropdownComponent
    }
  ]
})
export class AutoFillDropdownComponent<T extends Required<Props>> implements ControlValueAccessor, OnInit {
  // TODO: implement disabled state
  disabled = false;

  onChange = (value: T | null) => {};

  onTouched = () => {};

  writeValue(obj: T): void {
    if (obj) {
      this.searchFormControl.setValue(obj.name);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  searchFormControl: FormControl = new FormControl();

  @Input()
  source!: T[];

  @Input()
  placeholder!: string;
  
  filtered$!: Observable<T[] | null | undefined>;

  constructor() {
    
  }

  ngOnInit(): void {
    
    this.filtered$ = this.searchFormControl.valueChanges.pipe(
      startWith(''),
      map((userInput)=>{
        return this.source?.filter(c => (new RegExp(userInput, 'gi')).exec(c.name));
      }),
      tap(()=>this.onChange(null))
    );
    
  }

  setValueFromDropdown(item: T) {
    this.searchFormControl.setValue(item.name);
    this.onChange(item);
  }

  markAsTouched(): void {
    this.onTouched();
  }

}
