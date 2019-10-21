
import * as fromUsers from './users/users.reducer';
import {InjectionToken} from '@angular/core';
import {Action, ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  users: fromUsers.State;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('RootReducersToken', {
  factory: () => ({
    users: fromUsers.reducer
  })
});

export const selectUsersState = createFeatureSelector<State, fromUsers.State>('users');


export const {
  selectAll: selectAllUsers,
} = fromUsers.adapter.getSelectors(selectUsersState);


export const getUserById = (id: number) => createSelector(selectUsersState, fromUsers.getUserById(id));
