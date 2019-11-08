import * as fromTickets from './tickets.reducer';
import {Action, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUsers from '../../../../store/index';
import {Ticket} from '../../models/ticket';


// Export reducer in an AOT compatible way
// there is no need to combineReducers, because there only one of them
export function reducers(state: fromTickets.State | undefined, action: Action) {
  return fromTickets.reducer(state, action);
}

export const ticketsFeatureStateSelector = createFeatureSelector<fromTickets.State>('tickets');

export const {
  selectAll: selectAllTickets,
  selectTotal: selectTotalTickets,
} = fromTickets.adapter.getSelectors(ticketsFeatureStateSelector);

export const selectIsLoading = createSelector(ticketsFeatureStateSelector, fromTickets.selectIsLoading);
export const selectFilterQuery = createSelector(ticketsFeatureStateSelector, fromTickets.selectFilterQuery);

export const selectAllOrFilteredTickets = createSelector(
  selectFilterQuery,
  selectAllTickets,
  fromTickets.selectAllOrFilteredTickets
);

export const selectTicketById = (id: number) => createSelector(ticketsFeatureStateSelector, fromTickets.selectTicketById(id));

export const selectTicketWithUserById = (id: number) =>
    createSelector(
        selectTicketById(id),
        fromUsers.selectUserEntities,
        (ticket, users) => (ticket ? {...ticket, user: users[ticket.assigneeId] } as Ticket : undefined)
    );
