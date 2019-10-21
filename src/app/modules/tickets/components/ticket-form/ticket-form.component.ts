import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../../../../models/user';
import {Ticket} from '../../models/ticket';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketFormComponent implements OnChanges {

  @Input() users: User[];
  usersTrackFn = (i: number, u: User) => u.id;

  @Output() createTicket = new EventEmitter<Partial<Ticket>>();
  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    description: ['', Validators.required],
    assigneeId: [null]
  });

  constructor(private fb: FormBuilder) { }

  ngOnChanges(){

    if(this.users.length) {
      this.form.patchValue({
        assigneeId: this.users[0].id
      })
    }
  }

}
