import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-unit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-unit-card.html',
  styleUrl: './business-unit-card.css'
})
export class BusinessUnitCard {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() category: string = '';
  @Input() icon: string = '';
  @Input() theme: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() isAddNew: boolean = false;
  @Input() hasShield: boolean = false;
}
