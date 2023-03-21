import { Location } from './location.model';

describe('Location', () => {
  let location: Location;
  let locationEmpty: Location;

  beforeEach(() => {
    location = new Location("1", 'Paris');
    locationEmpty = new Location();
  });

  it('should create an instance of Location', () => {
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

});
