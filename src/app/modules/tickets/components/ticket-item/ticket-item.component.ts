import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter, OnDestroy
} from '@angular/core';
import {Ticket} from '../../models/ticket';
import {User} from '../../../../models/user';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketItemComponent implements OnInit, OnChanges, OnDestroy {

  private unsubscribe$ = new Subject();

  @Input() ticket: Ticket;
  @Input() users: User[];

  @Output() complete = new EventEmitter<{ticketId: number, isCompleted: boolean}>();
  @Output() changeAssignee = new EventEmitter<{ticketId: number, userId: number}>();

  assigneeControl = new FormControl();
  completedControl = new FormControl();

  usersTrackFn = (i: number, u: User) => u.id;

  constructor() { }

  ngOnInit() {

    this.completedControl.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      tap( () => this.completedControl.disable({emitEvent: false})),
      map(isCompleted => ({ticketId: this.ticket.id, isCompleted}))
    ).subscribe(this.complete);

    this.assigneeControl.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      tap( () => this.assigneeControl.disable({emitEvent: false})),
      map( userId => ({ticketId: this.ticket.id, userId}))
    ).subscribe(this.changeAssignee);

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.ticket && changes.ticket.currentValue) {
      this.assigneeControl.patchValue(this.ticket.assigneeId, {emitEvent: false});
      this.completedControl.patchValue(this.ticket.completed, {emitEvent: false});

      this.assigneeControl.enable({emitEvent: false});
      this.completedControl.enable({emitEvent: false});
    }

    if(!this.users.length) {
      this.assigneeControl.disable({emitEvent: false});
    } else {
      this.assigneeControl.enable({emitEvent: false});
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
