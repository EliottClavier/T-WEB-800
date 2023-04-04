import {Component} from '@angular/core';
import {RegisterModel} from "../../models/register/register.model";
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
import {UserModel} from "../../models/users/user.model";
import {ApiResponseConst} from "../../enums/api-response-const";
import {MatDialogRef} from "@angular/material/dialog";
import {UserInformationsModel} from "../../models/user-informations/user-informations.model";


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})

export class RegisterUserComponent {
  public newUser: RegisterModel;
  public matcher: MyErrorStateMatcher;
  public user: UserModel;
  public errorMessage: string;

  public INFO_MESSAGES = new RegisterConst().INFO_MESSAGES;
  public API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  constructor(
    private _registerService: RegisterService,
    private _dialogRef: MatDialogRef<RegisterUserComponent>
  ) {
    this.newUser = new RegisterModel('', '', '', '');
    this.matcher = new MyErrorStateMatcher();
    this.user = new UserModel(new UserInformationsModel(0, '', '', ''), '');
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
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(''),
  }, {validators: this.checkPassword});

  createUser() {
    if (this.registerForm.valid) {
      this.newUser = new RegisterModel(this.registerForm.get('firstname')?.value, this.registerForm.get('lastname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value);
      this._registerService.postUserRegister(this.newUser).subscribe({
        next: (result: any) => {
          this.user = result;
          localStorage.setItem('token', this.user.token);
          this._dialogRef.close();
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
