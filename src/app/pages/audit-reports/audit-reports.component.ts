import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

type PrizeColor = 'amber' | 'cyan' | 'default';

interface Winner {
  order: number;
  ordinalSuffix: 'ST' | 'ND' | 'RD' | 'TH';
  prizeName: string;
  prizeColor: PrizeColor;
  winnerName: string;
  maskedId: string;
  accountNumber: string;
  coupon: string;
  timestamp: string;
}

const MOCK_WINNERS: Winner[] = [
  { order: 1, ordinalSuffix: 'ST', prizeName: 'Ultimate Vault Jackpot', prizeColor: 'amber',
    winnerName: 'Elena Rodriguez', maskedId: '***4567', accountNumber: 'ACC-908821', coupon: '#CK-88219-009', timestamp: '14:02:11:004' },
  { order: 2, ordinalSuffix: 'ND', prizeName: 'Luxury Sedan Tier', prizeColor: 'cyan',
    winnerName: 'Markus Aurelius', maskedId: '***1290', accountNumber: 'ACC-112234', coupon: '#CK-00124-772', timestamp: '14:02:11:098' },
  { order: 3, ordinalSuffix: 'RD', prizeName: 'Executive Tech Bundle', prizeColor: 'default',
    winnerName: 'Sarah J. Parker', maskedId: '***9921', accountNumber: 'ACC-443312', coupon: '#CK-22104-118', timestamp: '14:02:12:445' },
  { order: 4, ordinalSuffix: 'TH', prizeName: 'Gold Bullion 500g', prizeColor: 'default',
    winnerName: 'William Chen', maskedId: '***0082', accountNumber: 'ACC-552211', coupon: '#CK-10928-334', timestamp: '14:02:13:002' },
];

@Component({
  selector: 'app-audit-reports',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './audit-reports.component.html',
})
export class AuditReportsComponent {
  winners = MOCK_WINNERS;
  isExclusionLogOpen = signal(false);

  toggleExclusionLog() {
    this.isExclusionLogOpen.update(v => !v);
  }
}
