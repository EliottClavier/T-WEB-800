import {RegisterModel} from "./register.model";

describe('RegisterTest', () => {
  it('should create a new register', () => {
    const register = new RegisterModel('Albert', 'Test','test@gmail.com', 'password123');

    expect(register.firstname).toBe('Albert');
    expect(register.lastname).toBe('Test');
    expect(register.email).toBe('test@gmail.com');
    expect(register.password).toBe('password123');
  });

  it('should create a new register from JSON', () => {
    const json = {
      firstname: 'Albert',
      lastname: 'Test',
      email: 'test@gmail.com',
      password: 'password123'
    };

    const credentials = RegisterModel.fromJson(json);

    expect(credentials.firstname).toBe('Albert');
    expect(credentials.lastname).toBe('Test');
    expect(credentials.email).toBe('test@gmail.com');
    expect(credentials.password).toBe('password123');
  });

  it('should convert register to JSON', () => {
    const register = new RegisterModel('Albert', 'Test', 'test@gmail.com', 'password123');

    const json = register.toJson();

    expect(json.firstname).toBe('Albert');
    expect(json.lastname).toBe('Test');
    expect(json.email).toBe('test@gmail.com');
    expect(json.password).toBe('password123');
  });
});
