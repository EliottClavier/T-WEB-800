export class RegisterModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(firstname: any, lastname: any, email: any, password: any) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  // This is a static method, so it can be called without instantiating the class
  static fromJson(json: any): RegisterModel {
    return new RegisterModel(
      json.firstname,
      json.lastname,
      json.email,
      json.password
    );
  }

  // This is an instance method, so it can only be called after instantiating the class
  toJson(): any {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };
  }
}
