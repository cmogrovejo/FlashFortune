import { Component, computed, signal, OnDestroy } from '@angular/core';

type DrawPhase = 'idle' | 'drawing' | 'complete';

interface QueuePrize {
  status: 'drawn' | 'current' | 'next';
  name: string;
  subtitle?: string;
  value?: string;
  coupons?: number;
  winner?: string;
  scheduledTime?: string;
}

interface Slot {
  id: number;
  isSeparator: boolean;
  finalValue: string;
  displayValue: string;
  settled: boolean;
}

const MOCK_PRIZE_QUEUE: QueuePrize[] = [
  { status: 'drawn', name: 'Tesla Model S Plaid', winner: '@cryptoking_22' },
  {
    status: 'current',
    name: 'Luxury Penthouse Apartment',
    subtitle: 'Dubai Marina, Block 7',
    value: '$2.4M',
    coupons: 14502,
  },
  { status: 'next', name: 'Rolex Daytona Gold', scheduledTime: '14:00 GMT' },
];

function randomDigit(): string {
  return String(Math.floor(Math.random() * 10));
}

@Component({
  selector: 'app-draw-arena',
  standalone: true,
  imports: [],
  templateUrl: './draw-arena.component.html',
})
export class DrawArenaComponent implements OnDestroy {
  readonly prizeQueue = MOCK_PRIZE_QUEUE;
  readonly hiddenCount = 5;

  phase = signal<DrawPhase>('idle');
  showExclusionToast = signal(true);

  readonly isDrawing = computed(() => this.phase() === 'drawing');
  readonly isComplete = computed(() => this.phase() === 'complete');

  private readonly WINNING_COUPON = '354-67';

  slots = signal<Slot[]>(
    this.WINNING_COUPON.split('').map((ch, i) => ({
      id: i,
      isSeparator: ch === '-',
      finalValue: ch,
      displayValue: ch === '-' ? '-' : randomDigit(),
      settled: false,
    })),
  );

  private spinInterval?: ReturnType<typeof setInterval>;
  private settleTimeouts: ReturnType<typeof setTimeout>[] = [];

  startDraw(): void {
    if (this.phase() === 'drawing') return;

    this.phase.set('drawing');
    this.showExclusionToast.set(false);

    this.slots.update(slots =>
      slots.map(s => ({ ...s, settled: false, displayValue: s.isSeparator ? '-' : randomDigit() })),
    );

    this.spinInterval = setInterval(() => {
      this.slots.update(slots =>
        slots.map(s => (s.settled || s.isSeparator ? s : { ...s, displayValue: randomDigit() })),
      );
    }, 80);

    const digitIds = this.slots()
      .filter(s => !s.isSeparator)
      .map(s => s.id);

    digitIds.forEach((id, i) => {
      const t = setTimeout(
        () => {
          this.slots.update(slots =>
            slots.map(s => (s.id === id ? { ...s, displayValue: s.finalValue, settled: true } : s)),
          );

          if (i === digitIds.length - 1) {
            clearInterval(this.spinInterval);
            setTimeout(() => {
              this.phase.set('complete');
              this.showExclusionToast.set(true);
            }, 300);
          }
        },
        1800 + i * 500,
      );
      this.settleTimeouts.push(t);
    });
  }

  panicStop(): void {
    clearInterval(this.spinInterval);
    this.settleTimeouts.forEach(clearTimeout);
    this.settleTimeouts = [];
    this.phase.set('idle');
    this.slots.update(slots =>
      slots.map(s => ({ ...s, settled: false, displayValue: s.isSeparator ? '-' : randomDigit() })),
    );
    this.showExclusionToast.set(false);
  }

  dismissToast(): void {
    this.showExclusionToast.set(false);
  }

  ngOnDestroy(): void {
    clearInterval(this.spinInterval);
    this.settleTimeouts.forEach(clearTimeout);
  }
}
