import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from "../../models/location/location.model";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public searchForms: FormGroup = new FormGroup({
    searchFormsArray: new FormArray<FormGroup>([
      new FormGroup({}),
    ]),
  });

  get searchFormsArray(): FormArray {
    return this.searchForms.get('searchFormsArray') as FormArray;
  }

  get searchFormsArrayControls(): FormGroup[] {
    return this.searchFormsArray.controls as FormGroup[];
  }

  constructor(private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._loadRouteParams();
  }

  private isLocation(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      return control.value instanceof Location ? null : { isLocation: true };
    }
  }

  private _buildFormGroupControls(formGroup: FormGroup): void {
    formGroup.addControl(
      "locationSearch", new FormControl<string>("", [ Validators.required ]),
    );
    formGroup.addControl(
      "location", new FormControl<Location | null>(null, [ Validators.required, this.isLocation() ])
    );
    formGroup.addControl(
      "start", new FormControl<Date | null>(null, [ Validators.required ])
    );
    formGroup.addControl(
      "end", new FormControl<Date | null>(null, [ Validators.required ])
    );
  }

  private _isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  private _loadRouteParams(): void {
    let formGroup: FormGroup = this.searchFormsArrayControls[0];
    this._buildFormGroupControls(formGroup);
    let start: Date | null = this._route.snapshot.queryParams['start']! ? new Date(this._route.snapshot.queryParams['start']!) : null;
    let end: Date | null = this._route.snapshot.queryParams['end']! ? new Date(this._route.snapshot.queryParams['end']!) : null;
    formGroup.patchValue({
      locationSearch: this._route.snapshot.params['location']!,
      location: new Location("", this._route.snapshot.params['location']!),
      start: this._isValidDate(start) ? start : null,
      end: this._isValidDate(start) ? end : null,
    })
  }

}
