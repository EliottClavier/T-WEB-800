import { LocationModel } from './location.model';

describe('Location', () => {
  let location: LocationModel;
  let locationEmpty: LocationModel;

  beforeEach(() => {
    location = new LocationModel("1", "Paris", 0, 0);
    locationEmpty = new LocationModel();
  });

  it('should create an instance of LocationModel', () => {
    expect(location).toBeTruthy();
  });

  it('should have null values when no value are passed on instantiation', () => {
    expect(locationEmpty.id).toEqual("");
    expect(locationEmpty.name).toEqual("");
    expect(locationEmpty.lat).toEqual(0);
    expect(locationEmpty.lng).toEqual(0);
  });

  it('should set and get the id property', () => {
    expect(location.id).toEqual('1');
    location.id = '2';
    expect(location.id).toEqual('2');
  });

  it('should set and get the name property', () => {
    expect(location.name).toEqual('Paris');
    location.name = 'Lyon';
    expect(location.name).toEqual('Lyon');
  });

  it('should set and get the lat property', () => {
    expect(location.lat).toEqual(0);
    location.lat = 1;
    expect(location.lat).toEqual(1);
  });

  it('should set and get the lng property', () => {
    expect(location.lng).toEqual(0);
    location.lng = 1;
    expect(location.lng).toEqual(1);
  });

  it('should have return true when coordinates are valid', () => {
    expect(location.hasValidCoordinates()).toEqual(true);
  });

  it('should have return false when latitude is not valid', () => {
    location.lat = 100;
    expect(location.hasValidCoordinates()).toEqual(false);
    location.lat = -100;
    expect(location.hasValidCoordinates()).toEqual(false);
  });

  it('should have return false when longitude is not valid', () => {
    location.lng = 200;
    expect(location.hasValidCoordinates()).toEqual(false);

    location.lng = -200;
    expect(location.hasValidCoordinates()).toEqual(false);
  });

});
