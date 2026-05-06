import { Component, computed, signal } from '@angular/core';

interface Role {
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary';
}

interface StaffMember {
  name: string;
  email: string;
  roles: Role[];
  status: 'active' | 'invited' | 'suspended';
  lastLogin: string;
}

const MOCK_STAFF: StaffMember[] = [
  {
    name: 'Elena Vance',
    email: 'e.vance@moonshotbank.com',
    roles: [
      { label: 'Configurador', variant: 'primary' },
      { label: 'Operador', variant: 'secondary' },
      { label: 'Auditor', variant: 'tertiary' },
    ],
    status: 'active',
    lastLogin: '2 mins ago',
  },
  {
    name: 'Gordon Freeman',
    email: 'g.freeman@moonshotbank.com',
    roles: [{ label: 'Operador', variant: 'secondary' }],
    status: 'invited',
    lastLogin: 'Never',
  },
  {
    name: 'Alyx Vance',
    email: 'a.vance@moonshotbank.com',
    roles: [{ label: 'Auditor', variant: 'tertiary' }],
    status: 'active',
    lastLogin: '1 hour ago',
  },
  {
    name: 'Isaac Kleiner',
    email: 'i.kleiner@moonshotbank.com',
    roles: [{ label: 'Configurador', variant: 'primary' }],
    status: 'active',
    lastLogin: 'Yesterday',
  },
  {
    name: 'Judith Mossman',
    email: 'j.mossman@moonshotbank.com',
    roles: [
      { label: 'Auditor', variant: 'tertiary' },
      { label: 'Operador', variant: 'secondary' },
    ],
    status: 'suspended',
    lastLogin: '3 days ago',
  },
  {
    name: 'Barney Calhoun',
    email: 'b.calhoun@moonshotbank.com',
    roles: [{ label: 'Operador', variant: 'secondary' }],
    status: 'invited',
    lastLogin: 'Never',
  },
  {
    name: 'Wallace Breen',
    email: 'w.breen@moonshotbank.com',
    roles: [
      { label: 'Configurador', variant: 'primary' },
      { label: 'Auditor', variant: 'tertiary' },
    ],
    status: 'active',
    lastLogin: '5 hours ago',
  },
  {
    name: 'Eli Vance',
    email: 'eli.vance@moonshotbank.com',
    roles: [{ label: 'Auditor', variant: 'tertiary' }],
    status: 'active',
    lastLogin: '2 days ago',
  },
  {
    name: 'Adrian Shephard',
    email: 'a.shephard@moonshotbank.com',
    roles: [{ label: 'Operador', variant: 'secondary' }],
    status: 'invited',
    lastLogin: 'Never',
  },
  {
    name: 'Gina Cross',
    email: 'g.cross@moonshotbank.com',
    roles: [
      { label: 'Configurador', variant: 'primary' },
      { label: 'Operador', variant: 'secondary' },
    ],
    status: 'active',
    lastLogin: '30 mins ago',
  },
];

@Component({
  selector: 'app-staff-table',
  standalone: true,
  imports: [],
  templateUrl: './staff-table.component.html',
})
export class StaffTableComponent {
  readonly pageSize = 5;
  readonly totalItems = MOCK_STAFF.length;
  readonly totalPages = Math.ceil(this.totalItems / this.pageSize);

  currentPage = signal(1);

  pagedStaff = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return MOCK_STAFF.slice(start, start + this.pageSize);
  });

  startItem = computed(() => (this.currentPage() - 1) * this.pageSize + 1);
  endItem = computed(() => Math.min(this.currentPage() * this.pageSize, this.totalItems));

  prevPage(): void {
    if (this.currentPage() > 1) this.currentPage.update(p => p - 1);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages) this.currentPage.update(p => p + 1);
  }
}
