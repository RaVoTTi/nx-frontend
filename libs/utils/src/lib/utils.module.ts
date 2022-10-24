import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgDirective } from './directives/error-msg.directive';
import { ActionOutsideDirective } from './directives/action-outside.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PressEnterDirective } from './directives/press-enter.directive';
@NgModule({
  imports: [CommonModule, ],
  declarations: [
    DropdownComponent,
    SpinnerComponent,
    ErrorMsgDirective,
    ActionOutsideDirective,
    PressEnterDirective,

  ],
  exports: [
    PressEnterDirective,
    DropdownComponent,
    SpinnerComponent,
    ErrorMsgDirective,
    ActionOutsideDirective,


  ],
  
})
export class UtilsModule {}
