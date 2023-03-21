import {ItemModel} from "../models/item/item.model";
import {LeisureType} from "../enums/leisure-type";

 export function getAccommodationItems() {
  let data = new Array<ItemModel>();
  for (let i = 0; i < 6; i++) {
    let item = new ItemModel();
    item.typeOfItem = LeisureType.ACCOMMODATION;
    data.push(item);
  }
  return data;
}
