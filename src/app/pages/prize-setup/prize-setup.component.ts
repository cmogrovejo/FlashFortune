import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DashboardTopNavComponent } from '../../shared/components/dashboard-top-nav/dashboard-top-nav.component';

type PrizeType = 'physical' | 'monetary' | 'vehicle' | 'gift';

interface Prize {
  id: number;
  name: string;
  quantity: number | null;
  description: string;
  type: PrizeType;
  unitValue: number;
}

const TYPE_CYCLE: PrizeType[] = ['physical', 'monetary', 'vehicle', 'gift'];

@Component({
  selector: 'app-prize-setup',
  standalone: true,
  imports: [RouterModule, DashboardTopNavComponent, CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './prize-setup.component.html',
})
export class PrizeSetupComponent {
  private nextId = 5;

  prizes = signal<Prize[]>([
    { id: 1, name: 'Caja de herramientas', quantity: 12, description: 'Set profesional completo', type: 'physical', unitValue: 5000 },
    { id: 2, name: 'Bono en efectivo', quantity: 5, description: 'Transferencia inmediata al ganador', type: 'monetary', unitValue: 10000 },
    { id: 3, name: 'Camioneta 4x4', quantity: 1, description: 'Modelo 2024 full equipada', type: 'vehicle', unitValue: 35200 },
    { id: 4, name: '', quantity: null, description: '', type: 'gift', unitValue: 0 },
  ]);

  totalPrizes = computed(() => this.prizes().reduce((sum, p) => sum + (p.quantity ?? 0), 0));

  estimatedTotal = computed(() =>
    this.prizes().reduce((sum, p) => sum + p.unitValue * (p.quantity ?? 0), 0)
  );

  physicalCount = computed(() =>
    this.prizes().filter(p => p.type === 'physical').reduce((sum, p) => sum + (p.quantity ?? 0), 0)
  );

  monetaryCount = computed(() =>
    this.prizes().filter(p => p.type === 'monetary').reduce((sum, p) => sum + (p.quantity ?? 0), 0)
  );

  vehicleCount = computed(() =>
    this.prizes().filter(p => p.type === 'vehicle').reduce((sum, p) => sum + (p.quantity ?? 0), 0)
  );

  drop(event: CdkDragDrop<Prize[]>) {
    const list = [...this.prizes()];
    moveItemInArray(list, event.previousIndex, event.currentIndex);
    this.prizes.set(list);
  }

  addPrize() {
    this.prizes.update(list => [
      ...list,
      { id: this.nextId++, name: '', quantity: null, description: '', type: 'gift', unitValue: 0 },
    ]);
  }

  removePrize(id: number) {
    this.prizes.update(list => list.filter(p => p.id !== id));
  }

  updateField(id: number, field: keyof Prize, value: string | number | null) {
    this.prizes.update(list => list.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  }

  cycleType(id: number) {
    this.prizes.update(list =>
      list.map(p => {
        if (p.id !== id) return p;
        const next = TYPE_CYCLE[(TYPE_CYCLE.indexOf(p.type) + 1) % TYPE_CYCLE.length];
        return { ...p, type: next };
      })
    );
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('es-MX');
  }
}
