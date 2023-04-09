import { TestBed } from '@angular/core/testing';

import { TransportService } from './transport.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TransportDirections} from "../../types/transport-options.type";
import {TransportRequest} from "../../types/transport-request.type";
import {getIsoStringFromDate} from "../../utils/date.utils";

describe('TransportService', () => {
  let service: TransportService;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  let transportOptionsMock: TransportDirections[] = [
      {
      directionsResult: {} as any,
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [TransportService],
    });
    service = TestBed.inject(TransportService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have HttpClient injected', () => {
    expect(service["_http"]).toBeDefined();
    expect(service["_http"]).toBeTruthy();
    expect(service["_http"]).toEqual(http);
  });

  it('should retrieve transport options with paramaters', () => {
    const directionsRequest: google.maps.DirectionsRequest = {
      origin: "Nantes",
      destination: "Paris",
      travelMode: google.maps.TravelMode.DRIVING,
    };

    const transportRequest: TransportRequest = {
      directionRequest: directionsRequest,
      startDate: getIsoStringFromDate(new Date())
    }

    service.getTransportOptions(transportRequest).subscribe(data => {
      expect(data).toEqual(transportOptionsMock[0]);
    });

    const req = httpMock.expectOne(`/api/transports/directions?origin=${transportRequest.directionRequest.origin}&destination=${transportRequest.directionRequest.destination}&travelMode=${transportRequest.directionRequest.travelMode}&startDate=${transportRequest.startDate}`);
    expect(req.request.method).toEqual('GET');
    req.flush(transportOptionsMock,{ status: 200, statusText: 'OK' });
  });

  it('should retrieve transport options with paramaters even without startDate', () => {
    const directionsRequest: google.maps.DirectionsRequest = {
      origin: "Nantes",
      destination: "Paris",
      travelMode: google.maps.TravelMode.DRIVING,
    };

    const transportRequest: TransportRequest = {
      directionRequest: directionsRequest
    }

    service.getTransportOptions(transportRequest).subscribe(data => {
      expect(data).toEqual(transportOptionsMock[0]);
    });

    const req = httpMock.expectOne(`/api/transports/directions?origin=${transportRequest.directionRequest.origin}&destination=${transportRequest.directionRequest.destination}&travelMode=${transportRequest.directionRequest.travelMode}&startDate=${transportRequest.startDate}`);
    expect(req.request.method).toEqual('GET');
    req.flush(transportOptionsMock,{ status: 200, statusText: 'OK' });
  });

});
