import {StepModel} from "./step.model";
import {LocationModel} from "../location/location.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {getAccommodationItems, getRestaurantItems} from "../../utils/suggestions-mock.utils";
import TravelMode = google.maps.TravelMode;


describe('StepModel', () => {

  let step: StepModel;

  beforeEach(() => {
    step = new StepModel();
  });

  it('should create a new step', () => {
    expect(step).toBeTruthy();
  });
  it('should set and get the id property', () => {
    expect(step.id.length).toEqual(36);
    step.id = '2';
    expect(step.id).toEqual('2');
  });
  it('should set and get the name property', () => {

    expect(step.name).toEqual('');
    step.name = 'Lyon';
    expect(step.name).toEqual('Lyon');
  });

  it('should set and get the location property', () => {
    let location = step.location;
    expect(location).toEqual(new LocationModel("", "", 0, 0));
    let nantes = new LocationModel("2", "Nantes", 0, 0);
    step.location = nantes;
    expect(step.location).toEqual(nantes);
  });

  it('should set and get the start property', () => {
    expect(step.start).toEqual(getIsoStringFromDate(new Date()));
    step.start = getIsoStringFromDate(new Date());
    expect(step.start).toEqual(getIsoStringFromDate(new Date()));
  });

  it('should set and get the end property', () => {
    let end = step.end;
    expect(step.end).toEqual(end);
    step.end = getIsoStringFromDate(new Date());
    expect(step.end).toEqual(getIsoStringFromDate(new Date()));
  });

  it('should set and get the leisure property', () => {
    let leisure = getAccommodationItems()
    step.leisures = leisure;
    expect(step.leisures).toEqual(leisure);

    step.leisures = getRestaurantItems();
    expect(step.leisures).toEqual(getRestaurantItems());
  });

  it('should set and get the travelMode property', () => {
    expect(step.travelMode).toEqual(undefined);
    step.travelMode = TravelMode.WALKING;
    expect(step.travelMode).toEqual(TravelMode.WALKING);
  });

  it('should set and get the index property', () => {
    expect(step.stepIndex).toEqual(0);
    step.stepIndex = 1;
    expect(step.stepIndex).toEqual(1);
  });


});
