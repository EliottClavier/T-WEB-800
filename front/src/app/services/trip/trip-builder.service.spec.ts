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

    let date = getIsoStringFromDate(new Date());
    let leisures = getAccommodationItems();
    tripModel = new TripModel();
    stepModel = new StepModel('0', 'step1', new LocationModel(), leisures, date, date);
    stepModel.travelMode = TravelMode.DRIVING;
    let step2Model = new StepModel('1', 'step2', new LocationModel(), leisures, date, date);
    step2Model.travelMode = TravelMode.DRIVING;
    tripModel.steps.push(stepModel);
    tripModel.steps.push(step2Model);

    let builder = new FormBuilder();
    forms = builder.group({
      searchFormsArray: builder.array([
        builder.group({
          locationSearch: step2Model.name,
          location: step2Model.location,
          travelMode: step2Model.travelMode,
          start: new Date(step2Model.start),
          end: new Date(step2Model.end),
          leisures: step2Model.leisures,
        }),
        builder.group({
          locationSearch: stepModel.name,
          location: stepModel.location,
          travelMode: stepModel.travelMode,
          start: new Date(stepModel.start),
          end: new Date(stepModel.end),
          leisures: [stepModel.leisures],
        }),
      ])
    });
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
