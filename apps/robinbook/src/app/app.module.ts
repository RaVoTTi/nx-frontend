// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// PRIME NG
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { RatingModule } from 'primeng/rating';
import {SplitButtonModule} from 'primeng/splitbutton';
// ME
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BooksListComponent } from './pages/books/books-list/books-list.component';
import { BooksViewComponent } from './pages/books/books-view/books-view.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { MyLearningListComponent } from './pages/myLearning/my-learning-list/my-learning-list.component';
import { MyLearningViewComponent } from './pages/myLearning/my-learning-view/my-learning-view.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { OrderModule } from '@frontend/order';
import { UiModule } from '@frontend/ui';
import { MessageService } from 'primeng/api';

const UX_MODULE = [
  MenubarModule,
  AccordionModule,
  DividerModule,
  ButtonModule,
  CardModule,
  TabMenuModule,
  MenuModule,
  InputTextModule,
  TabViewModule,
  RatingModule,
  SplitButtonModule
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
    BookItemComponent,
    BooksListComponent,
    BooksViewComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    MyLearningListComponent,
    MyLearningViewComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    HttpClientModule,
    OrderModule,

    UiModule,
    ...UX_MODULE,
  ],
  providers: [
    MessageService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
