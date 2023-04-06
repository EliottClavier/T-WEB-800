import {Injectable} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {buildStepFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {LocationModel} from "../../models/location/location.model";
import {TripModel} from "../../models/trip/trip.model";
import {StepModel} from "../../models/step/step.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import TravelMode = google.maps.TravelMode;
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";


@Injectable({
  providedIn: 'root'
})
export class TripBuilderService {


  private _stepsForms?: FormGroup;
  private _trip: TripModel = new TripModel();


  getTripFormsInstance(): FormGroup {
    if (this._stepsForms == null) {
      this._stepsForms =
        new FormGroup({
          searchFormsArray: new FormArray<FormGroup>([
            buildStepFormGroupControlsDetails(),
          ]),
        });
      const searchFormsArray = this._stepsForms?.get('searchFormsArray') as FormArray;
      const idFormControl = searchFormsArray?.at(0)?.get('id');
      if (idFormControl) {
        idFormControl.setValue(this._trip.id);
      }
    }
    return this._stepsForms;
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

  private _getStepModelFromTripFormGroup(): TripModel {

    let index = 0;
    let travelLength = this.getTripFormsInstance()?.controls['searchFormsArray'].value.length;
    this._trip.steps = new Array<StepModel>();
    this.getTripFormsInstance()?.controls['searchFormsArray'].value.forEach((step: any) => {

      let stepModel = new StepModel();
      stepModel.index = index;
      stepModel.name = step.locationSearch as string;
      stepModel.location = step.location as LocationModel;
      stepModel.leisures = step.leisures as LeisureItemModel[];
      stepModel.start = getIsoStringFromDate(step.start);
      stepModel.end = getIsoStringFromDate(step.end);
      stepModel.index = index++;

      index == -travelLength ? stepModel.travelMode = undefined : (stepModel.travelMode = step.travelMode as TravelMode);

      this._trip.steps.push(stepModel);

    });

    console.log(this.getTripFormsInstance()?.controls['searchFormsArray'].value)
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
    this._trip.isSaved = true;
    this._getTripDates();
    return this._trip
  }
}
