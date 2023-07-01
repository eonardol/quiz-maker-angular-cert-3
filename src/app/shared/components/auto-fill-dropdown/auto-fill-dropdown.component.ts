import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Category } from 'src/app/models/data.models';

@Component({
  selector: 'auto-fill-dropdown',
  templateUrl: './auto-fill-dropdown.component.html',
  styleUrls: ['./auto-fill-dropdown.component.css']
})
export class AutoFillDropdownComponent<Type extends Category> {
  _source!: Type[];

  @Input()
  set source(value: Type[]) {
    this._source = value;
    this.userInputFormControl.setValue('');
  }

  userInputFormControl: FormControl = new FormControl();

  @Input()
  fc!: FormControl;

  @Input()
  placeholder!: string;
  
  filtered$!: Observable<Type[] | null | undefined>

  @Output()
  onChange: EventEmitter<Type> = new EventEmitter();

  ngOnInit(): void {
    this.filtered$ = this.userInputFormControl.valueChanges.pipe(
      map((userInput)=>{
        return this._source?.filter(c => c.name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1)
      })
    );
  }

  

  updateValue(item: Type) {
    // set only name in "fake" form input 
    this.userInputFormControl.setValue(item.name);

    // set entire object in real form input end emit to parent components
    this.fc.setValue(item);
    this.onChange.emit(item);
  }
}
