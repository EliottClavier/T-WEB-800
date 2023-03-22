import {LeisureCategory} from "../../enums/leisure-category";

export class LeisureItemModel {

  id: string = "";
  title: string = "default title";
  subtitle?: string = "default subtitle";
  description: string = "default description";
  image: string = './assets/images/default_image.jpg';
  private _category: LeisureCategory = LeisureCategory.UNKNOWN;

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
