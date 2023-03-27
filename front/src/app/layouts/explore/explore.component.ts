import {Component, OnChanges, OnInit} from '@angular/core';
import {
  AbstractControl, Form,
  FormArray,
  FormGroup,
} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from "../../models/location/location.model";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {
  buildSearchBarFormGroupControlsDetails
} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {ItineraryMode} from "../../types/itinerary-mode.type";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {LeisureCategory} from "../../enums/leisure-category";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";
import {SearchDates} from "../../types/SearchDates";
import {getIsoStringFromDate} from "../../utils/date.utils";

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

  onActiveSearchBarChange($event: SearchBarEvent) {
    this.activeSearchBar = $event;

      let formArrayElement : FormArray = this.searchFormsArray;
      let formControls  = formArrayElement.at(this.activeSearchBar.index);
      let location : Location = formControls.get('location')?.value;

    let start: Date = formControls.get('start')?.value;
    let end: Date = formControls.get('end')?.value;
    let intervalDate: SearchDates = { start, end };

    let leisure: LeisureCategory = formControls.get('activity')?.value;
    this._getSuggestions(leisure, location, intervalDate);


  }

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
    private _suggestionsService: SuggestionsService,
    private _suggestionsStore: SuggestionsStoreService) {

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

  private _getSuggestions(leisure: LeisureCategory = LeisureCategory.ACCOMMODATION, location: Location, interval: SearchDates): void {
    let start: string = getIsoStringFromDate(interval.start);
    let end: string = getIsoStringFromDate(interval.end);
    this._suggestionsService.getSuggestions(leisure, location, start, end).subscribe((data) => {
      this._suggestionsStore.setSuggestionsData(data);
    });

  }

  public onViewChange(view: string): void {
    switch(view) {
      case "itinerary":
        this.itineraryView = true;
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
