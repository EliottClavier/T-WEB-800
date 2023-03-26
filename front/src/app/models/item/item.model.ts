import {LeisureType} from "../../enums/leisure-type";

export class ItemModel {

  public id: string;
  public title: string;
  public subtitle?: string;
  public description: string;
  public image: string;
  public lat: number = 0;
  public lng: number = 0;
  private _typeOfItem?: LeisureType;

  constructor(
    id: string = "",
    title: string = "default title",
    subtitle: string = "default subtitle",
    description: string = "default description",
    image: string = './assets/images/default_image.jpg',
    lat: number = 0,
    lng: number = 0,
    _typeOfItem?: LeisureType
  ) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.image = image;
    this.lat = lat;
    this.lng = lng;
    this._typeOfItem = _typeOfItem;
  }

  public get typeOfItem(): LeisureType {
    return this._typeOfItem as LeisureType;
  }

  public set typeOfItem(type: LeisureType){
    this._typeOfItem = type;
  }

  public hasValidCoordinates(): boolean {
    return -90 <= this.lat && this.lat <= 90 && -90 <= this.lng && this.lng <= 90;
  }
}
