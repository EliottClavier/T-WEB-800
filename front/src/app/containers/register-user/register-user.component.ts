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
import {User} from "../../models/user/User.model";
import {ApiResponseConst} from "../../enums/api-response-const";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})

export class RegisterUserComponent {
  public newUser: RegisterModel;
  public matcher: MyErrorStateMatcher;
  public user: User;
  public errorMessage: string;

  public INFO_MESSAGES = new RegisterConst().INFO_MESSAGES;
  public API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  constructor(
    private _registerService: RegisterService,
    private _dialogRef: MatDialogRef<RegisterUserComponent>
  ) {
    this.newUser = new RegisterModel('', '', '', '');
    this.matcher = new MyErrorStateMatcher();
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
      this.newUser = new RegisterModel(this.registerForm.get('firstName')?.value, this.registerForm.get('lastName')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value);
      this._registerService.postUserRegister(this.newUser).subscribe({
        next: (value: any) => {
          this.user = value['data'];
          this._dialogRef.close();
        },
        error: () => {
          this.errorMessage = this.API_RESPONSE.BAD_REQUEST;
        },
      });
    }
  }

  public closeRegisterDialog(): void {
    console.log("close");
    this._dialogRef.close("test");
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = control?.invalid && control?.dirty || false;
    const invalidParent = control?.parent?.invalid && control?.parent?.dirty || false;

    return (invalidCtrl || invalidParent);
  }
}
