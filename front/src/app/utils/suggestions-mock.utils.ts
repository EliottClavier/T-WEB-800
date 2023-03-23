import {LeisureItemModel} from "../models/Leisure/leisure.item.model";
import {LeisureCategory} from "../enums/leisure-category";

 export function getAccommodationItems() {
  let data = new Array<LeisureItemModel>();
  for (let i = 0; i < 6; i++) {
    let item = new LeisureItemModel();
    item.category = LeisureCategory.ACCOMMODATION;
    data.push(item);
  }
  return data;
}
export function getBarItems() {
  let data = new Array<LeisureItemModel>();
  for (let i = 0; i < 6; i++) {
    let item = new LeisureItemModel();
    item.category = LeisureCategory.BAR;
    data.push(item);
  }
  return data;
}
export function getRestaurantItems() {
  let data = new Array<LeisureItemModel>();
  for (let i = 0; i < 6; i++) {
    let item = new LeisureItemModel();
    item.category = LeisureCategory.RESTAURANT;
    data.push(item);
  }
  return data;
}
export function getSportingItems() {
  let data = new Array<LeisureItemModel>();
  for (let i = 0; i < 6; i++) {
    let item = new LeisureItemModel();
    item.category = LeisureCategory.SPORTING_EVENT;
    data.push(item);
  }
  return data;
}
export function getCulturalItems() {
  let data = new Array<LeisureItemModel>();
  for (let i = 0; i < 6; i++) {
    let item = new LeisureItemModel();
    item.category = LeisureCategory.CULTURAL_EVENT;
    data.push(item);
  }
  return data;
}
  export function getUnknownItems() {
  let data = new Array<LeisureItemModel>();
  for (let i = 0; i < 6; i++) {
    let item = new LeisureItemModel();
    item.category = LeisureCategory.UNKNOWN;
    data.push(item);
  }
  return data;
}
