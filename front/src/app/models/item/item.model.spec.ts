import {ItemModel} from './item.model';
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

  it('should set and get the lat property', () => {
    expect(itemGet.lat).toEqual(0);
    itemGet.lat = 1;
    expect(itemGet.lat).toEqual(1);
  });

  it('should set and get the lng property', () => {
    expect(itemGet.lng).toEqual(0);
    itemGet.lng = 1;
    expect(itemGet.lng).toEqual(1);
  });

  it('should have return true when coordinates are valid', () => {
    expect(itemGet.hasValidCoordinates()).toEqual(true);
  });

  it('should have return false when latitude is not valid', () => {
    itemGet.lat = 100;
    expect(itemGet.hasValidCoordinates()).toEqual(false);
    itemGet.lat = -100;
    expect(itemGet.hasValidCoordinates()).toEqual(false);
  });

  it('should have return false when longitude is not valid', () => {
    itemGet.lng = 200;
    expect(itemGet.hasValidCoordinates()).toEqual(false);

    itemGet.lng = -200;
    expect(itemGet.hasValidCoordinates()).toEqual(false);
  });

});
