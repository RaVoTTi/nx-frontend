import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySettingsComponent } from './pages/my-settings/my-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule } from '@frontend/utils';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MySettingsComponent,
  },
];

@NgModule({
  imports: [CommonModule,UtilsModule,ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [ MySettingsComponent],
})
export class SettingsModule {}
