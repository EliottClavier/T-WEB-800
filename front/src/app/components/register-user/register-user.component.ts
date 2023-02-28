import {Component} from '@angular/core';
import {Register} from "../../models/register.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

const ERROR_MESSAGES = {
  EMPTY_FIELDS: 'Please fill in all fields',
  SHORT_PASSWORD: 'Password must be at least 6 characters',
  INVALID_EMAIL: 'Invalid email address',
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
  newUser: Register;
  errorMessage: string;

  constructor(private modalService: NgbModal) {
    this.name = '';
    this.email = '';
    this.password = '';
    this.newUser = new Register('', '', '');
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modalService.open('registerModal');
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

  createUser() {
    if (this.isFieldEmpty(this.name) || this.isFieldEmpty(this.email) || this.isFieldEmpty(this.password)) {
      this.errorMessage = ERROR_MESSAGES.EMPTY_FIELDS;
    } else if (this.isPasswordTooShort(this.password)) {
      this.errorMessage = ERROR_MESSAGES.SHORT_PASSWORD;
    } else if (this.isEmailInvalid(this.email)) {
      this.errorMessage = ERROR_MESSAGES.INVALID_EMAIL;
    } else {
      this.newUser = new Register(this.name, this.email, this.password);
      this.errorMessage = ERROR_MESSAGES.NONE;
    }
  }
}
