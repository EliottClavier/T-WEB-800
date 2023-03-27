import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Location} from "../../models/location/location.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {LeisureCategory} from "../../enums/leisure-category";

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

  let testLeisure = LeisureCategory.ACCOMMODATION;

  let testLocationInformations: any[] = [
    {
      "name": "firstAccommodation",
      "type": testLeisure,
    },
    {
      "name": "firstBar",
      "type": LeisureCategory.BAR,
    },
    {
      "name": "secondAccommodation",
      "type": testLeisure,
    },
  ]

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

  it('should retrieve location suggestions with location search', () => {
    let locationName = "Nan";

    service.getLocationSuggestions(locationName).subscribe(data => {
      expect(data).toEqual(testLocationOptions.filter(
        (location: Location) => location.name.toLowerCase().startsWith(locationName.toLowerCase())
      ));
    });

    const req = httpMock.expectOne(`/api/locations/suggestion/${locationName}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testLocationOptions.filter(
      (location: Location) => location.name.toLowerCase().startsWith(locationName.toLowerCase())
    ), { status: 200, statusText: 'OK' });
  });

  it('should retrieve location informations with location search', () => {
    let locationName = "Nan";

    service.getLocationInformations(locationName, testLeisure).subscribe(data => {
      expect(data).toEqual(testLocationInformations.filter(
        (item: any) => item.type === testLeisure
      ));
    });

    const req = httpMock.expectOne(
      `/api/locations/search/${locationName}/${testLeisure}?start=${getIsoStringFromDate(new Date())}&end=${getIsoStringFromDate(new Date())}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testLocationInformations.filter(
      (item: any) => item.type === testLeisure
    ), { status: 200, statusText: 'OK' });
  });

  it('should retrieve location informations with location search and custom dates', () => {
    let locationName = "Nan";
    let start = new Date("2021-01-01");
    let end= new Date("2022-01-02");

    service.getLocationInformations(locationName, testLeisure, start, end).subscribe(data => {
      expect(data).toEqual(testLocationInformations.filter(
        (item: any) => item.type === testLeisure
      ));
    });

    const req = httpMock.expectOne(
      `/api/locations/search/${locationName}/${testLeisure}?start=${getIsoStringFromDate(start)}&end=${getIsoStringFromDate(end)}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testLocationInformations.filter(
      (item: any) => item.type === testLeisure
    ), { status: 200, statusText: 'OK' });
  });

});
