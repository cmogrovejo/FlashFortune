import { Component } from '@angular/core';

import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { BusinessUnitCard } from './components/business-unit-card/business-unit-card';
import { Router } from '@angular/router';

export interface BusinessUnit {
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  theme: 'primary' | 'secondary' | 'tertiary';
  isAddNew: boolean;
  hasShield?: boolean;
}

@Component({
  selector: 'app-business-unit',
  standalone: true,
  imports: [Header, Footer, BusinessUnitCard],
  templateUrl: './business-unit.component.html'
})
export class BusinessUnitComponent {
  constructor(private router: Router) { }

  onCardClick(unit: BusinessUnit) {
    if (unit.isAddNew) {
      this.router.navigate(['/add-business-unit']);
    } else {
      this.router.navigate(['/raffle-dashboard']);
    }
  }
  businessUnits: BusinessUnit[] = [
    {
      title: 'Banco Mercantil',
      subtitle: 'Global Trading & Asset Management Protocol',
      category: 'Corporate Registry',
      icon: 'icon-[lucide--landmark]',
      theme: 'primary',
      isAddNew: false
    },
    {
      title: 'Cooperativa San José',
      subtitle: 'Regional Cooperative Liquidity Engine',
      category: 'Community Credit',
      icon: 'icon-[lucide--refresh-cw]',
      theme: 'secondary',
      isAddNew: false
    },
    {
      title: 'Financiera Nacional',
      subtitle: 'State-Level Fiscal Security Operations',
      category: 'National Infrastructure',
      icon: 'icon-[lucide--landmark]',
      theme: 'tertiary',
      isAddNew: false,
      hasShield: true
    },
    {
      title: 'Add New Entity',
      subtitle: 'Provision a new secure financial environment protocol',
      category: 'Administrative Action',
      icon: 'icon-[lucide--plus]',
      theme: 'primary',
      isAddNew: true
    }
  ];
}
