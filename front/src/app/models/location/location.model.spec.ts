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
    expect(locationEmpty.getId).toEqual("");
    expect(locationEmpty.getName).toEqual("");
  });

  it('should set and get the id property', () => {
    expect(location.getId).toEqual('1');
    location.setId = '2';
    expect(location.getId).toEqual('2');
  });

  it('should set and get the name property', () => {
    expect(location.getName).toEqual('Paris');
    location.setName = 'Lyon';
    expect(location.getName).toEqual('Lyon');
  });
});
