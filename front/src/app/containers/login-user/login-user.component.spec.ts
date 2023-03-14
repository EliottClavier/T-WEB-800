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

describe('RegisterUserComponent', () => {
  let component: LoginUserComponent;
  let formGroup: FormGroup;
  let control: FormControl;
  let form: FormGroupDirective;
  let spectator: Spectator<LoginUserComponent>;

  const createComponent = createComponentFactory({
    component: LoginUserComponent,
    imports: [
      MatAutocompleteModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      FormsModule
    ]
  });

  beforeEach(async () => {
    control = new FormControl('', [Validators.required]);
    form = new FormGroupDirective([], []);
    spectator = createComponent();
    component = spectator.component;

    spectator.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with all informations', () => {
    component.loginForm.setValue({ email: 'test@gmail.com', password: 'Password123' });

    component.loginUser();

    expect(component.credentials.email).toEqual('test@gmail.com');
    expect(component.credentials.password).toEqual('Password123');
    expect(component.success).toEqual(true);
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


