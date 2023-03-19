import {ItemType} from "../ItemType";

export class ItemModel {

  id: string = "";
  title: string = "default title";
  subtitle?: string = "default subtitle";
  description: string = "default description";
  image: string = './assets/images/default_image.jpg';
  private _typeOfItem?: ItemType;

  public get typeOfItem(): ItemType {
    return this._typeOfItem as ItemType;
  }

  public set typeOfItem(type: ItemType){
    this._typeOfItem = type;
  }
}
