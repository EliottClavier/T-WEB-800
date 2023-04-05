export class UserInformationsModel {
  public _id: number;
  public _firstname: string;
  public _lastname: string;
  public _email: string;

  constructor(id: number, firstname: string, lastname: string, email: string) {
    this._id = id;
    this._firstname = firstname;
    this._lastname = lastname;
    this._email = email;
  }

  // Getter
  get id(): number {
    return this._id;
  }

  get firstname(): string {
    return this._firstname;
  }

  get lastname(): string {
    return this._lastname;
  }

  get email(): string {
    return this._email;
  }

  // Setter
  set id(id: number) {
    this._id = id;
  }

  set firstname(firstname: string) {
    this._firstname = firstname;
  }

  set lastname(lastname: string) {
    this._lastname = lastname;
  }

  set email(email: string) {
    this._email = email;
  }
}
