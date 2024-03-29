// ANGULAR
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityDataModule,
  EntityMetadataMap,
  DefaultDataServiceConfig,
} from '@ngrx/data';

// ME
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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
import { HttpErrorInterceptor, UtilsModule } from '@frontend/utils';
import * as fromRoot from './reducers';
import { environment } from '@env/environment';

const entityMetadata: EntityMetadataMap = {
  Book: {},
};
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.API_URL,
}

// export const entityConfig = {
//   entityMetadata,
// };

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    AuthNavbarComponent,
    MainComponent,
  ],
  imports: [
    BookBaseModule,
    UtilsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AuthBaseModule.forRoot(),
    StoreModule.forRoot(fromRoot.reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    // EntityDataModule.forRoot({}),
  ],
  providers: [
    MessageService,
    // {provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
