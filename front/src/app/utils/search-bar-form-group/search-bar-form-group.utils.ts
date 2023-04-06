import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {LocationModel} from "../../models/location/location.model";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";

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

export const buildStepFormGroupControls = (): FormGroup => {
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
  formGroup.addControl(
    "id", new FormControl<string>("" )
  );
  formGroup.addControl(
    "name", new FormControl<string>("" )
  );
  return formGroup;
}

export const buildStepFormGroupControlsDetails = (): FormGroup => {
  let formGroup: FormGroup = buildStepFormGroupControls();
  formGroup.addControl(
    "travelMode", new FormControl<string>("", [ Validators.required, isValidTravelMode() ])
  );
  formGroup.addControl(
    "leisures", new FormControl<LeisureItemModel[]>([], [ ])
  );

  return formGroup;
}
