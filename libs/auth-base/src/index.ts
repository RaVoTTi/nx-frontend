

// MODULE
export * from './lib/auth-base.module';


// NGRX
export * from './lib/reducer/index'
export * as authSelectors from './lib/auth.selectors'

export * from './lib/actions/action-type'

// INTERFACES
export * from './lib/interfaces/IAuth'
export * from './lib/interfaces/IRegister'


// GUARDS
export * from './lib/guards/IsLoggedOut.guard';

export * from './lib/guards/IsLoggedIn.guard';
export * from './lib/guards/auth-admin.guard';

// SERVICES
export * from './lib/services/jwt.interceptor';
export * from './lib/services/auth-base.service';
export * from './lib/services/local-storage.service';