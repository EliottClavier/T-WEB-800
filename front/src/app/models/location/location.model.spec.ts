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
});
