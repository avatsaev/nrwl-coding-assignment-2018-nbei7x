import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TicketsEffects} from './effects/tickets.effects';
import {TicketsFacade} from './facades/tickets.facade';
import {reducers} from './reducers';

@NgModule({
  imports: [
    StoreModule.forFeature('tickets', reducers),
    EffectsModule.forFeature([TicketsEffects])
  ],
  providers: [TicketsFacade],
})
export class TicketsStoreModule {}
