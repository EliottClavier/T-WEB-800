import {LeisureItemModel} from "../models/Leisure/leisure.item.model";
import {LeisureType} from "../enums/leisure-type";

 export function getAccommodationItems() {
  let data = new Array<LeisureItemModel>();
  for (let i = 0; i < 6; i++) {
    let item = new LeisureItemModel();
    item.typeOfItem = LeisureType.ACCOMMODATION;
    data.push(item);
  }
  return data;
}
