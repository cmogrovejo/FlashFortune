import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'business-unit', loadComponent: () => import('./pages/business-unit/business-unit.component').then(m => m.BusinessUnitComponent) },
  { path: 'add-business-unit', loadComponent: () => import('./pages/add-business-unit/add-business-unit.component').then(m => m.AddBusinessUnitComponent) },
  { path: 'raffle-dashboard', loadComponent: () => import('./pages/raffle-dashboard/raffle-dashboard.component').then(m => m.RaffleDashboardComponent) },
];
