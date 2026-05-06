import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardSidebarComponent } from '../../shared/components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardTopNavComponent } from '../../shared/components/dashboard-top-nav/dashboard-top-nav.component';
import { RaffleFilterBarComponent } from './components/raffle-filter-bar/raffle-filter-bar.component';
import { RaffleTableComponent } from './components/raffle-table/raffle-table.component';

@Component({
  selector: 'app-raffle-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    DashboardSidebarComponent,
    DashboardTopNavComponent,
    RaffleFilterBarComponent,
    RaffleTableComponent
],
  templateUrl: './raffle-dashboard.component.html'
})
export class RaffleDashboardComponent {

}
