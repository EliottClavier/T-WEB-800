import {ItemModel} from './item.model';
import {Spectator} from "@ngneat/spectator";
import {LeisureType} from "../../enums/leisure-type";

describe('ItemModel', () => {
  let itemModel: ItemModel;
  let itemGet: ItemModel;
  let setSpy :any
  let getSpy :any

  beforeEach(() => {
    itemModel = new ItemModel();
    itemGet = new ItemModel();
    itemModel.typeOfItem = LeisureType.ACCOMMODATION;
    setSpy = spyOnProperty(itemModel, 'typeOfItem').and.callThrough();
    getSpy = spyOnProperty(itemGet, 'typeOfItem').and.returnValue(
      LeisureType.BAR
    );
  });

  it('should create an instance of Item', () => {
    expect(itemModel).toBeTruthy();
  });

  it('should be set type of item', () => {
    expect(itemModel.typeOfItem).toBe(LeisureType.ACCOMMODATION);
    expect(setSpy).toHaveBeenCalled();
  });
  it('should be get type of item', () => {
    expect(itemGet.typeOfItem).toBe(LeisureType.BAR);
    expect(getSpy).toHaveBeenCalled();
  });

});
