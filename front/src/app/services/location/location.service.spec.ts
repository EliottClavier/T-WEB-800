import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Location} from "../../models/location/location.model";

describe('LocationService', () => {
  let service: LocationService;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  let testLocationOptions: Location[] = [
    new Location("1", "Paris"),
    new Location("2", "Lyon"),
    new Location("3", "Marseille"),
    new Location("4", "Nantes"),
    new Location("5", "Nanterre"),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [LocationService],
    });
    service = TestBed.inject(LocationService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have HttpClient injected', () => {
    expect(service["http"]).toBeDefined();
    expect(service["http"]).toBeTruthy();
    expect(service["http"]).toEqual(http);
  });

  it('should retrieve location options with location search', () => {
    let locationName = "Nan";

    service.getLocationsBySearch(locationName).subscribe(data => {
      expect(data).toEqual(testLocationOptions.filter(
        (location: Location) => location.getName.toLowerCase().startsWith(locationName.toLowerCase())
      ));
    });

    const req = httpMock.expectOne(`/api/locations/search/${locationName}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testLocationOptions.filter(
      (location: Location) => location.getName.toLowerCase().startsWith(locationName.toLowerCase())
    ), { status: 200, statusText: 'OK' });
  });

});
