import {ChangeDetectionStrategy, Component} from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <h1>Ticket manager</h1>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
