import {Component} from '@angular/core';
import {Register} from "../../models/register.model";

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
