import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vault-input-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './vault-input-wrapper.html',
  styleUrl: './vault-input-wrapper.css',
})
export class VaultInputWrapper {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) forId!: string;
  @Input({ required: true }) startIcon!: string;
}
