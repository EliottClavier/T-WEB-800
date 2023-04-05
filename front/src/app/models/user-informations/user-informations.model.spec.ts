import {UserInformationsModel} from "./user-informations.model";

describe('UserInformations', () => {
  let userInformations: UserInformationsModel;

  beforeEach(() => {
    userInformations = new UserInformationsModel(
      1,
      'John',
      'Doe',
      'john@doe.com'
    );
  });

  it('should create an instance of UserInformationsModel', () => {
    expect(userInformations).toBeTruthy();
  });

  it('should set and get the id property', () => {
    expect(userInformations.id).toEqual(1);
    let id: number = 2;
    userInformations.id = id;
    expect(userInformations.id).toEqual(id);
  });

  it('should set and get the firstname property', () => {
    expect(userInformations.firstname).toEqual('John');
    let firstName: string = 'Jane';
    userInformations.firstname = firstName;
    expect(userInformations.firstname).toEqual(firstName);
  });

  it('should set and get the lastname property', () => {
    expect(userInformations.lastname).toEqual('Doe');
    let lastName: string = 'Test';
    userInformations.lastname = lastName;
    expect(userInformations.lastname).toEqual(lastName);
  });

  it('should set and get the email property', () => {
    expect(userInformations.email).toEqual(userInformations.email);
    let email: string = 'jane@test2.com';
    userInformations.email = email;
    expect(userInformations.email).toEqual(email);
  });

});
