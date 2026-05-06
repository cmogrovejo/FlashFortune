import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-invite-member-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invite-member-modal.component.html',
})
export class InviteMemberModalComponent {
  private fb = inject(FormBuilder);

  closed = output<void>();

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    isConfigurador: [false],
    isOperador: [false],
    isAuditor: [false],
  });

  get fullName() { return this.form.controls.fullName; }
  get email() { return this.form.controls.email; }

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    if (this.form.valid) {
      console.log('Invitation sent:', this.form.value);
      this.close();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
