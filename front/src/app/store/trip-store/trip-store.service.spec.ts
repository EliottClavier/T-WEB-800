import {TripStoreService} from './trip-store.service';
import {createServiceFactory, mockProvider, SpectatorService} from "@ngneat/spectator";
import {SingleSearchBarComponent} from "../../containers/single-search-bar/single-search-bar.component";
import {TripModel} from "../../models/trip/trip.model";
import {getMockTrips} from "../../utils/trip.mock.utils";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TripStoreService', () => {
  let spectator: SpectatorService<TripStoreService>;
  let service: TripStoreService;

  const createService = createServiceFactory<TripStoreService>({
    service: TripStoreService,
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
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
      expect(trips[0].name).toEqual(trip.name);
    });
  });

  it('should trigger when updating trip in store', () => {
    const expectedValues = [1, 0];
    let index = 0;
    let trip = getMockTrips()[0];
    service.addOrUpdateTrip(trip);

    service.trip$.subscribe((trips: TripModel[]) => {
      expect(trips).toBeDefined();
      expect(trips[0].name).toEqual(trip.name);
      expect(service.getTrips().length).toEqual(expectedValues[index]);
      index++;
    });
    trip.name = "C'est le step 2";
  });

  it('should delete trip', () => {
    let trip = getMockTrips()[0];
    service.addOrUpdateTrip(trip);
    expect(service.getTrips().length).toEqual(1);

    service.deleteTrip(trip.id);
    expect(service.getTrips().length).toEqual(0);
  });

  it('should trigger when deleting trip in store', () => {
    const expectedValues = [1, 0];
    let index = 0;
    service.trip$.subscribe().unsubscribe()
    let trip = getMockTrips()[1];
    trip.id = "1";
    service.addOrUpdateTrip(trip);
    expect(service.getTrips().length).toEqual(1);
    expect(service.getTrips()[0].id).toEqual(trip.id);

    service.trip$.subscribe((trips: TripModel[]) => {
      expect(trips).toBeDefined();
      expect(service.getTrips().length).toEqual(expectedValues[index]);
      index++;
    });

    service.deleteTrip(trip.id);
    expect(service.getTrips().length).toEqual(0);
  });


  it('should get trip by id', () => {
    let trip = getMockTrips()[0];
    service.addOrUpdateTrip(trip);
    expect(service.getTrips().length).toEqual(1);

    let trip2 = service.getTripById(trip.id);
    expect(trip2).toBeDefined();
    expect(trip2.id).toEqual(trip.id);
  });

  it('should get new trip if id not found', () => {
    // let trip = getMockTrips()[0];
    // service.addOrUpdateTrip(trip);
    // expect(service.getTrips().length).toEqual(1);

    let trip2 = service.getTripById("2");
    expect(trip2).toBeDefined();
  });

});
