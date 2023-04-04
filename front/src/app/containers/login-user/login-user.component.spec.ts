import {LoginUserComponent} from './login-user.component';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from "@angular/forms";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {LoginService} from "../../services/login/login.service";
import {UserModel} from "../../models/users/user.model";
import {BehaviorSubject, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiResponseConst} from "../../enums/api-response-const";
import {MatDialogRef} from "@angular/material/dialog";
import {AppModule} from "../../app.module";
import {UserInformationsModel} from "../../models/user-informations/user-informations.model";

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let formGroup: FormGroup;
  let control: FormControl;
  let form: FormGroupDirective;
  let spectator: Spectator<LoginUserComponent>;
  let _loginService: LoginService;
  let userMock: UserModel;
  let _dialogRef: MatDialogRef<LoginUserComponent>;

  const dialogMock = {
    close: () => { }
  };

  const API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  const createComponent = createComponentFactory({
    component: LoginUserComponent,
    imports: [
      AppModule
    ],
    providers: [
      LoginService,
      {provide: MatDialogRef, useValue: dialogMock},
    ],
  });

  beforeEach(async () => {
    control = new FormControl('', [Validators.required]);
    form = new FormGroupDirective([], []);
    spectator = createComponent();
    component = spectator.component;
    _loginService = spectator.inject(LoginService);
    _dialogRef = spectator.inject(MatDialogRef);

    spectator.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with all informations', () => {
    component.loginForm.setValue({ email: 'test@gmail.com', password: 'Password123' });

    const userResponseMock: UserModel = new UserModel(
      new UserInformationsModel(1, "Albert", "Test", "test@gmail.com"),
      "token"
    )

    spyOn<LoginService, any>(_loginService, "postLogin").and.callFake((credentials: string) => {
      return new BehaviorSubject<UserModel>(userResponseMock);
    });

    component.loginUser();

    expect(component.credentials.email).toEqual('test@gmail.com');
    expect(component.credentials.password).toEqual('Password123');
    expect(component.user.user.id).toEqual(1);
    expect(component.user.user.firstname).toEqual('Albert');
    expect(component.user.user.lastname).toEqual('Test');
    expect(component.user.user.email).toEqual('test@gmail.com');
  });

  it('should login with all informations', () => {
    component.loginForm.setValue({ email: 'test@gmail.com', password: 'Password123' });

    spyOn<LoginService, any>(_loginService, "postLogin").and.returnValue(
      throwError(() => new HttpErrorResponse({error: API_RESPONSE.BAD_REQUEST, status: 401}))
    );

    component.loginUser();

    expect(component.credentials.email).toEqual('test@gmail.com');
    expect(component.credentials.password).toEqual('Password123');
    expect(component.user.user.id).toEqual(0);
    expect(component.user.user.firstname).toEqual('');
    expect(component.user.user.lastname).toEqual('');
    expect(component.user.user.email).toEqual('');
  });

  it('should not login with empty email', () => {
    component.loginForm.setValue({ email: '', password: 'Password123' });

    component.loginUser();

    expect(component.credentials.email).toEqual('');
    expect(component.credentials.password).toEqual('');
  });

  it('should not login with empty password', () => {
    component.loginForm.setValue({ email: 'test@gmail.com', password: '' });

    component.loginUser();

    expect(component.credentials.email).toEqual('');
    expect(component.credentials.password).toEqual('');
  });

  it('should not login with invalid email', () => {
    component.loginForm.setValue({ email: 'test.com', password: 'Password123' });

    component.loginUser();

    expect(component.credentials.email).toEqual('');
    expect(component.credentials.password).toEqual('');
  });
});


