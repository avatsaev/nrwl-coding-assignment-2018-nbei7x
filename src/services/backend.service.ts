import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import {Ticket} from '../modules/tickets/models/ticket';
import {User} from '../models/user';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */



function randomDelay() {
  return Math.random() * 4000;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  storedTickets: Ticket[] = [
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

  storedUsers: User[] = [
      { id: 111, name: 'Victor' },
      { id: 112, name: 'Jeff' },
      { id: 113, name: 'Aslan' },
    ];

  lastId = 1;

  constructor() { }

  private findTicketById = id =>
    this.storedTickets.find(ticket => ticket.id === +id);
  private findUserById = id => this.storedUsers.find(user => user.id === +id);

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket> {

    const ticket = this.findTicketById(id);
    if(ticket) {
      return of(ticket).pipe(delay(randomDelay()));
    }

    return throwError('ticket not found')
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {

    const user = this.findUserById(id);
    if(user) {
      return of(user).pipe(delay(randomDelay()));
    }

    return throwError('user not found');
  }

  newTicket(payload: Partial<Ticket>) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: payload.assigneeId,
      completed: false
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => this.storedTickets.push(ticket))
    );
  }

  assign(ticketId: number, userId: number) {
    const foundTicket = this.findTicketById(+ticketId);
    const user = this.findUserById(+userId);

    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.assigneeId = user.id;
        })
      );
    }

    return throwError(new Error('ticket or user not found'));
  }

  complete(ticketId: number, completed: boolean) {
    const foundTicket = this.findTicketById(+ticketId);
    if (foundTicket) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          // there was a bug here, assignment to 'false' instead of to the value of `completed`'
          ticket.completed = completed;
        })
      );
    }

    return throwError(new Error('ticket not found'));
  }
}
