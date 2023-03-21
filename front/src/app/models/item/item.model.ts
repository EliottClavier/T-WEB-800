import {LeisureType} from "../../enums/leisure-type";

export class ItemModel {

  id: string = "";
  title: string = "default title";
  subtitle?: string = "default subtitle";
  description: string = "default description";
  image: string = './assets/images/default_image.jpg';
  private _typeOfItem?: LeisureType;

  public get typeOfItem(): LeisureType {
    return this._typeOfItem as LeisureType;
  }

  public set typeOfItem(type: LeisureType){
    this._typeOfItem = type;
  }
}
