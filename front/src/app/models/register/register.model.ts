export class Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(firstName: any, lastName: any, email: any, password: any) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  // This is a static method, so it can be called without instantiating the class
  static fromJson(json: any): Register {
    return new Register(
      json.firstName,
      json.lastName,
      json.email,
      json.password
    );
  }

  // This is an instance method, so it can only be called after instantiating the class
  toJson(): any {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };
  }
}
