import {createAction, props} from '@ngrx/store';
import {Ticket} from '../../models/ticket';
import {act} from '@ngrx/effects';

export const loadAllTickets = createAction(
  '[Tickets] Load all'
);

export const loadAllTicketsSuccess = createAction(
  '[Tickets] Load all success',
  props<{tickets: Ticket[]}>()
);



export const loadTicket = createAction(
  '[Tickets] Load',
  props<{ticketId: number}>()
);


export const loadTicketSuccess = createAction(
  '[Tickets] Load success',
  props<{ticket: Ticket}>()
);


export const loadTicketFailure = createAction(
  '[Tickets] Load failure',
  props<{err: any}>()
);


export const loadAllTicketsFailure = createAction(
  '[Tickets] Load all failure',
  props<{err: any}>()
);


export const createTicket  = createAction(
    '[Tickets] create',
    props<{ticket: Partial<Ticket>}>()
);

export const createTicketSuccess  = createAction(
    '[Tickets] Create success',
    props<{ticket: Ticket}>()
);

export const createTicketFailure  = createAction(
    '[Tickets] Create failure',
    props<{err: any}>()
);

export const setFilter = createAction(
  '[Tickets] Set filter',
  props<{q?: string}>()
);



export const setTicketCompleted = createAction(
  '[Tickets] Set completed',
  props<{ticketId: number, isCompleted: boolean}>()
);


export const setTicketCompletedSuccess = createAction(
  '[Tickets] Set completed success',
  props<{ticket: Ticket}>()
);


export const setTicketCompletedFailure = createAction(
  '[Tickets] Set completed failure',
  props<{err: any}>()
);



export const setTicketAssignee = createAction(
  '[Tickets] Set assignee',
  props<{userId: number, ticketId: number}>()
);


export const setTicketAssigneeSuccess = createAction(
  '[Tickets] Set assignee success',
  props<{ticket: Ticket}>()
);


export const setAssigneeFailure = createAction(
  '[Tickets] Set assignee failure',
  props<{err: any}>()
);
