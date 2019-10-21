import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TicketListContainerComponent} from './containers/ticket-list-container/ticket-list-container.component';
import {TicketDetailsContainerComponent} from './containers/ticket-details-container/ticket-details-container.component';
import {TicketsLayoutComponent} from './containers/tickets-layout/tickets-layout.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: TicketsLayoutComponent,
    children: [
      {
        path: '',
        component: TicketListContainerComponent
      },
      {
        path: ':id',
        component: TicketDetailsContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class TicketsRoutingModule { }
