import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoFillDropdownComponent } from './components/auto-fill-dropdown/auto-fill-dropdown.component';
import { EnlightUserInputPipe } from './pipes/enlight-user-input.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';



@NgModule({
  declarations: [
    AutoFillDropdownComponent,
    EnlightUserInputPipe,
    SubHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AutoFillDropdownComponent,
    SubHeaderComponent
  ]
})
export class SharedModule { }
