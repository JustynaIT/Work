import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) {}
  formErrors = {
    Login: '',
    Password: ''
  };
  private validationMessages = {
    Login: {
      required: 'Login is required',
      minlength: 'Login must have at least 3 characters'
    },
    Password: {
      required: 'Password is required',
      minlength: 'Password must have at least 3 characters'
    }
  };
  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      Login: ['', [Validators.required, Validators.minLength(3)]],
      Password: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.LoginForm.valueChanges.subscribe((value) => {
     // this.onControlValueChanged();
    });

    //this.onControlValueChanged(); // ustawiamy początkowany stan walidacji
  }
 /* onControlValueChanged() {

    const form = this.LoginForm;
  // tslint:disable-next-line: forin
    for (let field in this.formErrors) {
      this.formErrors[field] = '';
  // tslint:disable-next-line: prefer-const
      let control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field];
        control.errors.forEach( key => {
          this.formErrors[field] += validationMessages[key] + ' ';
      });
    }
    }
  }*/

  onSubmit(form) {
    const item = {
      login: form.value.Login,
      password: form.value.Password
    };
    this.auth.login(item).subscribe(
      (resData: any) => {
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        this.router.navigate(['/home']);
      });
  }

}
