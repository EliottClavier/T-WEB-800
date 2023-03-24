import {LeisureCategory} from "../../enums/leisure-category";
import {Location} from "../location/location.model";

export class LeisureItemModel {



  id: string = "";
  title: string = "default title";
  subtitle?: string = "default subtitle";
  description: string = "default description";
  private _image: string = './assets/images/default_image.jpg';
  private _category: LeisureCategory = LeisureCategory.UNKNOWN;
  private _location: Location
  private _rating: number = 0;
  private _price: number = 0;
  private _date?: string

  constructor() {
    this._location = new Location();
    this._date = undefined;
  }

  get date(): string {
    return this._date as string;
  }

  set date(value: string) {
    this._date = value;
  }
  get location(): Location {
    return this._location;
  }

  set location(value: Location) {
    this._location = value;
  }
  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  public get category(): LeisureCategory {
    return this._category as LeisureCategory;
  }

  public set category(type: LeisureCategory){
    this._category = type;
  }


  categoryTranslateKey(): string {

    switch (this.category){
      case LeisureCategory.ACCOMMODATION:
        return 'leisure_category_accommodations'.toString();
      case LeisureCategory.BAR:
        return 'leisure_category_bar'.toString();
      case LeisureCategory.RESTAURANT:
        return 'leisure_category_restaurant'.toString();
        case LeisureCategory.CULTURAL_EVENT:
        return 'leisure_category_cultural_event'.toString();
      case LeisureCategory.SPORTING_EVENT:
        return 'leisure_category_sporting_event'.toString();
      default:

        return 'unknown'.toString();
    }
  }
}
