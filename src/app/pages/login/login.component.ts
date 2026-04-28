import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialProviderButton } from '../../shared/components/social-provider-button/social-provider-button';
import { VaultInputWrapper } from '../../shared/components/vault-input-wrapper/vault-input-wrapper';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, SocialProviderButton, VaultInputWrapper, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  isPasswordVisible = false;
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    // Hardcoded navigation to the new page for now
    this.router.navigate(['/business-unit']);
  }
}
