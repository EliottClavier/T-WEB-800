import {TripBuilderService} from './trip-builder.service';
import {createHttpFactory, createServiceFactory, SpectatorHttp, SpectatorService} from "@ngneat/spectator";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControl, FormGroup} from "@angular/forms";
import {TripModel} from "../../models/trip/trip.model";
import {StepModel} from "../../models/step/step.model";
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

  it('should setName', () => {
    service.setName("MyTrip");
    expect(service.getName()).toEqual("MyTrip");
  });

  it('should set the trip forms instance', () => {
    const testFormGroup = new FormGroup({
      tripName: new FormControl('Test Trip'),
    });

    spectator.service.setTripFormsInstance(testFormGroup);

    expect((spectator.service as any)._stepsForms).toEqual(testFormGroup);
  });
  it('should get the trip form from trip model', () => {
    const testTrip: TripModel = getMockTrip();

    spyOn(spectator.service, 'newTrip');
    spyOn(spectator.service, 'getTripFormsInstance').and.callThrough();

    spectator.service.getTripFormFromTripModel(testTrip);

    expect(spectator.service.newTrip).toHaveBeenCalled();
    expect(spectator.service.getTripFormsInstance).toHaveBeenCalled();

    expect(service?.searchFormsArray?.at(0).get('name')?.value).toEqual(testTrip.steps[1].name);

  });
  it('should create a new trip and reset the trip form', () => {

    spyOn(spectator.service, 'getTripFormsInstance').and.callThrough();
    spyOn(spectator.service, 'setName');

    spectator.service.newTrip();

    expect((spectator.service as any)._stepsForms.get('searchFormsArray').length).toEqual(1);

    expect(spectator.service.getTripFormsInstance).toHaveBeenCalled();
    expect(spectator.service.setName).toHaveBeenCalledWith('');

    // You can also add more assertions to check if the form controls are reset and initialized
  });


  it('should get the trip start and end dates when the last step has an end date', () => {

    const testTrip: TripModel = getMockTrip();

    // (spectator.service as any)._stepsForms = getMockTripForm();
    (spectator.service as any)._trip = testTrip;

    (spectator.service as any)._getTripDates();

    expect(testTrip.startDate).toEqual(testTrip.steps[0].start);
    expect(testTrip.endDate).toEqual(testTrip.steps[testTrip.steps.length - 1].end);


    // tripModel.steps[testTrip.steps.length - 1].end = '';
    // (spectator.service as any)._getTripDates();
    // expect(testTrip.startDate).toEqual(testTrip.steps[0].start);
    // expect(testTrip.endDate).toEqual(testTrip.steps[testTrip.steps.length - 1].start);
  });
  it('should get the trip start date and set end date to the start date of the last step when the last step has no end date', () => {
    const testTrip: TripModel = getMockTrip();
    (spectator.service as any)._trip = testTrip;
    // tripModel.steps[testTrip.steps.length - 1].end = '';
    console.log(tripModel.steps[testTrip.steps.length - 1].end);
    console.log(testTrip.endDate);
    // Call the private method using the bracket notation
    expect(testTrip.endDate).not.toEqual(testTrip.steps[testTrip.steps.length - 1].end);
    (spectator.service as any)._getTripDates();
    console.log(testTrip.endDate);
    expect(testTrip.startDate).toEqual(testTrip.steps[0].start);
    expect(testTrip.endDate).toEqual(testTrip.steps[testTrip.steps.length - 1].start);
    // expect(1).toEqual(0);

  });


});
