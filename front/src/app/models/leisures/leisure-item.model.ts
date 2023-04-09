
import {LeisureCategory} from "../../enums/leisure-category";
import {LocationModel} from "../location/location.model";

export class LeisureItemModel {

  private _id: string;
  private _title: string;
  private _subtitle?: string;
  private _description: string;
  private _image: string;
  private _category: LeisureCategory;
  private _location: LocationModel
  private _rating: number = 0;
  private _price: number = 0;
  private _date?: string

  constructor(
    id: string = "",
    title: string = "default title",
    subtitle: string = "default subtitle",
    description: string = "default description",
    image: string = './assets/images/default_image.jpg',
    location = new LocationModel(),
    category: LeisureCategory = LeisureCategory.UNKNOWN,
    date = "",
    rating = 0,
    price = 0,
  ) {
    this._id = id;
    this._title = title;
    this._subtitle = subtitle;
    this._description = description;
    this._image = image;
    this._location = location;
    this._category = category;
    this._date = date;
    this._rating = rating;
    this._price = price;

  }

  public hasValidCoordinates(): boolean {
    return -90 <= this.location.lat && this.location.lat <= 90 && -90 <= this.location.lng && this.location.lng <= 90;
  }

  get date(): string {
    return this._date as string;
  }

  set date(value: string) {
    this._date = value;
  }
  get location(): LocationModel {
    return this._location;
  }

  set location(value: LocationModel) {
    this._location = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get subtitle(): string {
    return this._subtitle as string;
  }

  set subtitle(value: string) {
    this._subtitle = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get category(): LeisureCategory {
    return this._category as LeisureCategory;
  }

  set category(type: LeisureCategory){
    this._category = type;
  }


  categoryTranslateKey(): string {

    switch (this.category) {
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
    static categoryTranslateKey(category: LeisureCategory): string {

      switch (category){
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
  toJson() {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      description: this.description,
      image: this.image,
      location: this.location,
      category: this.category,
      date: this.date,
      rating: this.rating,
      price: this.price
    };
  }
}
