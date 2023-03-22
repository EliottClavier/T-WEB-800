import {LeisureCategory} from "../../enums/leisure-category";

export class LeisureItemModel {

  id: string = "";
  title: string = "default title";
  subtitle?: string = "default subtitle";
  description: string = "default description";
  image: string = './assets/images/default_image.jpg';
  private _category?: LeisureCategory;

  public get category(): LeisureCategory {
    return this._category as LeisureCategory;
  }

  public set category(type: LeisureCategory){
    this._category = type;
  }
}
