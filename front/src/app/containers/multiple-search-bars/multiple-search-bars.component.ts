import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildSearchBarFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {MapView} from "../../enums/map-view-const";
import {Location} from "../../models/location/location.model";
import {getTravelModeIcon} from "../../utils/travel-mode/travel-mode.utils";

@Component({
  selector: 'app-multiple-search-bars',
  templateUrl: './multiple-search-bars.component.html',
  styleUrls: ['./multiple-search-bars.component.scss']
})
export class MultipleSearchBarsComponent {

  @Input() public searchForms: FormGroup = new FormGroup({
    searchFormsArray: new FormArray<FormGroup>([
      buildSearchBarFormGroupControlsDetails(),
    ]),
  });

  @Input() public activeSearchBar: SearchBarEvent = {
    index: 0,
    isEditing: false,
  };
  @Output() public activeSearchBarChange: EventEmitter<SearchBarEvent> = new EventEmitter<SearchBarEvent>();
  @Output() public viewChange: EventEmitter<MapView> = new EventEmitter<MapView>();

  constructor(
    private _router: Router,
  ) {
  }

  get searchFormsArray(): FormArray {
    return this.searchForms.get('searchFormsArray') as FormArray;
  }

  get searchFormsArrayControls(): FormGroup[] {
    return this.searchFormsArray.controls as FormGroup[];
  }

  get lastSearchBar(): FormGroup {
    return this.searchFormsArrayControls[this.searchFormsArrayControls.length - 1];
  }

  public isNextLocationValid(index: number): boolean {
    let location = this.searchFormsArrayControls[index + 1]?.get("location")?.value as Location | undefined;
    return Boolean(location) && location!.hasValidCoordinates();
  }

  public addSearchBar(): void {
    let newFormGroup: FormGroup = buildSearchBarFormGroupControlsDetails();
    if (this.lastSearchBar.get("end")?.value) {
      newFormGroup.setControl(
        "start", new FormControl<Date | null>(this.lastSearchBar.get("end")?.value, [ Validators.required ])
      );
    }
    this.searchFormsArray.push(newFormGroup);

    this.activeSearchBar = {
      index: this.searchFormsArrayControls.length - 1,
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
    this.searchFormsArrayControls.length > 1 && this.searchFormsArray.removeAt(index);
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

  public accessTravelModeIcon(searchBarIndex: number): string {
    if (this.searchFormsArrayControls.length === searchBarIndex + 1) {
      return 'outlined_flag';
    }
    return getTravelModeIcon(this.searchFormsArrayControls[searchBarIndex].get("travelMode")?.value);
  }

}
