import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  createTicket,
  loadAllTickets,
  loadTicket,
  setFilter,
  setTicketAssignee,
  setTicketCompleted
} from '../actions/tickets.actions';
import {Observable} from 'rxjs';
import {Ticket} from '../../models/ticket';
import * as fromTickets from '../reducers';
import {State} from '../reducers/tickets.reducer';

@Injectable()
export class TicketsFacade {

  allTickets$: Observable<Ticket[]> = this.store.pipe(
    select(fromTickets.selectAllTickets)
  );

  allOrFilteredTickets$ = this.store.pipe(
    select(fromTickets.selectAllOrFilteredTickets)
  );

  isLoading$ = this.store.pipe(
    select(fromTickets.selectIsLoading)
  );

  filter$ = this.store.pipe(
    select(fromTickets.selectFilterQuery)
  );

  totalTickets$: Observable<number> = this.store.pipe(
    select(fromTickets.selectTotalTickets)
  );

  constructor(private store: Store<State>) {}

  loadAll() {
    this.store.dispatch(loadAllTickets());
  }

  loadTicket(id: number) {
    this.store.dispatch(loadTicket({ticketId: id}))
  }

  setFilter(q: string) {
    this.store.dispatch(setFilter({q}));
  }

  setCompleted(ticketId: number, isCompleted: boolean) {
    this.store.dispatch(setTicketCompleted({ticketId, isCompleted}))
  }

  setAssignee(ticketId: number, userId: number) {
    this.store.dispatch(setTicketAssignee({userId, ticketId}));
  }

  getTicketById(id: number) {
    return this.store.pipe(
      select(fromTickets.selectTicketById(id))
    );
  }

  createTicket(ticket: Partial<Ticket>) {
    this.store.dispatch(createTicket({ticket}));
  }
}
