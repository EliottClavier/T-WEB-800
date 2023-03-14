import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MyErrorStateMatcher, LoginUserComponent} from './login-user.component';
import {Credentials} from "../../models/credentials/credentials.model";
import {AppModule} from "../../app.module";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {RegisterService} from "../../services/register/register.service";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {User} from "../../models/user/User.model";
import {ApiResponseConst} from "../../enums/api-response-const";
import any = jasmine.any;

describe('RegisterUserComponent', () => {
  let component: LoginUserComponent;
  let formGroup: FormGroup;
  let control: FormControl;
  let form: FormGroupDirective;
  let matcher: MyErrorStateMatcher;
  let spectator: Spectator<LoginUserComponent>;

  const API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  const createComponent = createComponentFactory({
    component: LoginUserComponent,
    imports: [
      HttpClientModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      FormsModule
    ],
    providers: [ RegisterService ],
  });

  beforeEach(async () => {
    control = new FormControl('', [Validators.required]);
    form = new FormGroupDirective([], []);
    matcher = new MyErrorStateMatcher();
    spectator = createComponent();
    component = spectator.component;

    spectator.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with all informations', () => {
    component.registerForm.setValue({ email: 'test@gmail.com', password: 'Password123' });

    component.loginUser();

    expect(component.credentials.email).toEqual('test@gmail.com');
    expect(component.credentials.password).toEqual('Password123');
    expect(component.success).toEqual(true);
  });

  it('should not login with empty email', () => {
    component.registerForm.setValue({ email: '', password: 'Password123' });

    component.loginUser();

    expect(component.credentials.email).toEqual('');
    expect(component.credentials.password).toEqual('');
    expect(component.success).toEqual(false);
  });

  it('should not login with empty password', () => {
    component.registerForm.setValue({ email: 'test@gmail.com', password: '' });

    component.loginUser();

    expect(component.credentials.email).toEqual('');
    expect(component.credentials.password).toEqual('');
    expect(component.success).toEqual(false);
  });
});


