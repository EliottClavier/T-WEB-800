import {StepModel} from "../step/step.model";
import {v4 as uuidv4} from "uuid";
import {UserModel} from "../users/user.model";
import {UserInformationsModel} from "../user-informations/user-informations.model";


export class TripModel{

  private _id: string;
  private _name: string;
  private _steps: StepModel[];
  private _startDate: string = '';
  private _endDate: string = '';
  private _user? : UserInformationsModel;
  private _isSaved: boolean = false;

  constructor(id: string = uuidv4(), name : string= '' ,steps: StepModel[]= []) {

    this._id = id;
    this._name = name;
    this._steps = steps;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get steps(): StepModel[] {
    return this._steps;
  }

  set steps(value: StepModel[]) {
    this._steps = value;
  }

  get startDate(): string {
    return this._startDate;
  }

  set startDate(value: string) {
    this._startDate = value;
  }

  get endDate(): string {
    return this._endDate;
  }

  set endDate(value: string) {
    this._endDate = value;
  }


  get user(): UserInformationsModel {
    return this._user as UserInformationsModel;
  }

  set user(value: UserInformationsModel | undefined) {
    this._user = value;
  }


  get isSaved(): boolean {
    return this._isSaved;
  }

  set isSaved(value: boolean) {
    this._isSaved = value;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      steps: this.steps,
      startDate: this.startDate,
      endDate: this.endDate,
      user: this.user,
      isSaved: this.isSaved
    };
  }
}
