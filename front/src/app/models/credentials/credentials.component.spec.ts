import {Credentials} from "./credentials.model";

describe('CredentialsModelTest', () => {
  it('should create a new credentials', () => {
    const credentials = new Credentials('test@gmail.com', 'password123');

    expect(credentials.email).toBe('test@gmail.com');
    expect(credentials.password).toBe('password123');
  });

  it('should create a new credentials from JSON', () => {
    const json = {
      email: 'test@gmail.com',
      password: 'password123'
    };

    const credentials = Credentials.fromJson(json);

    expect(credentials.email).toBe('test@gmail.com');
    expect(credentials.password).toBe('password123');
  });

  it('should convert credentials to JSON', () => {
    const credentials = new Credentials( 'test@gmail.com', 'password123');

    const json = credentials.toJson();

    expect(json.email).toBe('test@gmail.com');
    expect(json.password).toBe('password123');
  });
});
