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
