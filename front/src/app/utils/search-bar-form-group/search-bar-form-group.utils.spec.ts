import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  buildStepFormGroupControls,
  buildStepFormGroupControlsDetails,
  isLocation,
  isValidTravelMode
} from "./search-bar-form-group.utils";
import {LocationModel} from "../../models/location/location.model";

describe('Search bar\'s FormGroup utils', () => {

  describe('buildSearchBarFormGroupControls', () => {
    it('should build FormGroup\'s controls', () => {
      let formGroup: FormGroup = buildStepFormGroupControls();
      expect(formGroup.get('location')).toBeDefined();
      expect(formGroup.get('locationSearch')).toBeDefined();
      expect(formGroup.get('start')).toBeDefined();
      expect(formGroup.get('end')).toBeDefined();
    });

    it('should have default values', () => {
      let formGroup: FormGroup = buildStepFormGroupControls();
      expect(formGroup.get('location')!.value).toEqual(null);
      expect(formGroup.get('locationSearch')!.value).toEqual("");
      expect(formGroup.get('start')!.value).toEqual(null);
      expect(formGroup.get('end')!.value).toEqual(null);
    });
  });

  describe('buildSearchBarFormGroupControlsDetails', () => {
    it('should build FormGroup\'s controls with more details', () => {
      let formGroup: FormGroup = buildStepFormGroupControlsDetails();
      expect(formGroup.get('location')).toBeDefined();
      expect(formGroup.get('locationSearch')).toBeDefined();
      expect(formGroup.get('start')).toBeDefined();
      expect(formGroup.get('end')).toBeDefined();
      expect(formGroup.get('travelMode')).toBeDefined();
    });

    it('should have default values', () => {
      let formGroup: FormGroup = buildStepFormGroupControlsDetails();
      expect(formGroup.get('location')!.value).toEqual(null);
      expect(formGroup.get('locationSearch')!.value).toEqual("");
      expect(formGroup.get('start')!.value).toEqual(null);
      expect(formGroup.get('end')!.value).toEqual(null);
      expect(formGroup.get('travelMode')!.value).toEqual("");
    });
  });

  describe('isLocation', () => {
    it('should return null if control holds LocationModel instance', () => {
      let formGroup: FormGroup = buildStepFormGroupControls();
      formGroup.get('location')!.setValue(new LocationModel("", ""));
      expect(isLocation()(formGroup.get('location')!)).toBeNull();
    });

    it('should return error if control does\'t hold LocationModel instance', () => {
      let formControl = new FormControl("", Validators.required);
      expect(isLocation()(formControl)).toBeTruthy();
    });
  });

  describe('isValidTravelMode', () => {
    it('should return null if control holds valid travel mode', () => {
      let formGroup: FormGroup = buildStepFormGroupControlsDetails();
      formGroup.get('travelMode')!.setValue("DRIVING");
      expect(isValidTravelMode()(formGroup.get('travelMode')!)).toBeNull();
    });

    it('should return error if control doesn\'t hold valid travel mode', () => {
      let formControl = new FormControl("", Validators.required);
      expect(isValidTravelMode()(formControl)).toBeTruthy();
    });
  });

});
