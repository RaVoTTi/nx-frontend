// ANGULAR
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// ME
// import { authReducer } from './state/auth.reducer';
// import { AuthEffects } from './state/auth.effects';
import { AuthBaseService } from './services/auth-base.service';
import { LoginGuard } from './guards/login.guard';
import { authReducer } from './reducers';
// import { LoginGuard } from './guard/login.guard';
// import { JwtInterceptor } from './services/jwt.interceptor';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
  ],
})
export class AuthBaseModule {
  static forRoot(): ModuleWithProviders<AuthBaseModule> {
    return {
      ngModule: AuthBaseModule,
      providers: [
        AuthBaseService,
        LoginGuard
      ],
    };
  }
}
