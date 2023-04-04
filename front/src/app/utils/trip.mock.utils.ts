import {FormBuilder, FormGroup} from "@angular/forms";
import {getIsoStringFromDate} from "./date.utils";
import {getAccommodationItems} from "./suggestions-mock.utils";
import {TripModel} from "../models/trip/trip.model";
import {StepModel} from "../models/step/step.model";
import {LocationModel} from "../models/location/location.model";
import TravelMode = google.maps.TravelMode;

export function tripsTest() {
  return {
    "id": 0,
    "name": "string",
    "description": "string",
    "startDate": "2020-10-15T00:00:00.000Z",
    "endDate": "2020-10-15T00:00:00.000Z",
    "location": {
      "id": 0,
      "name": "string",
      "country": "string",
      "city": "string",
      "address": "string",
      "zipCode": "string",
      "latitude": 0,
      "longitude": 0,
      "type": "string"
    },
    "leisureItems": [
      {
        "id": 0,
        "name": "string",
        "description": "string",
        "startDate": "2020-10-15T00:00:00.000Z",
        "endDate": "2020-10-15T00:00:00.000Z",
        "location": {
          "id": 0,
          "name": "string",
          "country": "string",
          "city": "string",
          "address": "string",
          "zipCode": "string",
          "latitude": 0,
          "longitude": 0,
          "type": "string"
        },
        "type": "string"
      }
    ]
  };
}
export function getMockTrip() : TripModel {

  let date = getIsoStringFromDate(new Date());
  let leisures = getAccommodationItems();
  let tripModel = new TripModel();
  let stepModel = new StepModel('0', 'step1', new LocationModel(), leisures, date, date);
  stepModel.travelMode = TravelMode.DRIVING;
  let step2Model = new StepModel('1', 'step2', new LocationModel(), leisures, date, date);
  step2Model.travelMode = TravelMode.DRIVING;
  tripModel.steps.push(stepModel);
  tripModel.steps.push(step2Model);

  return tripModel;
}

export function getMockTrips() : TripModel[] {
  let trips = [];
  trips.push(getMockTrip());
  trips.push(getMockTrip());
  return trips;
}

export function getMockTripForm() {

  let builder = new FormBuilder();
  let forms : FormGroup;

let tripModel = getMockTrip();
let stepModel = tripModel.steps[0];
let step2Model = tripModel.steps[1];


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
  return forms;
}
