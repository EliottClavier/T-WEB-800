export class Location {


  private _id: string;
  private _name: string;
  private _lng: number;
  private _lat: number;

  constructor(id: string = "", name: string = "", lng: number = 0, lat: number = 0) {
    this._id = id;
    this._name = name;
    this._lng = lng;
    this._lat = lat;
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
}
