import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Ticket} from '../../models/ticket';
import {UsersFacade} from '../../../../store/users/users.facade';
import {TicketsFacade} from '../../store/facades/tickets.facade';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-ticket-details-container',
  templateUrl: './ticket-details-container.component.html',
  styleUrls: ['./ticket-details-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsContainerComponent implements OnInit {

  ticket$: Observable<Ticket>;

  constructor(
      private route: ActivatedRoute,
      private usersFacade: UsersFacade,
      private ticketsFacade: TicketsFacade
  ) { }

  ngOnInit() {
    this.ticket$ = this.route.params.pipe(
      map(params => +params.id),
      tap(id => this.ticketsFacade.loadTicket(id)),
      switchMap(id => this.ticketsFacade.getTicketWithUser(id)),
      tap(ticket => this.usersFacade.getUserById(ticket.assigneeId))
    );
  }

}
