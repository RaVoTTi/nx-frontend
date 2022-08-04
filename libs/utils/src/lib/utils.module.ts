import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgDirective } from './directives/error-msg.directive';
import { ActionOutsideDirective } from './directives/action-outside.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ErrorMsgDirective,
    ActionOutsideDirective
  ],
  exports: [
    ErrorMsgDirective,
    ActionOutsideDirective

  ],
})
export class UtilsModule {}
