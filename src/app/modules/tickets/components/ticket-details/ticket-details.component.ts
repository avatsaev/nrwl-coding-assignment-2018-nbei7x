import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {User} from '../../../../models/user';
import {Ticket} from '../../models/ticket';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {

  @Input() ticket: Ticket;
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
