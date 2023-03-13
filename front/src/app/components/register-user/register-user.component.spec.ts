import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MyErrorStateMatcher, RegisterUserComponent} from './register-user.component';
import {Register} from "../../models/register/register.model";
import {AppModule} from "../../app.module";
import {FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators} from "@angular/forms";

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let formGroup: FormGroup;
  let control: FormControl;
  let form: FormGroupDirective;
  let matcher: MyErrorStateMatcher;

  beforeEach(async () => {
    control = new FormControl('', [Validators.required]);
    form = new FormGroupDirective([], []);
    matcher = new MyErrorStateMatcher();
    formGroup = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      imports: [ AppModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new user with all informations', () => {
    component.registerForm.setValue({ firstName: 'Albert', lastName: 'Test', email: 'test@gmail.com', password: 'Password123', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstName).toEqual('Albert');
    expect(component.newUser.lastName).toEqual('Test');
    expect(component.newUser.email).toEqual('test@gmail.com');
    expect(component.newUser.password).toEqual('Password123');
    expect(component.success).toEqual(true);
  });

  it('should create a new user with invalid email', () => {
    component.registerForm.setValue({ firstName: 'Albert', lastName: 'Test', email: 'test', password: 'Password123', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstName).toBe('');
    expect(component.newUser.lastName).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.registerForm.controls.email.errors).toEqual({email: true});
  });

  it('should create a new user with first name is empty', () => {
    component.registerForm.setValue({ firstName: '', lastName: 'Test', email: 'test@gmail.com', password: 'Password123', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstName).toBe('');
    expect(component.newUser.lastName).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.registerForm.controls.firstName.errors).toEqual({required: true});
  });

  it('should create a new user with last name is empty', () => {
    component.registerForm.setValue({ firstName: 'Albert', lastName: '', email: 'test@gmail.com', password: 'Password123', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstName).toBe('');
    expect(component.newUser.lastName).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.registerForm.controls.lastName.errors).toEqual({required: true});
  });

  it('should create a new user with email is empty', () => {
    component.registerForm.setValue({ firstName: 'Albert', lastName: 'Test', email: '', password: 'Password123', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstName).toBe('');
    expect(component.newUser.lastName).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.registerForm.controls.email.errors).toEqual({required: true});
  });

  it('should create a new user with password is empty', () => {
    component.registerForm.setValue({ firstName: 'Albert', lastName: 'Test', email: 'test@gmail.com', password: '', confirmPassword: 'Password123' });

    component.createUser();

    expect(component.newUser.firstName).toBe('');
    expect(component.newUser.lastName).toBe('');
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


