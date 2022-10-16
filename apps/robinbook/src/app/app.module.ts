// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// ME
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BooksListComponent } from './pages/books/books-list/books-list.component';
import { BookViewComponent } from './pages/books/book-view/book-view.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MessageService } from 'primeng/api';
import { BookBaseModule } from '@frontend/book-base';
import { MainComponent } from './shared/main/main.component';
import { AuthBaseModule, JwtInterceptor } from '@frontend/auth-base';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthNavbarComponent } from './shared/auth-navbar/auth-navbar.component';
import { TestComponent } from './pages/test/test.component';
import { UtilsModule } from '@frontend/utils';
import * as fromRoot from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';



@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookViewComponent,
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
    UtilsModule,
    AuthBaseModule.forRoot(),
    StoreModule.forRoot(fromRoot.reducers),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
  
  ],
  providers: [
    MessageService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
