import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Location} from "../../models/location/location.model";

export const isLocation = (): ValidatorFn => {
  return (control: AbstractControl) : ValidationErrors | null => {
    return control.value instanceof Location ? null : { isLocation: true };
  }
}

export const buildSearchBarFormGroupControls = (): FormGroup => {
  let formGroup: FormGroup = new FormGroup({});
  formGroup.addControl(
    "locationSearch", new FormControl<string>("", [ Validators.required ]),
  );
  formGroup.addControl(
    "location", new FormControl<Location | null>(null, [ Validators.required, isLocation() ])
  );
  formGroup.addControl(
    "start", new FormControl<Date | null>(null, [ Validators.required ])
  );
  formGroup.addControl(
    "end", new FormControl<Date | null>(null, [ Validators.required ])
  );
  return formGroup;
}
