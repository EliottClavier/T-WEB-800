import {LeisureItemModel} from './leisure.item.model';
import {Spectator} from "@ngneat/spectator";
import {LeisureCategory} from "../../enums/leisure-category";

describe('LeisureItemModel', () => {
  let itemModel: LeisureItemModel;
  let itemGet: LeisureItemModel;
  let setSpy :any
  let getSpy :any

  beforeEach(() => {
    itemModel = new LeisureItemModel();
    itemGet = new LeisureItemModel();
    itemModel.category = LeisureCategory.ACCOMMODATION;
    setSpy = spyOnProperty(itemModel, 'category').and.callThrough();
    getSpy = spyOnProperty(itemGet, 'category').and.returnValue(
      LeisureCategory.BAR
    );
  });

  it('should create an instance of Item', () => {
    expect(itemModel).toBeTruthy();
  });

  it('should be set type of item', () => {
    expect(itemModel.category).toBe(LeisureCategory.ACCOMMODATION);
    expect(setSpy).toHaveBeenCalled();
  });
  it('should be get type of item', () => {
    expect(itemGet.category).toBe(LeisureCategory.BAR);
    expect(getSpy).toHaveBeenCalled();
  });
});
