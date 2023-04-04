import {MyErrorStateMatcher, RegisterUserComponent} from './register-user.component';
import {AppModule} from "../../app.module";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from "@angular/forms";
import {RegisterService} from "../../services/register/register.service";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "../../models/users/user.model";
import {ApiResponseConst} from "../../enums/api-response-const";
import {MatDialogRef} from "@angular/material/dialog";
import {UserInformationsModel} from "../../models/user-informations/user-informations.model";

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let formGroup: FormGroup;
  let control: FormControl;
  let form: FormGroupDirective;
  let matcher: MyErrorStateMatcher;
  let spectator: Spectator<RegisterUserComponent>;
  let _registerService: RegisterService;
  let userMock: UserModel;
  let _dialogRef: MatDialogRef<RegisterUserComponent>;

  const API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  const dialogMock = {
    close: () => { }
  };

  const createComponent = createComponentFactory({
    component: RegisterUserComponent,
    imports: [
      AppModule
    ],
    providers: [
      RegisterService,
      {provide: MatDialogRef, useValue: dialogMock},
    ],
  });

  beforeEach(async () => {
    control = new FormControl('', [Validators.required]);
    form = new FormGroupDirective([], []);
    matcher = new MyErrorStateMatcher();
    formGroup = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
    spectator = createComponent();
    component = spectator.component;
    _registerService = spectator.inject(RegisterService);
    _dialogRef = spectator.inject(MatDialogRef);

    spectator.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new user with all informations', () => {
    component.registerForm.setValue({ firstname: 'Albert', lastname: 'Test', email: 'test@gmail.com', password: 'Password123', confirmPassword: 'Password123' });
    const userResponseMock: UserModel = new UserModel(
      new UserInformationsModel(1, "Albert", "Test", "test@gmail.com"),
      "token"
    )

    spyOn<RegisterService, any>(_registerService, "postUserRegister").and.callFake((user: string) => {
      return new BehaviorSubject<UserModel>(userResponseMock);
    });

    component.createUser();

    expect(component.newUser.firstname).toEqual('Albert');
    expect(component.newUser.lastname).toEqual('Test');
    expect(component.newUser.email).toEqual('test@gmail.com');
    expect(component.newUser.password).toEqual('Password123');
    expect(component.user.user.id).toEqual(1);
    expect(component.user.user.firstname).toEqual('Albert');
    expect(component.user.user.lastname).toEqual('Test');
    expect(component.user.user.email).toEqual('test@gmail.com');
  });

  it('should create a new user with all informations but is bad request', () => {
    component.registerForm.setValue({ firstname: 'Albert', lastname: 'Test', email: 'test@gmail.com', password: 'Password123', confirmPassword: 'Password123' });

    spyOn<RegisterService, any>(_registerService, "postUserRegister").and.returnValue(
      throwError(() => new HttpErrorResponse({error: API_RESPONSE.BAD_REQUEST, status: 400}))
    );

    component.createUser();

    expect(component.newUser.firstname).toEqual('Albert');
    expect(component.newUser.lastname).toEqual('Test');
    expect(component.newUser.email).toEqual('test@gmail.com');
    expect(component.newUser.password).toEqual('Password123');
    expect(component.user.user.id).toEqual(0);
    expect(component.user.user.firstname).toEqual('');
    expect(component.user.user.lastname).toEqual('');
    expect(component.user.user.email).toEqual('');
    expect(component.errorMessage).toEqual(API_RESPONSE.BAD_REQUEST);
  });

  it('should create a new user with invalid email', () => {
    component.registerForm.setValue({ firstname: 'Albert', lastname: 'Test', email: 'test', password: 'Password123', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstname).toBe('');
    expect(component.newUser.lastname).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.registerForm.controls.email.errors).toEqual({email: true});
  });

  it('should create a new user with first name is empty', () => {
    component.registerForm.setValue({ firstname: '', lastname: 'Test', email: 'test@gmail.com', password: 'Password123', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstname).toBe('');
    expect(component.newUser.lastname).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.registerForm.controls.firstname.errors).toEqual({required: true});
  });

  it('should create a new user with last name is empty', () => {
    component.registerForm.setValue({ firstname: 'Albert', lastname: '', email: 'test@gmail.com', password: 'Password123', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstname).toBe('');
    expect(component.newUser.lastname).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.registerForm.controls.lastname.errors).toEqual({required: true});
  });

  it('should create a new user with email is empty', () => {
    component.registerForm.setValue({ firstname: 'Albert', lastname: 'Test', email: '', password: 'Password123', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstname).toBe('');
    expect(component.newUser.lastname).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.registerForm.controls.email.errors).toEqual({required: true});
  });

  it('should create a new user with password is empty', () => {
    component.registerForm.setValue({ firstname: 'Albert', lastname: 'Test', email: 'test@gmail.com', password: '', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstname).toBe('');
    expect(component.newUser.lastname).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.registerForm.controls.password.errors).toEqual({required: true});
  });

  it('should return null when password and confirmPassword are the same', () => {
    formGroup.patchValue({
      password: 'password',
      confirmPassword: 'password'
    });

    const result = component.checkPassword(formGroup);

    expect(result).toBeNull();
  });

  it('should return a validation error when password and confirmPassword are different', () => {
    formGroup.patchValue({
      password: 'password',
      confirmPassword: 'differentPassword'
    });

    const result = component.checkPassword(formGroup);

    expect(result).toEqual({ notSame: true });
  });

  it('should return true if control is invalid and parent is dirty', () => {
    control.setErrors({required: true});
    control.markAsDirty();
    const result = matcher.isErrorState(control, form);
    expect(result).toBeTrue();
  });

  it('should return false if control is valid and parent is clean', () => {
    control.setValue('test');
    const result = matcher.isErrorState(control, form);
    expect(result).toBeFalse();
  });

  it('should return true if parent is invalid and dirty', () => {
    control.setValue(control);
    control.setErrors({invalid: true});
    control.markAsDirty();
    const result = matcher.isErrorState(control, form);
    expect(result).toBeTrue();
  });
});


