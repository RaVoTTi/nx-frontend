// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// PRIME NG
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DividerModule} from 'primeng/divider';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {TabMenuModule} from 'primeng/tabmenu';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
// ME
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { UiModule } from '@frontend/ui';
import { BooksListComponent } from './pages/books/books-list/books-list.component';
import { BooksViewComponent } from './pages/books/books-view/books-view.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

const UX_MODULE = [
  MenubarModule,
  AccordionModule,
  DividerModule,
  ButtonModule,
  CardModule,
  TabMenuModule,
  InputTextModule,
  TabViewModule
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
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BooksListComponent,
    BooksViewComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UiModule,
    ...UX_MODULE
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
