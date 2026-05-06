import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardSidebarComponent } from '../../shared/components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardTopNavComponent } from '../../shared/components/dashboard-top-nav/dashboard-top-nav.component';
import { StaffTableComponent } from './components/staff-table/staff-table.component';
import { InviteMemberModalComponent } from './components/invite-member-modal/invite-member-modal.component';

@Component({
  selector: 'app-staff-management',
  standalone: true,
  imports: [RouterModule, DashboardSidebarComponent, DashboardTopNavComponent, StaffTableComponent, InviteMemberModalComponent],
  templateUrl: './staff-management.component.html',
})
export class StaffManagementComponent {
  showInviteModal = signal(false);
}
