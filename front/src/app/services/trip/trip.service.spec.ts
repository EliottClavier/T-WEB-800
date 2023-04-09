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
import {of, throwError} from "rxjs";
import {TripModel} from "../../models/trip/trip.model";
import {AuthService} from "../auth/auth.service";
import {UserInformationsModel} from "../../models/user-informations/user-informations.model";
import {UserModel} from "../../models/users/user.model";

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
      mockProvider(TripStoreService, {
        getTrips() {
        }
      }),
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
    let data = getMockTrips()[0]
    expect(service.sendTripData(data)).toBeDefined();
  });

  it('should test HttpClient getTrip', () => {
    let trips = getMockTrips()

    spectatorHttp.service.getTripData().subscribe(
      (data) => {
        expect(data).toEqual(trips);
      }
    )

    let req = spectatorHttp.expectOne(`/api/trip/all?id=undefined`, HttpMethod.GET);
    req.flush(trips);
    expect(req.request.method).toEqual('GET');

  });

  it('should test HttpClient sendTrip', () => {
    let trip = getMockTrips()[0]

    spectatorHttp.service.sendTripData(trip).subscribe(
      (data) => {
        expect(trip).toEqual(data);
      }
    )

    let req = spectatorHttp.expectOne(`/api/trip`, HttpMethod.POST);
    req.flush(trip);
    expect(req.request.method).toEqual('POST');

  });
  it('should test HttpClient deleteTrip', () => {

    let trip = getMockTrips()[0]
    let id = trip.id

    spectatorHttp.service.deleteTrip(id).subscribe(
      (data) => {
        expect(id).toEqual(data);
      }
    )

    let req = spectatorHttp.expectOne(`/api/trip?id=${id}`, HttpMethod.DELETE);
    req.flush(id);
    expect(req.request.method).toEqual('DELETE');
  });

  it('should test sendTripAndUpdateStore', () => {
    let trip = getMockTrips()[0]
    let id = trip.id
    let spy = spyOn(service, 'sendTripAndUpdateStore').and.callThrough(

    );

    service.sendTripAndUpdateStore(trip);
    let req = spectatorHttp.expectOne(`/api/trip`, HttpMethod.POST);
    req.flush(trip);
    expect(req.request.method).toEqual('POST');
    expect(spy).toHaveBeenCalled();
  });

  it('should create a new trip and call addOrUpdateTrip with the response on success', () => {
    const authService = spectator.inject(AuthService);
    const tripStoreService = spectator.inject(TripStoreService);
    const httpClient = spectator.inject(HttpClient);
    const testUserInformation: UserInformationsModel = new UserInformationsModel(1, 'Doe', 'John', 'jd@jd.fr  ');
    const testUser = new UserModel(testUserInformation, 'test-token');
    const testData: TripModel = getMockTrips()[0];
    testData.user = testUserInformation;
    const expectedTrip: TripModel = new TripModel(testData.id, testData.name, testData.steps);

    authService.user = testUser;
    spyOn(httpClient, 'post').and.returnValue(of(expectedTrip));

    spectator.service.sendTripAndUpdateStore(testData);

    expect(httpClient.post).toHaveBeenCalled();
    expect(tripStoreService.addOrUpdateTrip).toHaveBeenCalledWith(expectedTrip);
  });
  it('should call addOrUpdateTrip with the original data on error', () => {
    const authService = spectator.inject(AuthService);
    const tripStoreService = spectator.inject(TripStoreService);
    const httpClient = spectator.inject(HttpClient);
    const testUserInformation: UserInformationsModel = new UserInformationsModel(1, 'Doe', 'John', 'jd@jd.fr  ');
    const testUser = new UserModel(testUserInformation, 'test-token');
    const testData: TripModel = getMockTrips()[0];
    testData.user = testUserInformation;

    authService.user = testUser;
    spyOn(httpClient, 'post').and.returnValue(throwError('Error'));

    spyOn(console, 'log'); // To prevent the error from being logged in the test output

    spectator.service.sendTripAndUpdateStore(testData);

    expect(httpClient.post).toHaveBeenCalled();
    expect(tripStoreService.addOrUpdateTrip).toHaveBeenCalledWith(testData);
  });

});
