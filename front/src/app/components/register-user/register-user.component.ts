import {Component} from '@angular/core';
import {Register} from "../../models/register/register.model";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective, NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

const ERROR_MESSAGES = {
  EMPTY_FIELDS: 'Please fill in all fields',
  SHORT_PASSWORD: 'Password must be at least 6 characters',
  INVALID_EMAIL: 'Invalid email address',
  DIFFERENTS_PASSWORD: 'Passwords not match',
  NONE: ''
};

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})

export class RegisterUserComponent {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  newUser: Register;
  errorMessage: string;
  matcher = new MyErrorStateMatcher();

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.newUser = new Register('', '', '');
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

  checkPassword: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(''),
  }, {validators: this.checkPassword});

  isFieldEmpty(value: string): boolean {
    return value.trim() === '';
  }

  isPasswordTooShort(password: string): boolean {
    return password.length < 6;
  }

  isEmailInvalid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  }

  isFormComplete(): boolean {
    return !this.isFieldEmpty(this.name) && !this.isFieldEmpty(this.email) && !this.isFieldEmpty(this.password) && !this.isFieldEmpty(this.confirmPassword);
  }

  createUser() {
    if (!this.isFormComplete()) {
      this.errorMessage = ERROR_MESSAGES.EMPTY_FIELDS;
    } else if (this.isPasswordTooShort(this.password)) {
      this.errorMessage = ERROR_MESSAGES.SHORT_PASSWORD;
    } else if (this.isEmailInvalid(this.email)) {
      this.errorMessage = ERROR_MESSAGES.INVALID_EMAIL;
    } else if (this.password !== this.confirmPassword) {
      this.errorMessage = ERROR_MESSAGES.DIFFERENTS_PASSWORD;
    } else {
      this.newUser = new Register(this.name, this.email, this.password);
      this.errorMessage = ERROR_MESSAGES.NONE;
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = control?.invalid && control?.dirty || false;
    const invalidParent = control?.parent?.invalid && control?.parent?.dirty || false;

    return (invalidCtrl || invalidParent);
  }
}
