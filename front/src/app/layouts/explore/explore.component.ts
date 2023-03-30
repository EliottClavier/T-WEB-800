import {Component, OnChanges, OnInit} from '@angular/core';
import {
  Form,
  FormArray,
  FormGroup,
} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "../../models/location/location.model";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {
  buildSearchBarFormGroupControlsDetails
} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {ItineraryMode} from "../../types/itinerary-mode.type";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public searchForms: FormGroup = new FormGroup({
    searchFormsArray: new FormArray<FormGroup>([
      buildSearchBarFormGroupControlsDetails(),
    ]),
  });

  public activeSearchBar: SearchBarEvent = {
    index: 0,
    isEditing: false,
  };

  public itineraryView: boolean = false;

  public itineraryMode: ItineraryMode = {
    travelMode: google.maps.TravelMode.DRIVING,
  }

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

  get nextLocation(): Location | undefined {
    return this.searchFormsArrayControls[this.activeSearchBar.index + 1]?.get('location')?.value as Location | undefined
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  public ngOnInit(): void {
    this._loadRouteParams();
  }

  private _isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  private _loadRouteParams(): void {
    this.searchFormsArrayControls[0] = buildSearchBarFormGroupControlsDetails();
    let start: Date | null = this._route.snapshot.queryParams['start'] ? new Date(this._route.snapshot.queryParams['start']) : null;
    let end: Date | null = this._route.snapshot.queryParams['end'] ? new Date(this._route.snapshot.queryParams['end']) : null;
    let lat: string = this._route.snapshot.queryParams['lat'];
    let lng: string = this._route.snapshot.queryParams['lng'];
    if (lat && lng) {
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
      });
    } else {
      this._router.navigate(['/']);
    }
  }

  public onViewChange(view: string): void {
    switch(view) {
      case "itinerary":
        this.itineraryView = true;
        if (!this.selectedSearchForm.get('travelMode')?.value) {
          this.selectedSearchForm.get('travelMode')?.patchValue(google.maps.TravelMode.DRIVING);
        }
        break;
      case "location":
      default:
        this.itineraryView = false;
        break;
    }
  }

  public onItineraryModeChange(itineraryMode: ItineraryMode): void {
    this.itineraryMode = itineraryMode;
    if (itineraryMode.transitMode) {
      this.selectedSearchForm.get('travelMode')?.patchValue(itineraryMode.transitMode);
    } else {
      this.selectedSearchForm.get('travelMode')?.patchValue(itineraryMode.travelMode);
    }
  }
}
