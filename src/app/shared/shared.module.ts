import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoFillDropdownComponent } from './components/auto-fill-dropdown/auto-fill-dropdown.component';
import { EnlightUserInputPipe } from './pipes/enlight-user-input.pipe';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AutoFillDropdownComponent,
    EnlightUserInputPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AutoFillDropdownComponent
  ]
})
export class SharedModule { }
