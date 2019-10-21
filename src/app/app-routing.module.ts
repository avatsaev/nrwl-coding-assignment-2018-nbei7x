import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tickets',
    loadChildren: () => import('./modules/tickets/tickets.module').then(m => m.TicketsModule)
  },
  {
    path: '**',
    redirectTo: 'tickets',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
