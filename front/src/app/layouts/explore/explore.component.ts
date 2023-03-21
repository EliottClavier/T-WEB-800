import {Component, OnChanges, OnInit} from '@angular/core';
import {
  FormArray,
  FormGroup,
} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from "../../models/location/location.model";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildSearchBarFormGroupControls} from "../../utils/search-bar-form-group/search-bar-form-group.utils";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public searchForms: FormGroup = new FormGroup({
    searchFormsArray: new FormArray<FormGroup>([
      buildSearchBarFormGroupControls(),
    ]),
  });

  public activeSearchBar: SearchBarEvent = {
    index: 0,
    isEditing: false,
  };

  get searchFormsArray(): FormArray {
    return this.searchForms.get('searchFormsArray') as FormArray;
  }

  get searchFormsArrayControls(): FormGroup[] {
    return this.searchFormsArray.controls as FormGroup[];
  }

  get selectedSearchForm(): FormGroup {
    return this.searchFormsArrayControls[this.activeSearchBar.index];
  }

  get selectedLocation(): Location {
    return this.selectedSearchForm.get('location')?.value as Location;
  }

  constructor(private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._loadRouteParams();
  }

  private _isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  private _loadRouteParams(): void {
    this.searchFormsArrayControls[0] = buildSearchBarFormGroupControls();
    let start: Date | null = this._route.snapshot.queryParams['start'] ? new Date(this._route.snapshot.queryParams['start']) : null;
    let end: Date | null = this._route.snapshot.queryParams['end'] ? new Date(this._route.snapshot.queryParams['end']) : null;
    let lat: string = this._route.snapshot.queryParams['lat'] || "0";
    let lng: string = this._route.snapshot.queryParams['lng'] || "0";
    this.searchFormsArrayControls[0].patchValue({
      locationSearch: this._route.snapshot.params['location']!,
      location: new Location(
        "",
        this._route.snapshot.params['location']!,
        Number(lat),
        Number(lng),
      ),
      start: this._isValidDate(start) ? start : null,
      end: this._isValidDate(start) ? end : null,
    })
  }

}
