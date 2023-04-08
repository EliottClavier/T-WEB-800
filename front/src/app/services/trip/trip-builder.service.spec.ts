import {TripBuilderService} from './trip-builder.service';
import {createHttpFactory, createServiceFactory, SpectatorHttp, SpectatorService} from "@ngneat/spectator";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocationModel} from "../../models/location/location.model";
import {getAccommodationItems} from "../../utils/suggestions-mock.utils";
import {TripModel} from "../../models/trip/trip.model";
import {StepModel} from "../../models/step/step.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import TravelMode = google.maps.TravelMode;
import {getMockTrip, getMockTripForm} from "../../utils/trip.mock.utils";

describe('TripBuilderService', () => {
  let service: TripBuilderService;
  let spectator: SpectatorService<TripBuilderService>;
  let httpclient: HttpClient;
  let spectatorHttp: SpectatorHttp<TripBuilderService>;
  let forms: FormGroup;
  let step1: any;
  let step2: any;
  let tripModel: TripModel;
  let stepModel: StepModel;
  const createService = createServiceFactory({
    service: TripBuilderService,
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [HttpClient,],
  });

  const createHttp = createHttpFactory(TripBuilderService);

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    httpclient = spectator.inject(HttpClient);
    spectatorHttp = createHttp();

    tripModel = getMockTrip();
    forms = getMockTripForm();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should StepsForms is defined', () => {
    expect(service.getTripFormsInstance).toBeDefined();
  });

  it('should get a TripModel from a TripFormGroup', () => {
    expect(service.getTripFormsInstance()).toBeDefined();
    service['_stepsForms'] = forms;
    let trip: TripModel = service.saveTrip("MyTrip");
    expect(trip.steps.length).toEqual(tripModel.steps.length);
    // expect(trip).toEqual(tripModel);
  });

});
