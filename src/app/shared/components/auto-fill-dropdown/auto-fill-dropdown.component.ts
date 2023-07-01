import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
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
export class AutoFillDropdownComponent<T extends Required<Props>> implements ControlValueAccessor {

  //value!: T | null;
  disabled = false;

  onChange = (value: T | null) => {};

  onTouched = () => {};

  writeValue(obj: T): void {
    //this.value = obj;
    if (obj) {
      this.userInputFormControl.setValue(obj.name);
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

  userInputFormControl: FormControl = new FormControl();

  @Input()
  source!: T[];

  @Input()
  placeholder!: string;
  
  filtered$!: Observable<T[] | null | undefined>;

  constructor() {
    this.filtered$ = this.userInputFormControl.valueChanges.pipe(
      map((userInput)=>{
        return this.source?.filter(c => (new RegExp(userInput, 'gi')).exec(c.name));
      }),
      tap(()=>this.onChange(null))
    );
  }

  ngOnInit(): void {
    

  }

  setValueFromDropdown(item: T) {
    this.userInputFormControl.setValue(item.name);
    //this.value = item;
    this.onChange(item);
  }

  markAsTouched(): void {
    this.onTouched();
  }

}
