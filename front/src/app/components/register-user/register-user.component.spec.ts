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

  it('should create a new user with name, email and password', () => {
    component.name = 'Test';
    component.email = 'test@gmail.com';
    component.password = 'Password123';
    component.confirmPassword = 'Password123';

    component.createUser();

    expect(component.newUser.name).toEqual('Test');
    expect(component.newUser.email).toEqual('test@gmail.com');
    expect(component.newUser.password).toEqual('Password123');
  });

  it('should create a new register from JSON', () => {
    const json = {
      name: 'Test',
      email: 'test@gmail.com',
      password: 'password123'
    };

    const credentials = Register.fromJson(json);

    expect(credentials.name).toBe('Test');
    expect(credentials.email).toBe('test@gmail.com');
    expect(credentials.password).toBe('password123');
  });

  it('should convert register to JSON', () => {
    const register = new Register('Test','test@gmail.com', 'password123');

    const json = register.toJson();

    expect(json.name).toBe('Test');
    expect(json.email).toBe('test@gmail.com');
    expect(json.password).toBe('password123');
  });

  it('should create a new user with invalid email', () => {
    component.name = 'Test';
    component.email = 'test.com';
    component.password = 'Password123';
    component.confirmPassword = 'Password123';

    component.createUser();

    expect(component.newUser.name).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.errorMessage).toBe('Invalid email address');
  });

  it('should create a new user with name is empty', () => {
    component.name = '';
    component.email = 'test@gmail.com';
    component.password = 'Password123';
    component.confirmPassword = 'Password123';

    component.createUser();

    expect(component.newUser.name).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.errorMessage).toBe('Please fill in all fields');
  });

  it('should create a new user with email is empty', () => {
    component.name = 'Test';
    component.email = '';
    component.password = 'Password123';
    component.confirmPassword = 'Password123';

    component.createUser();

    expect(component.newUser.name).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.errorMessage).toBe('Please fill in all fields');
  });

  it('should create a new user with password is empty', () => {
    component.name = 'Test';
    component.email = 'test@gmail.com';
    component.password = '';
    component.confirmPassword = 'Password123';

    component.createUser();

    expect(component.newUser.name).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.errorMessage).toBe('Please fill in all fields');
  });

  it('should create a new user with confirm password is empty', () => {
    component.name = 'Test';
    component.email = 'test@gmail.com';
    component.password = 'Password123';
    component.confirmPassword = '';

    component.createUser();

    expect(component.newUser.name).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.errorMessage).toBe('Please fill in all fields');
  });

  it('should create a new user with password shorten', () => {
    component.name = 'Test';
    component.email = 'test@gmail.com';
    component.password = 'Passw';
    component.confirmPassword = 'Passw';

    component.createUser();

    expect(component.newUser.name).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.errorMessage).toBe('Password must be at least 6 characters');
  });

  it('should create a new user with password and confirm password as differents', () => {
    component.name = 'Test';
    component.email = 'test@gmail.com';
    component.password = 'Password123';
    component.confirmPassword = 'Password456';

    component.createUser();

    expect(component.newUser.name).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.errorMessage).toBe('Passwords not match');
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


