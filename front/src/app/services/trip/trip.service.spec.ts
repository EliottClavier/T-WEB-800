import {TripService} from './trip.service';
import {createServiceFactory, mockProvider, SpectatorService} from "@ngneat/spectator";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {LocationModel} from "../../models/location/location.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {TripStoreService} from "../../store/trip-store/trip-store.service";
import {TripModel} from "../../models/trip/trip.model";
import {TripBuilderService} from "./trip-builder.service";
import {getMockTrips, getMockTripForm} from "../../utils/trip.mock.utils";

describe('TripService', () => {

  let http: HttpClient;
  let httpMock: HttpTestingController;
  let spectator: SpectatorService<TripService>;
  let service: TripService;
  let store: TripStoreService;
  let builder: TripBuilderService;

  const createService = createServiceFactory<TripService>({
    service: TripService,
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [
      TripBuilderService,
      mockProvider(TripService, {}),
      mockProvider(TripStoreService, {getTrip() {
        }}),
    ]
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    http = spectator.inject(HttpClient);
    httpMock = spectator.inject(HttpTestingController);
    store = spectator.inject(TripStoreService);
    builder = spectator.inject(TripBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have HttpClient injected', () => {
    expect(service["_httpclient"]).toBeDefined();
    expect(service["_httpclient"]).toBeTruthy();
    expect(service["_httpclient"]).toEqual(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get trip data', () => {
    expect(service.getTripData()).toBeDefined();
  });

  it('should be send trip data', () => {
  let data = getMockTrips()
    expect(service.sendTripData(data)).toBeDefined();
  });
});
