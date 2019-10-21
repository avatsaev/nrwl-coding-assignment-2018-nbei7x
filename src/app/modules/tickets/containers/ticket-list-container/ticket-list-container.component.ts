import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TicketsFacade} from '../../store/facades/tickets.facade';
import {UsersFacade} from '../../../../store/users/users.facade';
import {shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../../../../models/user';
import {Ticket} from '../../models/ticket';

@Component({
  selector: 'app-ticket-list-container',
  templateUrl: './ticket-list-container.component.html',
  styleUrls: ['./ticket-list-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListContainerComponent implements OnInit {

  tickets$ = this.ticketsFacade.allOrFilteredTickets$;
  isLoading$ = this.ticketsFacade.isLoading$.pipe(
    shareReplay()
  );
  users$: Observable<User[]> = this.usersFacade.users$.pipe(
    shareReplay()
  );

  ticketsTrackFn = (i: number, t: Ticket) => t.id;

  constructor(
    private ticketsFacade: TicketsFacade,
    private usersFacade: UsersFacade
  ) {}

  ngOnInit(): void {
    this.ticketsFacade.loadAll();
  }

  onFilterChange(q: string) {
    this.ticketsFacade.setFilter(q);
  }

  onComplete({ticketId, isCompleted}: {ticketId: number, isCompleted: boolean}) {
    this.ticketsFacade.setCompleted(ticketId, isCompleted);
  }

  onChangeAssignee({ticketId, userId}: {ticketId: number, userId: number}) {
    this.ticketsFacade.setAssignee(ticketId, userId)
  }

}
