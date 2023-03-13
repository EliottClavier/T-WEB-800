export class Register {
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // This is a static method, so it can be called without instantiating the class
  static fromJson(json: any): Register {
    return new Register(
      json.name,
      json.email,
      json.password
    );
  }

  // This is an instance method, so it can only be called after instantiating the class
  toJson(): any {
    return {
      name: this.name,
      email: this.email,
      password: this.password
    };
  }
}
