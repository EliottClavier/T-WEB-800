import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {LocationModel} from "../../models/location/location.model";

export const isLocation = (): ValidatorFn => {
  return (control: AbstractControl) : ValidationErrors | null => {
    return control.value instanceof LocationModel ? null : { isLocation: true };
  }
}

export const isValidTravelMode = (): ValidatorFn => {
  return (control: AbstractControl) : ValidationErrors | null => {
    let array: string[] = ["DRIVING", "WALKING", "BICYCLING", "BUS", "TRAIN", "FLIGHT"];
    return array.includes(control.value) ? null : { isValidTravelMode: true };
  }
}

export const buildSearchBarFormGroupControls = (): FormGroup => {
  let formGroup: FormGroup = new FormGroup({});
  formGroup.addControl(
    "locationSearch", new FormControl<string>("", [ Validators.required ]),
  );
  formGroup.addControl(
    "location", new FormControl<LocationModel | null>(null, [ Validators.required, isLocation() ])
  );
  formGroup.addControl(
    "start", new FormControl<Date | null>(null, [ Validators.required ])
  );
  formGroup.addControl(
    "end", new FormControl<Date | null>(null, [ Validators.required ])
  );
  return formGroup;
}

export const buildSearchBarFormGroupControlsDetails = (): FormGroup => {
  let formGroup: FormGroup = buildSearchBarFormGroupControls();
  formGroup.addControl(
    "travelMode", new FormControl<string>("", [ Validators.required, isValidTravelMode() ])
  );
  formGroup.addControl(
    "leisureMode", new FormControl<string>("", [ ])
  );

  return formGroup;
}
