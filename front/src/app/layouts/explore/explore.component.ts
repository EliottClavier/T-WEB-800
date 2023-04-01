import {Component, OnInit} from '@angular/core';
import {FormArray, FormGroup,} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationModel} from "../../models/location/location.model";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildStepFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {ItineraryMode} from "../../types/itinerary-mode.type";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {LeisureCategory} from "../../enums/leisure-category";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {getAccommodationItems, getBarItems} from "../../utils/suggestions-mock.utils";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public searchForms: FormGroup = new FormGroup({
    searchFormsArray: new FormArray<FormGroup>([
      buildStepFormGroupControlsDetails(),
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

    // let leisure: LeisureCategory = formControls.get('leisure')?.value;
    let leisure: LeisureCategory = this._suggestionsStore.getCategory;

    this.getPreviewSuggestions(leisure, location, start, end);
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
    private _route: ActivatedRoute, private _router: Router,
    private _suggestionsService: SuggestionsService,
    private _suggestionsStore: SuggestionsStoreService) {
  }


  public ngOnInit(): void {
    this._loadRouteParams();
    this._suggestionsStore.leisureItemToAdd$.subscribe((item: LeisureItemModel) => {
      if (item) {
        this.onAddingLeisureInStep(item);
      }});
    }



  private _isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  private _loadRouteParams(): void {
    this.searchFormsArrayControls[0] = buildStepFormGroupControlsDetails();
    let start: Date | null = this._route.snapshot.queryParams['start'] ? new Date(this._route.snapshot.queryParams['start']) : null;
    let end: Date | null = this._route.snapshot.queryParams['end'] ? new Date(this._route.snapshot.queryParams['end']) : null;
    let lat: string = this._route.snapshot.queryParams['lat'];
    let lng: string = this._route.snapshot.queryParams['lng'];
    if (lat && lng) {
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
    } else {
      this._router.navigate(['/']);
    }
  }

  getPreviewSuggestions(leisure: LeisureCategory = LeisureCategory.ACCOMMODATION, location: LocationModel = new LocationModel("", "Nantes", 42.555, 37.444), startInterval: Date = new Date(), endInterval: Date = new Date()): void {
    let start: string = getIsoStringFromDate(startInterval);
    let end: string = getIsoStringFromDate(endInterval);

    this._suggestionsService.getPreviewSuggestions(leisure, location, start, end)?.subscribe(  {
        next: (data) => {
        this._suggestionsStore.setSuggestionsData(data);
      },
      error: (error) => {
        alert("error");
        this._suggestionsStore.setSuggestionsData(getAccommodationItems());
      }
  });
  }

  public onViewChange(view: string): void {
    switch (view) {
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
  public onSelectedCategoryChange(value: LeisureCategory) {
    this.getPreviewSuggestions(value);
  }

  public onAddingLeisureInStep(item: LeisureItemModel): void {
    let leisures : LeisureItemModel[] = this.selectedSearchForm.get('leisures')?.value;
    leisures.push(item);
    this.selectedSearchForm.get('leisures')?.setValue(leisures);
    alert((this.selectedSearchForm.get('leisures')?.value).length);
  }

  public getLeisureSuggestions() {

    let start: Date = this.selectedSearchForm.get('start')?.value
    let end: Date = this.selectedSearchForm.get('end')?.value
    let category: LeisureCategory = this.selectedSearchForm.get('leisure')?.value
    let location: LocationModel = this.selectedSearchForm.get('location')?.value
    alert(category)
    this._suggestionsService.getSuggestions(category, location, getIsoStringFromDate(start), getIsoStringFromDate(end)).subscribe({
        next: (suggestions) => {
          this._suggestionsStore.setSuggestionsData(suggestions);
        },
      }
    );
  }
}
