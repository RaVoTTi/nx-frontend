// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// PRIME NG
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { RatingModule } from 'primeng/rating';
import { SplitButtonModule } from 'primeng/splitbutton';
// ME
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BooksListComponent } from './pages/books/books-list/books-list.component';
import { BooksViewComponent } from './pages/books/books-view/books-view.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UiModule } from '@frontend/ui';
import { MessageService } from 'primeng/api';
import { BookBaseModule } from '@frontend/book-base';
import { MainComponent } from './shared/main/main.component';
import { AuthModule, JwtInterceptor } from '@frontend/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthNavbarComponent } from './shared/auth-navbar/auth-navbar.component';
import { ToastModule } from 'primeng/toast';
import { TestComponent } from './pages/test/test.component';

const UX_MODULE = [
  MenubarModule,
  AccordionModule,
  DividerModule,
  CardModule,
  MenuModule,
  ToastModule,

  RatingModule,
  // InputTextModule,
  // ToastModule,
  // ToolbarModule,
  // ButtonModule,
  // TableModule,
  // ConfirmDialogModule,
  // InputSwitchModule,
  // ColorPickerModule,
  // TagModule,
  // DropdownModule,
  // EditorModule,
  // InputMaskModule,
  // FieldsetModule
];

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BooksViewComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    AuthNavbarComponent,

    MainComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BookBaseModule,
    ReactiveFormsModule,
    FormsModule,

    UiModule,
    ...UX_MODULE,

    AuthModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
