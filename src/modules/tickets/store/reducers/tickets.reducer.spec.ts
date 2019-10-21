import {Ticket} from '../../models/ticket';
import * as fromTickets from './tickets.reducer';
import {
  createTicketSuccess,
  loadAllTicketsSuccess,
  loadTicketSuccess, setFilter,
  setTicketAssigneeSuccess,
  setTicketCompletedSuccess
} from '../actions/tickets.actions';

describe("Tickets reducer", () => {

  const tickets: Ticket[] = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assigneeId: 111,
      completed: false
    }
  ];

  let state: fromTickets.State;
  const reducer = fromTickets.reducer;

  beforeEach(() => {
    state = reducer(undefined, {type: 'NOOP'});
  });


  it('should set initial state', function () {
    expect(state).toEqual(fromTickets.INIT_STATE);
  });

  it('should load all tickets', function () {
    const action = loadAllTicketsSuccess({tickets});
    const newState = reducer(state, action);

    expect(newState.ids.length).toEqual(tickets.length);
    fromTickets.adapter.getSelectors().selectAll(newState).map( (t,i) =>
        expect(t).toEqual(tickets[i])
    )
  });


  it('should load a ticket', function () {
    const ticket = {id: 22, assigneeId: 111, completed: false, description: 'test'};
    const action = loadTicketSuccess({ticket});
    const newState = reducer(state, action);
    expect(newState.entities[ticket.id]).toBeTruthy();
    expect(newState.entities[ticket.id]).toEqual(ticket);
  });

  it('should filter', function () {
    state = reducer(state, loadAllTicketsSuccess({tickets}));
    const action = setFilter({q: 'arm'});
    const newState = reducer(state, action);

    const q = newState.filter;
    const stateTickets = fromTickets.adapter.getSelectors().selectAll(newState);

    const filterResult = fromTickets.selectAllOrFilteredTickets(q, stateTickets);

    expect(filterResult.length).toEqual(1);
    expect(filterResult[0]).toEqual(tickets[0])
  });


  describe('Writes and updates', () => {

    beforeEach(() => {
      state = reducer(state, loadAllTicketsSuccess({tickets}));
    });


    it('should set a ticket to completed', function () {
      const ticket = tickets[0];

      let action = setTicketCompletedSuccess({ticket: {...ticket, completed: true}})

      const newState = reducer(state, action);

      expect(newState.entities[ticket.id].completed).toEqual(true);

    });


    it('should assign a user', function () {
      const ticket = tickets[0];
      const userId = 34;

      const action = setTicketAssigneeSuccess({ticket: {...ticket, assigneeId: userId}});
      const newState = reducer(state, action);

      expect(newState.entities[ticket.id].assigneeId).toEqual(userId);
    });

    it('should create a ticket', function () {
      const ticket = {id: 22, assigneeId: 111, completed: false, description: 'test'};
      const action = createTicketSuccess({ticket});

      const newState = reducer(state, action);
      expect(newState.entities[ticket.id]).toBeTruthy();
      expect(newState.entities[ticket.id]).toEqual(ticket);

    });

  })

});
