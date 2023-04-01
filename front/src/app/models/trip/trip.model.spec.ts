import {TripModel} from "./trip.model";
import {getIsoStringFromDate} from "../../utils/date.utils";

describe('TripModel', () => {
  let trip: TripModel;

  beforeEach(() => {
    trip = new TripModel();
  });

  it('should create a new trip', () => {
    expect(trip).toBeTruthy();
  });

  it('should set and get the id property', () => {
    expect(trip.id.length).toEqual(36);
    trip.id = '2';
    expect(trip.id).toEqual('2');
  });

  it('should set and get the name property', () => {
    expect(trip.name).toEqual('');
    trip.name = 'myTrip';
    expect(trip.name).toEqual('myTrip');
  } );


  it('should set and get the start property', () => {
    let start = trip.startDate;
    expect(trip.startDate).toEqual(start);
    trip.startDate = getIsoStringFromDate(new Date());
    expect(trip.startDate).toEqual(getIsoStringFromDate(new Date()));
  });

  it('should set and get the end property', () => {
    let end = trip.endDate;
    expect(trip.endDate).toEqual(end);
    trip.endDate = getIsoStringFromDate(new Date());
    expect(trip.endDate).toEqual(getIsoStringFromDate(new Date()));
  } );

  it('should set and get the steps property', () => {
    let steps = trip.steps;
    expect(trip.steps).toEqual(steps);
    trip.steps = [];
    expect(trip.steps).toEqual([]);
  });

  it('should set and get the isSaved property', () => {
    let isSaved = trip.isSaved;
    expect(trip.isSaved).toEqual(isSaved);
    trip.isSaved = true;
    expect(trip.isSaved).toEqual(true);
  });


});
