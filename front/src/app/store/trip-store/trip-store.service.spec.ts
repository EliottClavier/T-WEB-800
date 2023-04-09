import {TripStoreService} from './trip-store.service';
import {createServiceFactory, mockProvider, SpectatorService} from "@ngneat/spectator";
import {SingleSearchBarComponent} from "../../containers/single-search-bar/single-search-bar.component";
import {TripModel} from "../../models/trip/trip.model";
import {getMockTrips} from "../../utils/trip.mock.utils";

describe('TripStoreService', () => {
  let spectator: SpectatorService<TripStoreService>;
  let service: TripStoreService;

  const createService = createServiceFactory<TripStoreService>({
    service: TripStoreService,
    providers: [
      mockProvider(TripStoreService, {}),
      SingleSearchBarComponent]
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add or upadte trip step', () => {
    let trip = getMockTrips()[0];

    service.addOrUpdateTrip(trip);
    expect(service.getTrips().length).toEqual(1);

    trip.name = "C'est le Trip 2";
    service.addOrUpdateTrip(trip);
    expect(service.getTrips().length).toEqual(1);
    expect(service.getTrips()[0].name).toEqual("C'est le Trip 2");

    let trip2 = getMockTrips()[1];

  });
  it('should trigger when adding trip in store', () => {
    let trip = getMockTrips()[0];
    service.addOrUpdateTrip(trip);

    service.trip$.subscribe((trips: TripModel[]) => {
      expect(trips).toBeDefined();
      expect(trips.length).toEqual(1);
      expect  (trips[0].name).toEqual(trip.name);
    } );
  } );

  it

});
