import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgDirective } from './directives/error-msg.directive';
import { ActionOutsideDirective } from './directives/action-outside.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { PressEnterDirective } from './directives/press-enter.directive';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    SearchHeaderComponent,
    DropdownComponent,
    SpinnerComponent,
    ErrorMsgDirective,
    ActionOutsideDirective,
    PressEnterDirective,

  ],
  exports: [
    SearchHeaderComponent,
    PressEnterDirective,


    DropdownComponent,
    SpinnerComponent,
    ErrorMsgDirective,
    ActionOutsideDirective,


  ],
  
})
export class UtilsModule {}
