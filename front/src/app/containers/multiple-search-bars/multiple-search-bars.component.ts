import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildStepFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {MapView} from "../../enums/map-view-const";
import {LocationModel} from "../../models/location/location.model";
import {getTravelModeIcon} from "../../utils/travel-mode/travel-mode.utils";
import {TripBuilderService} from "../../services/trip/trip-builder.service";

@Component({
  selector: 'app-multiple-search-bars',
  templateUrl: './multiple-search-bars.component.html',
  styleUrls: ['./multiple-search-bars.component.scss']
})
export class MultipleSearchBarsComponent implements OnInit {

  @Input() public hasLeisureNbr: number = 0;
  @Input() public searchForms: FormGroup = this.tripBuilderService.getTripFormsInstance();
  // public searchForms: FormGroup = this.tripBuilderService.getTripFormsInstance();

  public leisuresLength: number[] = [];

  @Input() public activeSearchBar: SearchBarEvent = {
    index: 0,
    isEditing: false,
  };
  @Output() public activeSearchBarChange: EventEmitter<SearchBarEvent> = new EventEmitter<SearchBarEvent>();
  @Output() public viewChange: EventEmitter<MapView> = new EventEmitter<MapView>();

  constructor(public tripBuilderService: TripBuilderService) {
  }


  ngOnInit(): void {
    this.hasLeisure();
    this.searchForms = this.tripBuilderService.getTripFormsInstance();

  }



  get lastSearchBar(): FormGroup {
    return this.tripBuilderService.searchFormsArrayControls[this.tripBuilderService.searchFormsArrayControls.length - 1];
  }

  public isNextLocationValid(index: number): boolean {
    let location = this.tripBuilderService.searchFormsArrayControls[index + 1]?.get("location")?.value as LocationModel;
    return Boolean(location) && location!.hasValidCoordinates();
  }

  public hasLeisure(): number[] {
    this.leisuresLength = [];
    this.tripBuilderService.searchFormsArrayControls.forEach((step, index) => {

      this.leisuresLength.push(step?.get("leisures")?.value?.length || 0);
    });

    return this.leisuresLength;
  }

  public addSearchBar(): void {
    let day = 60 * 60 * 24 * 1000;
    let newFormGroup: FormGroup = buildStepFormGroupControlsDetails();
    if (this.lastSearchBar.get("end")?.value) {
      newFormGroup.setControl(
        "start", new FormControl<Date | null>(this.lastSearchBar.get("end")?.value, [Validators.required]),

    ),newFormGroup.setControl(
        "end", new FormControl<Date | null>(new Date((this.lastSearchBar.get("end")?.value).getTime() + day), [Validators.required]),

      )
      ;
    }
    this.tripBuilderService.searchFormsArray.push(newFormGroup);

    this.activeSearchBar = {
      index: this.tripBuilderService.searchFormsArrayControls.length - 1,
      isEditing: true,
    };
    this.activeSearchBarChange.emit(this.activeSearchBar);
    this.viewChange.emit(MapView.LOCATION);
  }

  public removeSearchBar(index: number): void {
    // If the search bar deleted is the active one or one of its neighbors, we emit a view change
    // in case where the user is on the itinerary view of which concerns of the deleted search bar
    if ([index - 1, index, index + 1].includes(this.activeSearchBar.index)) {
      this.viewChange.emit(MapView.LOCATION);
    }
    this.activeSearchBar = {
      index: index > 0 ? index - 1 : index,
      isEditing: false,
    };
    this.tripBuilderService.searchFormsArrayControls.length > 1 && this.tripBuilderService.searchFormsArray.removeAt(index);
    this.activeSearchBarChange.emit(this.activeSearchBar);
  }

  public onSearchBarSelect(event: SearchBarEvent): void {
    this.activeSearchBar = event;
    this.activeSearchBarChange.emit(this.activeSearchBar);
    this.viewChange.emit(MapView.LOCATION);
  }

  public onItinerarySelect(event: SearchBarEvent): void {
    this.activeSearchBar = event;
    this.activeSearchBarChange.emit(this.activeSearchBar);
    this.viewChange.emit(MapView.ITINERARY);
  }

  public onLocationOptionChange(event: LocationModel): void {
    this.tripBuilderService.searchFormsArrayControls[this.activeSearchBar.index].patchValue({
      locationSearch: event.name,
      location: new LocationModel(event.id, event.name, event.lat, event.lng)
    });
  }

  public accessTravelModeIcon(searchBarIndex: number): string {
    if (this.tripBuilderService.searchFormsArrayControls.length === searchBarIndex + 1) {
      return 'outlined_flag';
    }
    return getTravelModeIcon(this.tripBuilderService.searchFormsArrayControls[searchBarIndex].get("travelMode")?.value);
  }

}
