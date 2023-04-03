import {UserInformationsModel} from "../user-informations/user-informations.model";

export class UserModel {
  private _user: UserInformationsModel;
  private _token: string;

  constructor(user: UserInformationsModel, token: string) {
    this._user = user;
    this._token = token;
  }

  // Getter
  get user(): UserInformationsModel {
    return this._user;
  }

  get token(): string {
    return this._token;
  }

  // Setter
  set user(user: UserInformationsModel) {
    this._user = user;
  }

  set token(token: string) {
    this._token = token;
  }

}
