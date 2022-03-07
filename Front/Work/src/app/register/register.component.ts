import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegistrationForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {}
  formErrors = {
    login: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };
  private validationMessages = {
    login: {
      required: 'Login is required',
      minlength: 'Login must have at least 3 characters'
    },
    email: {
      required: 'Password is required',
      email: 'Bad email'
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must have at least 3 characters'
    },
    passwordConfirm: {
      required: 'Confirm password is required',
      minlength: 'Confirm password must have at least 3 characters',
      confirm: ' The passwords are not the same.'
    }
  };
  ngOnInit(): void {
    this.RegistrationForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.RegistrationForm.valueChanges.subscribe((value) => {
      this.onControlValueChanged();
    });

    this.onControlValueChanged(); 
  }
onControlValueChanged() {

  /*const form = this.RegistrationForm;
  // tslint:disable-next-line: forin
  for (const field in this.formErrors) {
    this.formErrors[field] = '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
      const validationMessages = this.validationMessages[field];
      // tslint:disable-next-line: forin
      for (const key in control.errors) {
        this.formErrors[field] += validationMessages[key] + ' ';
      }
    }
    if (form.value.password !== form.value.passwordConfirm && form.controls.passwordConfirm.dirty) {
      this.formErrors.passwordConfirm = this.validationMessages.passwordConfirm.confirm;
    }
  }*/
}
onSubmit(LoginForm) {
    const item = {
      login: this.RegistrationForm.value.login,
      password: this.RegistrationForm.value.password,
      email: this.RegistrationForm.value.email
    };
    this.auth.reg(item).subscribe(() => {
      this.router.navigate(['/home']);
    });
}


}
