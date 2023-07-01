import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FormControl } from '@angular/forms';

interface Props {
  id: number;
  name: string;
}

@Component({
  selector: 'auto-fill-dropdown',
  templateUrl: './auto-fill-dropdown.component.html',
  styleUrls: ['./auto-fill-dropdown.component.css']
})
export class AutoFillDropdownComponent<T extends Required<Props>> {
  _source!: T[];

  @Input()
  set source(value: T[]) {
    this._source = value;
    this.userInputFormControl.setValue('');
  }

  userInputFormControl: FormControl = new FormControl();

  @Input()
  fc!: FormControl;

  @Input()
  placeholder!: string;
  
  filtered$!: Observable<T[] | null | undefined>;

  @Output()
  onChange: EventEmitter<T> = new EventEmitter();

  ngOnInit(): void {
    this.filtered$ = this.userInputFormControl.valueChanges.pipe(
      map((userInput)=>{
        return this._source?.filter(c => c.name?.toLowerCase().indexOf(userInput.toLowerCase()) !== -1)
      })
    );
  }

  

  updateValue(item: any) {
    // set only name in "fake" form input 
    this.userInputFormControl.setValue(item.name);

    // set entire object in real form input end emit to parent components
    this.fc.setValue(item);
    this.onChange.emit(item);
  }
}
