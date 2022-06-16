import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthsState, AUTHS_FEATURE_KEY, } from './auths.reducer';

// Lookup the 'Auths' feature state managed by NgRx
export const getAuthsState = createFeatureSelector<AuthsState>(AUTHS_FEATURE_KEY);

export const getUser = createSelector(getAuthsState, (state) => state.user)

export const getIsAuthenticated = createSelector(getAuthsState, (state) => state.isAuthenticated)
