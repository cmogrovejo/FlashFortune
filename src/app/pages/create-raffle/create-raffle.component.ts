import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardSidebarComponent } from '../../shared/components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardTopNavComponent } from '../../shared/components/dashboard-top-nav/dashboard-top-nav.component';

@Component({
  selector: 'app-create-raffle',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardSidebarComponent, DashboardTopNavComponent],
  templateUrl: './create-raffle.component.html'
})
export class CreateRaffleComponent {

}
