import {RegisterModel} from "./register.model";

describe('RegisterTest', () => {
  it('should create a new register', () => {
    const register = new RegisterModel('Albert', 'Test','test@gmail.com', 'password123');

    expect(register.firstName).toBe('Albert');
    expect(register.lastName).toBe('Test');
    expect(register.email).toBe('test@gmail.com');
    expect(register.password).toBe('password123');
  });

  it('should create a new register from JSON', () => {
    const json = {
      firstName: 'Albert',
      lastName: 'Test',
      email: 'test@gmail.com',
      password: 'password123'
    };

    const credentials = RegisterModel.fromJson(json);

    expect(credentials.firstName).toBe('Albert');
    expect(credentials.lastName).toBe('Test');
    expect(credentials.email).toBe('test@gmail.com');
    expect(credentials.password).toBe('password123');
  });

  it('should convert register to JSON', () => {
    const register = new RegisterModel('Albert', 'Test', 'test@gmail.com', 'password123');

    const json = register.toJson();

    expect(json.firstName).toBe('Albert');
    expect(json.lastName).toBe('Test');
    expect(json.email).toBe('test@gmail.com');
    expect(json.password).toBe('password123');
  });
});
