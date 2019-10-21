import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, pluck, startWith, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {BackendService} from '../../services/backend.service';
import {
  loadAllUsers,
  loadAllUsersFailure,
  loadAllUsersSuccess,
  loadUser,
  loadUserFailure,
  loadUserSuccess
} from './users.actions';
import {ToastrService} from 'ngx-toastr';


@Injectable()
export class UserEffects {

  loadAllUsers$ = createEffect( () => this.actions$.pipe(
    ofType(loadAllUsers),
    startWith(loadAllUsers()),
    switchMap( () => this.backendService.users().pipe(
      map(users => loadAllUsersSuccess({users})),
      catchError( err => of(loadAllUsersFailure(err)))
    ))
  ));

  load$ = createEffect(() => this.actions$.pipe(
    ofType(loadUser),
    pluck('userId'),
    switchMap( id => this.backendService.user(id).pipe(
      map(user => loadUserSuccess({user})),
      catchError(err => of(loadUserFailure({err})))
    ))
  ));

  failure$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserFailure, loadAllUsersFailure),
      tap( ({err}) =>  this.toastr.error(err))
  ), {dispatch: false});

  constructor(
      private actions$: Actions,
      private backendService: BackendService,
      private toastr: ToastrService
  ) {}
}
