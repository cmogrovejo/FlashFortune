import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

type BadgeColor  = 'green' | 'gray' | 'amber';
type PrizeAccent = 'green' | 'amber' | 'cyan' | 'gray';
type PrizeSpan   = 1 | 2;

interface StatusCard {
  label: string;
  description: string;
  icon: string;
  badge: string;
  badgeColor: BadgeColor;
}

interface PrizeCard {
  order: string;
  label: string;
  title: string;
  description: string;
  valueLine: string;
  icon: string;
  accent: PrizeAccent;
  colSpan: PrizeSpan;
}

const MOCK_STATUS_CARDS: StatusCard[] = [
  { label: 'DATA INTEGRITY', badge: 'CERTIFIED', badgeColor: 'green',
    icon: 'icon-[lucide--shield-check]',
    description: 'Archivo clientes_final.csv verificado y resguardado en S3' },
  { label: 'COUPON UNIVERSE', badge: 'VERIFIED', badgeColor: 'green',
    icon: 'icon-[lucide--check-circle]',
    description: '100,000,000 cupones generados exitosamente' },
  { label: 'PRIZE CONFIGURATION', badge: 'CONFIGURED', badgeColor: 'gray',
    icon: 'icon-[lucide--layout-list]',
    description: '5 premios configurados en orden secuencial' },
  { label: 'SECURITY', badge: 'SANITIZED', badgeColor: 'amber',
    icon: 'icon-[lucide--shield]',
    description: 'Saldos originales eliminados de la base de datos activa' },
];

const MOCK_PRIZES: PrizeCard[] = [
  { order: '#01', label: 'OPENING DRAW', colSpan: 2, accent: 'green',
    title: 'Grand Prize Luxury Sedan',
    description: 'Automotive Excellence - Model X Platinum Edition',
    valueLine: 'VALUATION: $85,800 USD', icon: 'icon-[lucide--car]' },
  { order: '#02', label: 'CASH RESERVE', colSpan: 1, accent: 'amber',
    title: 'Cash Reserve', description: '', valueLine: 'POOL: $25,000 USD',
    icon: 'icon-[lucide--circle-dollar-sign]' },
  { order: '#03', label: 'TECH PACKAGE', colSpan: 1, accent: 'cyan',
    title: 'Tech Package', description: '', valueLine: 'QTY: 10 UNITS',
    icon: 'icon-[lucide--laptop]' },
  { order: '#04', label: 'TRAVEL VOUCHER', colSpan: 1, accent: 'gray',
    title: 'Travel Voucher', description: '', valueLine: 'GLOBAL ACCESS',
    icon: 'icon-[lucide--plane]' },
  { order: '#05', label: 'VAULT NFT', colSpan: 2, accent: 'gray',
    title: 'Vault NFT', description: '', valueLine: 'LEGACY SERIES',
    icon: 'icon-[lucide--box]' },
];

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './lobby.component.html',
})
export class LobbyComponent {
  statusCards = MOCK_STATUS_CARDS;
  prizes      = MOCK_PRIZES;
}
