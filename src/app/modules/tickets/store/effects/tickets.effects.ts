import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  createTicket, createTicketFailure, createTicketSuccess,
  loadAllTickets,
  loadAllTicketsFailure,
  loadAllTicketsSuccess,
  loadTicket,
  loadTicketFailure,
  loadTicketSuccess,
  setAssigneeFailure,
  setTicketAssignee,
  setTicketAssigneeSuccess,
  setTicketCompleted,
  setTicketCompletedFailure,
  setTicketCompletedSuccess
} from '../actions/tickets.actions';
import {
  catchError,
  concatMap,
  map, mergeMap,
  pluck,
  retry,
  switchMap,
  tap,
} from 'rxjs/operators';
import {of} from 'rxjs';
import {BackendService} from '../../../../services/backend.service';
import {UsersFacade} from '../../../../store/users/users.facade';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable()
export class TicketsEffects {

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllTickets),
    switchMap( _ => this.ticketsService.tickets().pipe(
      retry(3),
      map(tickets => loadAllTicketsSuccess({tickets})),
      catchError( err => of(loadAllTicketsFailure({err})))
    ))
  ));

  load$ = createEffect(() => this.actions$.pipe(
      ofType(loadTicket),
      pluck('ticketId'),
      switchMap(id => this.ticketsService.ticket(id).pipe(
        map(ticket => loadTicketSuccess({ticket})),
        catchError(err => {
          this.router.navigate(['/tickets']);
          return of(loadTicketFailure({err}))
        })
      ))
  ));


  create$ = createEffect(() => this.actions$.pipe(
    ofType(createTicket),
    pluck('ticket'),
    mergeMap(ticket => this.ticketsService.newTicket(ticket).pipe(
      map(ticket => createTicketSuccess({ticket})),
      catchError(err => of(createTicketFailure({err})))
    ))
  ));


  createSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(createTicketSuccess),
    pluck('ticket'),
    tap(ticket => this.toastr.success(
      `Ticket ${ticket.id} created`
    ))
  ), {dispatch: false});

  setCompleted$ = createEffect(() => this.actions$.pipe(
    ofType(setTicketCompleted),
    concatMap( ({ticketId, isCompleted}) => this.ticketsService.complete(ticketId, isCompleted).pipe(
      map(ticket => setTicketCompletedSuccess({ticket})),
      catchError( err => of(setTicketCompletedFailure({err})))
    ))
  ));

  setCompletedSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(setTicketCompletedSuccess),
    pluck('ticket'),
    tap( ticket =>
      this.toastr.success(
        `Ticket ${ticket.id} ${ticket.completed ? 'completed' : 'uncompleted'}`
      )
    )
  ), {dispatch: false});

  failure$ = createEffect(() => this.actions$.pipe(
    ofType(setTicketCompletedFailure, setAssigneeFailure, loadAllTicketsFailure, loadTicketFailure),
    tap( ({err}) =>  this.toastr.error(err))
  ), {dispatch: false});


  setAssignee$ = createEffect(() => this.actions$.pipe(
    ofType(setTicketAssignee),
    concatMap( ({ticketId, userId}) => this.ticketsService.assign(ticketId, userId).pipe(
      map(ticket => setTicketAssigneeSuccess({ticket})),
      catchError(err => of(setAssigneeFailure({err})))
    ))
  ));

  setAssigneeSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(setTicketAssigneeSuccess),
    pluck('ticket'),
    switchMap(ticket => this.usersFacade.getUserById(ticket.assigneeId).pipe(
      tap( u => this.toastr.success(
        `Ticket ${ticket.id} assigned to ${u.name}`
      ))
    ))
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private ticketsService: BackendService,
    private usersFacade: UsersFacade,
    private toastr: ToastrService,
    private router: Router
  ) {}
}
