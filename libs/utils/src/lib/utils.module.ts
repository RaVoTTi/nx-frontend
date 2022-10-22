import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgDirective } from './directives/error-msg.directive';
import { ActionOutsideDirective } from './directives/action-outside.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
@NgModule({
  imports: [CommonModule],
  declarations: [
    SearchHeaderComponent,
    DropdownComponent,
    SpinnerComponent,
    ErrorMsgDirective,
    ActionOutsideDirective,

  ],
  exports: [
    SearchHeaderComponent,

    DropdownComponent,
    SpinnerComponent,
    ErrorMsgDirective,
    ActionOutsideDirective,


  ],
  
})
export class UtilsModule {}
