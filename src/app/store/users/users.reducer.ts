import {User} from '../../models/user';
import {createReducer, on} from '@ngrx/store';
import {loadAllUsersSuccess, loadUserSuccess} from './users.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';


export const adapter = createEntityAdapter<User>();

export interface State extends EntityState<User> {
}

export const INIT_STATE: State = adapter.getInitialState();


export const reducer = createReducer(INIT_STATE,
  on(loadAllUsersSuccess, (state, {users}) => adapter.addAll(users, state)),
  on(loadUserSuccess, ((state, {user}) => adapter.upsertOne(user, state)))
);

export const getUserById = (id: number) => (state: State) => state.entities[id];
