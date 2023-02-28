import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RegisterUserComponent } from './register-user.component';
import {Register} from "../../models/register.model";

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      imports: [ FormsModule ]
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
    component.name = 'John Smith';
    component.email = 'john@example.com';
    component.password = 'mypassword';

    component.createUser();

    expect(component.newUser.name).toEqual('John Smith');
    expect(component.newUser.email).toEqual('john@example.com');
    expect(component.newUser.password).toEqual('mypassword');
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

    component.createUser();

    expect(component.newUser.name).toBe('');
    expect(component.newUser.email).toBe('');
    expect(component.newUser.password).toBe('');
    expect(component.errorMessage).toBe('Password must be at least 6 characters');
  });
});


