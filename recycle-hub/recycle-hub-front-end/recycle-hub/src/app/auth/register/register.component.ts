import { Component } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { register } from '../../core/shared/interface/auth/register-interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")]],
      dateOfBirth: this.formBuilder.group({
        day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
        month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
      }, {validators: [this.validDate]} as AbstractControlOptions),
      homeAddress: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]]
    })
  }

  validDate() : ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const day = group.get('day')?.value;
      const month = group.get('month')?.value;
      const year = group.get('year')?.value;

      if (!day || !month || !year) {
        return { invalidDate: true };
      }

      const date = `${day}/${month}/${year}`;
      const dateRegex = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/;

      return dateRegex.test(date) ? null : { invalidDate: true };
    }
  }

  submit() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value as register;
      this.service.register(data);
      this.router.navigate(["/auth/login"]);
    }
  }
}
