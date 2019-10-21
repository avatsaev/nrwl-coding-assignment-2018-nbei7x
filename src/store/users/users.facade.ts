import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../';
import {loadAllUsers, loadUser} from './users.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {

  users$ = this.store.pipe(
    select(fromRoot.selectAllUsers)
  );

  constructor(private store: Store<fromRoot.State>) {}

  loadAllUsers() {
    this.store.dispatch(loadAllUsers())
  }

  loadUser(id: number) {
    this.store.dispatch(loadUser({userId: id}))
  }

  getUserById(id: number) {
    return this.store.pipe(
      select(fromRoot.getUserById(id))
    )
  }
}
