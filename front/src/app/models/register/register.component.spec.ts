import {Register} from "./register.model";

describe('RegisterModelTest', () => {
  it('should create a new register', () => {
    const register = new Register('Test','test@gmail.com', 'password123');

    expect(register.name).toBe('Test');
    expect(register.email).toBe('test@gmail.com');
    expect(register.password).toBe('password123');
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
});
