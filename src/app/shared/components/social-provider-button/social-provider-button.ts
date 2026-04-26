import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-provider-button',
  standalone: true,
  imports: [],
  templateUrl: './social-provider-button.html',
  styleUrl: './social-provider-button.css',
})
export class SocialProviderButton {
  @Input({ required: true }) icon!: string;
}
