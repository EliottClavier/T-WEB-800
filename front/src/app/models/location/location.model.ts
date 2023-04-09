import {v4 as uuidv4} from "uuid";

export class LocationModel {
  private _id: string;
  private _name: string;
  private _lng: number;
  private _lat: number;

  constructor(id: string = "", name: string = "", lat: number = 0, lng: number = 0) {
    this._id = id;
    this._name = name;
    this._lat = lat;
    this._lng = lng;
  }

  public hasValidCoordinates(): boolean {
    return -90 <= this._lat && this._lat <= 90 && -180 <= this._lng && this._lng <= 180;
  }

  // Getter
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get lat(): number {
    return this._lat;
  }

  get lng(): number {
    return this._lng;
  }

  // Setter
  set id(id: string) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set lng(value: number) {
    this._lng = value;
  }

  set lat(value: number) {
    this._lat = value;
  }

  getCoordinates(): string {
    return this.lat + "," + this.lng;
  }
}
