import { UserModel } from './user.model';
import {UserInformationsModel} from "../user-informations/user-informations.model";

describe('User', () => {
  let user: UserModel;
  let userInformations: UserInformationsModel;

  beforeEach(() => {
    userInformations = new UserInformationsModel(
      1,
      'John',
      'Doe',
      'john@doe.com'
    );
    user = new UserModel(
      userInformations,
      'token'
    );
  });

  it('should create an instance of UserModel', () => {
    expect(user).toBeTruthy();

  });

  it('should set and get the user property', () => {
    expect(user.user).toEqual(userInformations);
    let newUserInformations: UserInformationsModel = new UserInformationsModel(
      2,
      'Jane',
      'Test',
      'jane@test.com'
    );
    user.user = newUserInformations;
    expect(user.user).toEqual(newUserInformations);
  });

  it('should set and get the token property', () => {
    expect(user.token).toEqual('token');
    let token: string = 'newToken';
    user.token = token;
    expect(user.token).toEqual(token);
  });

});
