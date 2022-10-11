import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// PRIME NG
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {InputMaskModule} from 'primeng/inputmask';
import {FieldsetModule} from 'primeng/fieldset';
import {RadioButtonModule} from 'primeng/radiobutton';

// ME
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SubjectsListComponent } from './pages/subjects/subjects-list/subjects-list.component';
import { BooksListComponent } from './pages/books/books-list/books-list.component';
import { SubjectsFormComponent } from './pages/subjects/subjects-form/subjects-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutorService, BookService, SubjectService } from '@frontend/book-admin';
import { BooksFormComponent } from './pages/books/books-form/books-form.component';
import { AutorsListComponent } from './pages/autors/autors-list/autors-list.component';
import { AutorsFormComponent } from './pages/autors/autors-form/autors-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthBaseModule, JwtInterceptor } from '@frontend/auth-base';
import { UtilsModule } from '@frontend/utils';

const UX_MODULE = [
  CardModule,
  InputTextModule,
  ToastModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  ConfirmDialogModule,
  InputSwitchModule,
  ColorPickerModule,
  TagModule,
  DropdownModule,
  EditorModule,
  InputMaskModule,
  FieldsetModule,
  RadioButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    SubjectsListComponent,
    BooksListComponent,
    SubjectsFormComponent,
    BooksFormComponent,
    AutorsListComponent,
    AutorsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    UtilsModule,
    ...UX_MODULE,

    AuthBaseModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [
    MessageService,
    ConfirmationService,
    SubjectService,
    AutorService,
    BookService,
    {provide: HTTP_INTERCEPTORS , useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
