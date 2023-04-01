import {StepModel} from "../step/step.model";


export class TripModel{


  private _id: string;
  private _name: string;
  private _steps: StepModel[];
  private _startDate: string = '';
  private _endDate: string = '';
  private _isSaved: boolean = false;



  constructor(id: string = '', name : string= '' ,steps: StepModel[]= []) {


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

  get isSaved(): boolean {
    return this._isSaved;
  }

  set isSaved(value: boolean) {
    this._isSaved = value;
  }
}
