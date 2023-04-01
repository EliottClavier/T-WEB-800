import {TripModel} from "./trip.model";

describe('TripModel', () => {
  let trip: TripModel;

  beforeEach(() => {
    trip = new TripModel();
  });

  it('should create a new trip', () => {
    expect(trip).toBeTruthy();
  });

});
