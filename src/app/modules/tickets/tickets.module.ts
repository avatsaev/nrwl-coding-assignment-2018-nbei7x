import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListContainerComponent } from './containers/ticket-list-container/ticket-list-container.component';
import { TicketDetailsContainerComponent } from './containers/ticket-details-container/ticket-details-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TicketsRoutingModule} from './tickets-routing.module';
import { TicketsLayoutComponent } from './containers/tickets-layout/tickets-layout.component';
import { TicketItemComponent } from './components/ticket-item/ticket-item.component';
import { TicketsStoreModule } from './store';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';

@NgModule({
  declarations: [
    TicketListContainerComponent,
    TicketDetailsContainerComponent,
    TicketsLayoutComponent,
    TicketItemComponent,
    TicketDetailsComponent,
    TicketFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TicketsStoreModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
