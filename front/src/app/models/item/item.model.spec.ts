import {ItemModel} from './item.model';
import {Spectator} from "@ngneat/spectator";
import {ItemType} from "../ItemType";

describe('ItemModel', () => {
  let itemModel: ItemModel;
  let itemGet: ItemModel;
  let setSpy :any
  let getSpy :any

  beforeEach(() => {
    itemModel = new ItemModel();
    itemGet = new ItemModel();
    itemModel.typeOfItem = ItemType.ACCOMMODATION;
    setSpy = spyOnProperty(itemModel, 'typeOfItem').and.callThrough();
    getSpy = spyOnProperty(itemGet, 'typeOfItem').and.returnValue(
      ItemType.BAR
    );
  });

  it('should create an instance of Item', () => {
    expect(itemModel).toBeTruthy();
  });

  it('should be set type of item', () => {
    expect(itemModel.typeOfItem).toBe(ItemType.ACCOMMODATION);
    expect(setSpy).toHaveBeenCalled();
  });
  it('should be get type of item', () => {
    expect(itemGet.typeOfItem).toBe(ItemType.BAR);
    expect(getSpy).toHaveBeenCalled();
  });

});
