import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Ticket} from '../../models/ticket';
import {createReducer, on} from '@ngrx/store';
import {
  createTicketSuccess,
  loadAllTickets,
  loadAllTicketsFailure,
  loadAllTicketsSuccess, loadTicketSuccess,
  setFilter, setTicketAssigneeSuccess,
  setTicketCompletedSuccess
} from '../actions/tickets.actions';
import {escapeRegExp} from '../../../../helpers';

export const adapter = createEntityAdapter<Ticket>({
  selectId: (ticket: Ticket) => ticket.id
});

export interface State extends EntityState<Ticket> {
  filter?: string;
  isLoading: boolean;
}

export const INIT_STATE: State = adapter.getInitialState({
  filter: undefined,
  isLoading: false
});

export const reducer = createReducer(INIT_STATE,
  on(loadAllTickets,
    state => ({...state, isLoading: true})
  ),
  on(loadAllTicketsSuccess,
    (state, {tickets}) => adapter.addAll(tickets, {...state, isLoading: false})
  ),
  on(loadAllTicketsFailure,
    state => ({...state, isLoading: false})
  ),
  on(loadTicketSuccess,
    (state, {ticket}) => adapter.upsertOne(ticket, state)
  ),
  on(setFilter,
    (state, {q}) => ({...state, filter: q})
  ),
  on(createTicketSuccess,
    (state, {ticket}) => adapter.addOne(ticket, state)
  ),
  on(setTicketCompletedSuccess, (state, {ticket}) =>
    adapter.updateOne({
      id: ticket.id,
      changes: {completed: ticket.completed}
    }, state)
  ),
  on(setTicketAssigneeSuccess, (state, {ticket}) =>
    adapter.updateOne({
      id: ticket.id,
      changes: {assigneeId: ticket.assigneeId}
    }, state)
  )
);

export const selectIsLoading = (state: State) => state.isLoading;
export const selectFilterQuery = (state: State) => state.filter;

export const byDescription =
  (name: string) =>
    (ticket: Ticket) =>
      ticket.description.toLowerCase().match(`${escapeRegExp(name).toLowerCase()}.*`);

export const selectAllOrFilteredTickets = (q: string, tickets: Ticket[]) =>
  q && q.length > 0 ? tickets.filter(byDescription(q)) : tickets;

export const selectTicketById = (id: number) => (state: State) => state.entities[id];
