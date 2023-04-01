import {LeisureItemModel} from "../leisures/leisure-item.model";
import {LocationModel} from "../location/location.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import TravelMode = google.maps.TravelMode;

export class StepModel {

  private _id: string;
  private _name: string;
  private _location: LocationModel;
  private _leisures: LeisureItemModel[];
  private _start: string;
  private _end: string;
  private _travelMode?: TravelMode;
  private _index: number = 0;

  constructor(
    id: string = "0", name: string = "",
    location: LocationModel = new LocationModel(),
    leisures: LeisureItemModel[] = new Array<LeisureItemModel>(),
    start: string = getIsoStringFromDate(new Date()),
    end: string = getIsoStringFromDate(new Date())) {

    this._id = id;
    this._name = name;
    this._leisures = leisures;
    this._location = location;
    this._start = start;
    this._end = end;

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

  get start(): string {
    return this._start;
  }

  set start(value: string) {
    this._start = value;
  }

  get end(): string {
    return this._end;
  }

  set end(value: string) {
    this._end = value;
  }

  get location(): LocationModel {
    return this._location;
  }

  set location(value: LocationModel) {
    this._location = value;
  }

  get leisures(): LeisureItemModel[] {
    return this._leisures;
  }

  set leisures(value: LeisureItemModel[]) {
    this._leisures = value;
  }

  get travelMode(): google.maps.TravelMode {
    return this._travelMode as google.maps.TravelMode;
  }

  set travelMode(value: google.maps.TravelMode | undefined) {
    this._travelMode = value;
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }
}
