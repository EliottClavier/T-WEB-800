import {Component, NgModule} from '@angular/core';
import {Register} from "../../models/register.model";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})

export class RegisterUserComponent {
  name: string;
  email: string;
  password: string;
  newUser: Register;
  errorMessage: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.newUser = new Register('', '', '');
    this.errorMessage = '';
   }

  ngOnInit(): void {

  }

  createUser() {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.name === '' || this.email === '' || this.password === '') {
      this.errorMessage = 'Please fill in all fields';
    } else if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
    } else if(!email_regex.test(this.email)) {
      this.errorMessage = 'Invalid email address';
    } else {
      this.newUser = new Register(this.name, this.email, this.password);
      this.errorMessage = '';
    }
  }
}
