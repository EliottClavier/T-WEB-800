export class CredentialsModel {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  // This is a static method, so it can be called without instantiating the class
  static fromJson(json: any): CredentialsModel {
    return new CredentialsModel(
      json.email,
      json.password
    );
  }

  // This is an instance method, so it can only be called after instantiating the class
  toJson(): any {
    return {
      email: this.email,
      password: this.password
    };
  }
}
