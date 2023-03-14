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
import {RegisterConst} from "../../enums/register-const";
import {RegisterService} from "../../services/register/register.service";
import {User} from "../../models/user/User.model";
import {ApiResponseConst} from "../../enums/api-response-const";


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})

export class RegisterUserComponent {
  newUser: Register;
  matcher: MyErrorStateMatcher;
  success: boolean;
  user: User;
  errorMessage: string;

  INFO_MESSAGES = new RegisterConst().INFO_MESSAGES;
  API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  constructor(private _registerService: RegisterService) {
    this.newUser = new Register('', '', '', '');
    this.matcher = new MyErrorStateMatcher();
    this.success = false;
    this.user = new User(0, '', '', '');
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
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(''),
  }, {validators: this.checkPassword});

  createUser() {
    if (this.registerForm.valid) {
      this.newUser = new Register(this.registerForm.get('firstName')?.value, this.registerForm.get('lastName')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value);
      this._registerService.postUserRegister(this.newUser).subscribe({
        next: (value: any) => {
          this.user = value['data'];
          this.success = true;
        },
        error: () => {
          this.errorMessage = this.API_RESPONSE.BAD_REQUEST;
        },
      });
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
