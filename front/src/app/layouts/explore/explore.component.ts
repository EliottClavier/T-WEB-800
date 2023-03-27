import {Component, OnInit} from '@angular/core';
import {FormArray, FormGroup,} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {LocationModel} from "../../models/location/location.model";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildSearchBarFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
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

    let formArrayElement: FormArray = this.searchFormsArray;
    let formControls = formArrayElement.at(this.activeSearchBar.index);
    let location: LocationModel = formControls.get('location')?.value;

    let start: Date = formControls.get('start')?.value;
    let end: Date = formControls.get('end')?.value;
    let intervalDate: SearchDates = {start, end};

    // let leisure: LeisureCategory = formControls.get('leisure')?.value;
    let leisure: LeisureCategory = this._suggestionsStore.getCategory;

    this._getPreviewSuggestions(leisure, location, intervalDate);
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

  get selectedLocation(): LocationModel {
    return this.selectedSearchForm.get('location')?.value as LocationModel;
  }

  get nextLocation(): LocationModel | undefined {
    return this.searchFormsArrayControls[this.activeSearchBar.index + 1]?.get('location')?.value as LocationModel | undefined
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
      location: new LocationModel(
        "",
        this._route.snapshot.params['location']!,
        Number(lat),
        Number(lng),
      ),
      start: this._isValidDate(start) ? start : null,
      end: this._isValidDate(start) ? end : null,
    })
  }

  private _getPreviewSuggestions(leisure: LeisureCategory = LeisureCategory.ACCOMMODATION, location: LocationModel, interval: SearchDates): void {
    let start: string = getIsoStringFromDate(interval.start);
    let end: string = getIsoStringFromDate(interval.end);
    this._suggestionsService.getPreviewSuggestions(leisure, location, start, end)?.subscribe((data) => {
      this._suggestionsStore.setSuggestionsData(data);
    });

  }

  public onViewChange(view: string): void {
    switch (view) {
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

  public getLeisureSuggestions() {

    // let form  = buildSearchBarFormGroupControlsDetails();

    let category = this._suggestionsStore.getCategory;
    let location = this._suggestionsStore.getLocation;
    // let start = form.get('start')?.value;
    // let end = form.get('end')?.value;

    let formArrayElement: FormArray = this.searchFormsArray;
    let formControls = formArrayElement.at(this.activeSearchBar.index);

    let start: Date = this.selectedSearchForm.get('start')?.value
    let end: Date = this.selectedSearchForm.get('end')?.value

    // let start: Date = formControls.get('start')?.value;
    // let end: Date = formControls.get('end')?.value;
    // let location: LocationModel = formControls.get('location')?.value;

    this._suggestionsService.getSuggestions(category, location, getIsoStringFromDate(start), getIsoStringFromDate(end)).subscribe({
        next: (suggestions) => {
          this._suggestionsStore.setSuggestionsData(suggestions);
        },
        // error: (err) => {
        //   this._suggestionsStore.setSuggestionsData(new Array<LeisureItemModel>());
        // }
      }
    );
  }
}
