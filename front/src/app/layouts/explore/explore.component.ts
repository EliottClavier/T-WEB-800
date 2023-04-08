import {Component, OnInit} from '@angular/core';
import {FormArray, FormGroup,} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationModel} from "../../models/location/location.model";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildStepFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {ItineraryMode} from "../../types/itinerary-mode.type";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {LeisureCategory} from "../../enums/leisure-category";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {getAccommodationItems} from "../../utils/suggestions-mock.utils";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SaveTripDialogComponent} from "../../containers/save-trip-dialog/save-trip-dialog.component";
import {TripModel} from "../../models/trip/trip.model";
import {TripService} from "../../services/trip/trip.service";
import {TripStoreService} from "../../store/trip-store/trip-store.service";
import {getPdf} from "../../utils/pdf/pdf.utils";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  private dialogRef?: MatDialogRef<SaveTripDialogComponent>;
  public searchForms: FormGroup = this._tripBuilderService.getTripFormsInstance()

  public activeSearchBar: SearchBarEvent = {
    index: 0,
    isEditing: false,
  };

  onActiveSearchBarChange($event: SearchBarEvent) {

    this.activeSearchBar = $event;
    let location: LocationModel = this.selectedSearchForm.get('location')?.value;
    let start: Date = this.selectedSearchForm.get('start')?.value;
    let end: Date = this.selectedSearchForm.get('end')?.value;

    let leisure: LeisureCategory = this._suggestionsStore.category;
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

  get selectedMarkers(): LeisureItemModel[] {
    return this.selectedSearchForm.get('leisures')?.value as LeisureItemModel[];
  }

  get nextLocation(): LocationModel | undefined {
    return this.searchFormsArrayControls[this.activeSearchBar.index + 1]?.get('location')?.value as LocationModel | undefined
  }

  constructor(
    private _route: ActivatedRoute, private _router: Router,
    private _suggestionsService: SuggestionsService,
    private _suggestionsStore: SuggestionsStoreService,
    public _tripBuilderService: TripBuilderService,
    private _tripService: TripService,
    private _tripStore: TripStoreService,
    private _dialog: MatDialog) {

  }

  public ngOnInit(): void {
    this._loadRouteParams();

    this._suggestionsStore.leisureItemToAdd$.subscribe((item: LeisureItemModel) => {
      if (item) {
        this.onAddingLeisureInStep(item);
      }
    });
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

  public getPreviewSuggestions(leisure: LeisureCategory = LeisureCategory.ACCOMMODATION, location: LocationModel = new LocationModel("", "Nantes", 42.555, 37.444), startInterval: Date = new Date(), endInterval: Date = new Date()): void {
    let start: string = getIsoStringFromDate(startInterval);
    let end: string = getIsoStringFromDate(endInterval);

    this._suggestionsService.getPreviewSuggestions(leisure, location, start, end)?.subscribe({
      next: (data) => {
        this._suggestionsStore.setSuggestionsData(data);
      },
      error: (error) => {
        // alert("error");
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
    this._suggestionsStore.category = value;
    this.getPreviewSuggestions(value);
  }

  public onAddingLeisureInStep(item: LeisureItemModel): void {
    let leisures: LeisureItemModel[] = this.selectedSearchForm.get('leisures')?.value;
    leisures.push(item);
    this.selectedSearchForm.get('leisures')?.setValue(leisures);
  }

  public getLeisureSuggestions() {

    let start: Date = this.selectedSearchForm.get('start')?.value
    let end: Date = this.selectedSearchForm.get('end')?.value
    let category: LeisureCategory = this._suggestionsStore.category;
    let location: LocationModel = this.selectedSearchForm.get('location')?.value
    this._suggestionsService.getSuggestions(category, location, getIsoStringFromDate(start), getIsoStringFromDate(end)).subscribe({
        next: (suggestions) => {
          this._suggestionsStore.setSuggestionsData(suggestions);
        },
      }
    );
  }

  public onSaveTrip(tripName?: string) {
    console.log(this._tripBuilderService.getTripFormsInstance().value[0]?.id);
    const searchFormsArray = this._tripBuilderService.getName();

    if (tripName != undefined) {

      console.log('tripName != undefined');
      let trip = this._tripBuilderService.saveTrip(tripName);
      this._tripService.sendTripAndUpdateStore(trip)

    } else if (searchFormsArray?.length != 0) {

      console.log('searchFormsArray?.length != 0');
      let trip = this._tripBuilderService.saveTrip(searchFormsArray);
      this._tripService.sendTripAndUpdateStore(trip);

    } else {
      this.dialogRef = this._dialog.open(SaveTripDialogComponent, {});
      this.dialogRef.afterClosed().subscribe(result => {
        this._tripBuilderService.saveTrip(result)
        this.onSaveTrip(result);

      });
    }
  }

  public async generateSummary() {

    let trip: TripModel = this._tripBuilderService.saveTrip('tripname');
    await getPdf(trip);
  }

  newTripForm() {
    this._tripBuilderService.newTrip();
   // console.log( this._tripBuilderService.searchFormsArray.value.length)
    this._router.navigate(['/']);
  }
}
