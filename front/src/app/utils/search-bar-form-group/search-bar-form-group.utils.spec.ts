import {FormControl, FormGroup, Validators} from "@angular/forms";
import {buildSearchBarFormGroupControls, isLocation} from "./search-bar-form-group.utils";
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

});
