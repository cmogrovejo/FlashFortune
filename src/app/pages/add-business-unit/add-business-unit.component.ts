import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-business-unit',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './add-business-unit.component.html'
})
export class AddBusinessUnitComponent {
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/business-unit']);
  }
}
