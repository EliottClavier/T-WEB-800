import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  buildSearchBarFormGroupControls,
  buildSearchBarFormGroupControlsDetails,
  isLocation,
  isValidTravelMode
} from "./search-bar-form-group.utils";
import {Location} from "../../models/location/location.model";

describe('Search bar\'s FormGroup utils', () => {

  describe('buildSearchBarFormGroupControls', () => {
    it('should build FormGroup\'s controls', () => {
      let formGroup: FormGroup = buildSearchBarFormGroupControls();
      expect(formGroup.get('location')).toBeDefined();
      expect(formGroup.get('locationSearch')).toBeDefined();
      expect(formGroup.get('start')).toBeDefined();
      expect(formGroup.get('end')).toBeDefined();
    });

    it('should have default values', () => {
      let formGroup: FormGroup = buildSearchBarFormGroupControls();
      expect(formGroup.get('location')!.value).toEqual(null);
      expect(formGroup.get('locationSearch')!.value).toEqual("");
      expect(formGroup.get('start')!.value).toEqual(null);
      expect(formGroup.get('end')!.value).toEqual(null);
    });
  });

  describe('buildSearchBarFormGroupControlsDetails', () => {
    it('should build FormGroup\'s controls with more details', () => {
      let formGroup: FormGroup = buildSearchBarFormGroupControlsDetails();
      expect(formGroup.get('location')).toBeDefined();
      expect(formGroup.get('locationSearch')).toBeDefined();
      expect(formGroup.get('start')).toBeDefined();
      expect(formGroup.get('end')).toBeDefined();
      expect(formGroup.get('travelMode')).toBeDefined();
    });

    it('should have default values', () => {
      let formGroup: FormGroup = buildSearchBarFormGroupControlsDetails();
      expect(formGroup.get('location')!.value).toEqual(null);
      expect(formGroup.get('locationSearch')!.value).toEqual("");
      expect(formGroup.get('start')!.value).toEqual(null);
      expect(formGroup.get('end')!.value).toEqual(null);
      expect(formGroup.get('travelMode')!.value).toEqual("");
    });
  });

  describe('isLocation', () => {
    it('should return null if control holds Location instance', () => {
      let formGroup: FormGroup = buildSearchBarFormGroupControls();
      formGroup.get('location')!.setValue(new Location("", ""));
      expect(isLocation()(formGroup.get('location')!)).toBeNull();
    });

    it('should return error if control does\'t hold Location instance', () => {
      let formControl = new FormControl("", Validators.required);
      expect(isLocation()(formControl)).toBeTruthy();
    });
  });

  describe('isValidTravelMode', () => {
    it('should return null if control holds valid travel mode', () => {
      let formGroup: FormGroup = buildSearchBarFormGroupControlsDetails();
      formGroup.get('travelMode')!.setValue("DRIVING");
      expect(isValidTravelMode()(formGroup.get('travelMode')!)).toBeNull();
    });

    it('should return error if control doesn\'t hold valid travel mode', () => {
      let formControl = new FormControl("", Validators.required);
      expect(isValidTravelMode()(formControl)).toBeTruthy();
    });
  });

});
