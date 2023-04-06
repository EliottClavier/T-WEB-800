import {TripService} from './trip.service';
import {
  createHttpFactory,
  createServiceFactory,
  HttpMethod,
  mockProvider,
  SpectatorHttp,
  SpectatorService
} from "@ngneat/spectator";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TripStoreService} from "../../store/trip-store/trip-store.service";
import {TripBuilderService} from "./trip-builder.service";
import {getMockTrips} from "../../utils/trip.mock.utils";

describe('TripService', () => {

  let http: HttpClient;
  let spectatorHttp: SpectatorHttp<TripService>;
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
  const createHttp = createHttpFactory(TripService);

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    http = spectator.inject(HttpClient);
    httpMock = spectator.inject(HttpTestingController);
    store = spectator.inject(TripStoreService);
    builder = spectator.inject(TripBuilderService);
    spectatorHttp = createHttp();
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
    expect(service.sendTripsData(data)).toBeDefined();
  });

  it('should test HttpClient getTrip', () => {
    let trips = getMockTrips()

    spectatorHttp.service.getTripData().subscribe(
      (data) => {
        expect(data).toEqual(trips);
      }
    )

    let req = spectatorHttp.expectOne(`/api/trips/`, HttpMethod.GET);
    req.flush(trips);
    expect(req.request.method).toEqual('GET');

  });

  it('should test HttpClient sendTrip', () => {
    let trips = getMockTrips()

    spectatorHttp.service.sendTripsData(trips).subscribe(
      (data) => {
        expect(trips).toEqual(data);
      }
    )

    let req = spectatorHttp.expectOne(`/api/trips/add`, HttpMethod.POST);
    req.flush(trips);
    expect(req.request.method).toEqual('POST');

  });
});
