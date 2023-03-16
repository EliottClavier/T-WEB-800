import { ComponentFixture, TestBed } from '@angular/core/testing';
import {LoginUserComponent} from './login-user.component';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {LoginService} from "../../services/login/login.service";
import {User} from "../../models/user/User.model";
import {BehaviorSubject, throwError} from "rxjs";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {ApiResponseConst} from "../../enums/api-response-const";

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let formGroup: FormGroup;
  let control: FormControl;
  let form: FormGroupDirective;
  let spectator: Spectator<LoginUserComponent>;
  let _loginService: LoginService;
  let userMock: User;

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
    providers: [ LoginService ],
  });

  beforeEach(async () => {
    control = new FormControl('', [Validators.required]);
    form = new FormGroupDirective([], []);
    spectator = createComponent();
    component = spectator.component;
    _loginService = spectator.inject(LoginService);

    spectator.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with all informations', () => {
    component.loginForm.setValue({ email: 'test@gmail.com', password: 'Password123' });
    const userMock = {
      "status": 201,
      "data": {
        "id": 1,
        "firstName": "Albert",
        "lastName": "Test",
        "email": "test@gmail.com"
      }
    }

    spyOn<LoginService, any>(_loginService, "postLogin").and.callFake((credentials: string) => {
      return new BehaviorSubject<Object>(userMock);
    });

    component.loginUser();

    expect(component.credentials.email).toEqual('test@gmail.com');
    expect(component.credentials.password).toEqual('Password123');
    expect(component.user.id).toEqual(1);
    expect(component.user.firstName).toEqual('Albert');
    expect(component.user.lastName).toEqual('Test');
    expect(component.user.email).toEqual('test@gmail.com');
    expect(component.success).toEqual(true);
  });

  it('should login with all informations', () => {
    component.loginForm.setValue({ email: 'test@gmail.com', password: 'Password123' });

    spyOn<LoginService, any>(_loginService, "postLogin").and.returnValue(
      throwError(() => new HttpErrorResponse({error: API_RESPONSE.BAD_REQUEST, status: 401}))
    );

    component.loginUser();

    expect(component.credentials.email).toEqual('test@gmail.com');
    expect(component.credentials.password).toEqual('Password123');
    expect(component.user.id).toEqual(0);
    expect(component.user.firstName).toEqual('');
    expect(component.user.lastName).toEqual('');
    expect(component.user.email).toEqual('');
    expect(component.success).toEqual(false);
  });

  it('should not login with empty email', () => {
    component.loginForm.setValue({ email: '', password: 'Password123' });

    component.loginUser();

    expect(component.credentials.email).toEqual('');
    expect(component.credentials.password).toEqual('');
    expect(component.success).toEqual(false);
  });

  it('should not login with empty password', () => {
    component.loginForm.setValue({ email: 'test@gmail.com', password: '' });

    component.loginUser();

    expect(component.credentials.email).toEqual('');
    expect(component.credentials.password).toEqual('');
    expect(component.success).toEqual(false);
  });

  it('should not login with invalid email', () => {
    component.loginForm.setValue({ email: 'test.com', password: 'Password123' });

    component.loginUser();

    expect(component.credentials.email).toEqual('');
    expect(component.credentials.password).toEqual('');
    expect(component.success).toEqual(false);
  });
});


