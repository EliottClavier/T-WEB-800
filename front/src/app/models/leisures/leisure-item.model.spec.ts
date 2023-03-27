import {LeisureItemModel} from './leisure-item.model';
import {LeisureCategory} from "../../enums/leisure-category";

describe('ItemModel', () => {
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

  it('should set and get the lat property', () => {
    expect(itemGet.location.lat).toEqual(0);
    itemGet.location.lat = 1;
    expect(itemGet.location.lat).toEqual(1);
  });

  it('should set and get the lng property', () => {
    expect(itemGet.location.lng).toEqual(0);
    itemGet.location.lng = 1;
    expect(itemGet.location.lng).toEqual(1);
  });

  it('should have return true when coordinates are valid', () => {
    expect(itemGet.hasValidCoordinates()).toEqual(true);
  });

  it('should have return false when latitude is not valid', () => {
    itemGet.location.lat = 100;
    expect(itemGet.hasValidCoordinates()).toEqual(false);
    itemGet.location.lat = -100;
    expect(itemGet.hasValidCoordinates()).toEqual(false);
  });

  it('should have return false when longitude is not valid', () => {
    itemGet.location.lng = 200;
    expect(itemGet.hasValidCoordinates()).toEqual(false);

    itemGet.location.lng = -200;
    expect(itemGet.hasValidCoordinates()).toEqual(false);
  });

});
