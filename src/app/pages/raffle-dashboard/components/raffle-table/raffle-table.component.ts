import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RaffleItem {
  id: string;
  name: string;
  status: 'LIVE' | 'READY' | 'DRAFT' | 'ENDED';
  executionDate: string;
  prizes: string | number;
  coupons: string | number;
}

@Component({
  selector: 'app-raffle-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './raffle-table.component.html'
})
export class RaffleTableComponent {
  sortColumn: keyof RaffleItem = 'executionDate';
  sortDirection: 'asc' | 'desc' = 'desc';

  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 18; // Mock total

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Dummy Data
  raffles: RaffleItem[] = [
    {
      name: 'Gran Sorteo Navideño 2026',
      id: 'RM-2026-XMAS',
      status: 'LIVE',
      executionDate: 'Dec 24, 2026',
      prizes: 12,
      coupons: '4,500'
    },
    {
      name: 'Membresías Elite Q1',
      id: 'RM-2027-Q1E',
      status: 'READY',
      executionDate: 'Jan 15, 2027',
      prizes: 5,
      coupons: '1,200'
    },
    {
      name: 'Sorteo Verano Azul',
      id: 'RM-2027-SUM',
      status: 'DRAFT',
      executionDate: 'TBD',
      prizes: '--',
      coupons: '--'
    },
    {
      name: 'Aniversario Moonshot 2025',
      id: 'RM-2025-ANIV',
      status: 'ENDED',
      executionDate: 'Nov 12, 2025',
      prizes: 50,
      coupons: '12,800'
    },
    {
      name: 'Loyalty Reward Program',
      id: 'RM-2025-LOY',
      status: 'ENDED',
      executionDate: 'Oct 05, 2025',
      prizes: 10,
      coupons: '3,120'
    }
  ];

  sortBy(column: keyof RaffleItem) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Simple sort logic for demo
    this.raffles.sort((a, b) => {
      let valA = a[column];
      let valB = b[column];

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
