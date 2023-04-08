import {Injectable} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {buildStepFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {LocationModel} from "../../models/location/location.model";
import {TripModel} from "../../models/trip/trip.model";
import {StepModel} from "../../models/step/step.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import TravelMode = google.maps.TravelMode;


@Injectable({
  providedIn: 'root'
})
export class TripBuilderService {


  private _stepsForms?: FormGroup;
  private _trip: TripModel = new TripModel();

  setTripFormsInstance(tripForm: FormGroup | undefined) {
    this._stepsForms = tripForm;
  }

  getTripFormsInstance(): FormGroup {
    if (this._stepsForms == null) {
      this._stepsForms =
        new FormGroup({
          searchFormsArray: new FormArray<FormGroup>([
            buildStepFormGroupControlsDetails(),
          ]),
        });


    }

    const searchFormsArray = this._stepsForms?.get('searchFormsArray') as FormArray;
    const idFormControl = searchFormsArray?.at(0)?.get('id');
    if (idFormControl) {

      idFormControl.patchValue(this._trip.id);

    }
    // console.log('trip id ' + this._stepsForms?.controls['searchFormsArray'].value[0].id);
    // console.log('idFormControl ' + idFormControl?.value);
    // console.log('idTrip ' + this._trip.id);
    return this._stepsForms;
  }

  setName(value: string) {
    this._trip.name = value;

  }

  getName(): string {
    return this._trip.name;
  }

  set stepsForms(value: FormGroup) {
    this._stepsForms = value;
  }

  get searchFormsArray(): FormArray {
    return this.getTripFormsInstance().get('searchFormsArray') as FormArray;
  }

  get searchFormsArrayControls(): FormGroup[] {
    return this.searchFormsArray.controls as FormGroup[];
  }

  public activeStepBar: SearchBarEvent = {
    index: 0,
    isEditing: false,
  };

  constructor() {
  }

  public getTripFormFromTripModel(trip: TripModel): FormGroup<any> {
    this.newTrip()
    this._trip = trip;

    this.getTripFormsInstance();

    (this._stepsForms?.get('searchFormsArray') as FormArray)?.at(0)?.get('id')?.patchValue(trip.id);

    let stepsLength: number = this._trip?.steps?.length;
    for (let i = 0; i < stepsLength - 1; i++) {
      this.searchFormsArray.controls.push(buildStepFormGroupControlsDetails())
    }

    this._trip?.steps?.forEach((step: StepModel) => {

      (this._stepsForms?.get('searchFormsArray') as FormArray)?.at(step?.index)?.get('locationSearch')?.patchValue(step?.name);
      this.searchFormsArray.controls[step?.index].get('location')?.patchValue(step?.location);
      this.searchFormsArray.controls[step?.index].get('start')?.patchValue(new Date(step?.start));
      this.searchFormsArray.controls[step?.index].get('end')?.patchValue(new Date(step?.end));
      this.searchFormsArray.controls[step?.index].get('id')?.patchValue(step?.id);
      this.searchFormsArray.controls[step?.index].get('name')?.patchValue(step?.name);
      this.searchFormsArray.controls[step?.index].get('leisures')?.patchValue(step?.leisures);
      this.searchFormsArray.controls[step?.index].get('travelMode')?.patchValue(step?.travelMode);
    });

    return this._stepsForms as FormGroup;
  }

  private _isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  private _getStepModelFromTripFormGroup(): TripModel {

    let index = 0;
    let travelLength = this.getTripFormsInstance()?.controls['searchFormsArray'].value.length;
    this._trip.steps = new Array<StepModel>();
    this.getTripFormsInstance()?.controls['searchFormsArray'].value.forEach((step: any) => {

      let stepModel = new StepModel();

      stepModel.id = step.id;
      stepModel.index = index;
      stepModel.name = step.locationSearch as string;
      stepModel.location = step.location as LocationModel;
      stepModel.leisures = step.leisures as LeisureItemModel[];
      stepModel.start = getIsoStringFromDate(step.start);
      stepModel.end = getIsoStringFromDate(step.end || step.start);
      stepModel.index = index++;

      index == -travelLength ? stepModel.travelMode = undefined : (stepModel.travelMode = step.travelMode as TravelMode);

      this._trip.steps.push(stepModel);

    });

    return this._trip
  }

  private _getTripDates(): void {
    this._trip.startDate = this._trip.steps[0].start
    this._trip.endDate = this._trip.steps[this._trip.steps.length - 1].end || this._trip.steps[this._trip.steps.length - 1].start
  }

  public saveTrip(tripName: string) {
    this._getStepModelFromTripFormGroup()
    this._trip.name = tripName;
    this._trip.steps;
    this._getTripDates();
    return this._trip
  }

  newTrip() {
    this._trip = new TripModel();
    this._stepsForms?.reset();
    this._stepsForms?.controls['searchFormsArray'].reset();
    this._stepsForms =
      new FormGroup({
        searchFormsArray: new FormArray<FormGroup>([
          buildStepFormGroupControlsDetails(),
        ]),
      });
    this.setName("");
    this.getTripFormsInstance()
  }
}
