import { Component, ChangeDetectionStrategy } from '@angular/core';
import {UsersFacade} from '../../../../store/users/users.facade';
import {Observable} from 'rxjs';
import {User} from '../../../../models/user';
import {Ticket} from '../../models/ticket';
import {TicketsFacade} from '../../store/facades/tickets.facade';

@Component({
  selector: 'app-tickets-layout',
  templateUrl: './tickets-layout.component.html',
  styleUrls: ['./tickets-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsLayoutComponent {
  users$: Observable<User[]> = this.usersFacade.users$;
  displayTicketForm = false;
  constructor(private usersFacade: UsersFacade, private ticketsFacade: TicketsFacade){}

  onTicketCreate(ticket: Partial<Ticket>) {
    this.ticketsFacade.createTicket(ticket);
    this.toggleTicketForm();
  }

  toggleTicketForm() {
    this.displayTicketForm = !this.displayTicketForm;
  }
}
