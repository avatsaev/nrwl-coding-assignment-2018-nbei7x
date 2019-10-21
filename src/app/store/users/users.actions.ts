import {createAction, props} from '@ngrx/store';
import {User} from '../../models/user';

export const loadAllUsers = createAction(
  '[Users] Load all'
);

export const loadAllUsersSuccess = createAction(
  '[Users] Load all success',
  props<{users: User[]}>()
);

export const loadAllUsersFailure = createAction(
  '[Users] Load all failure',
  props<{err: any}>()
);

export const loadUser = createAction(
  '[Users] Load',
  props<{userId: number}>()
);


export const loadUserSuccess = createAction(
  '[Users] Load success',
  props<{user: User}>()
);


export const loadUserFailure = createAction(
  '[Users] Load failure',
  props<{err: any}>()
);
