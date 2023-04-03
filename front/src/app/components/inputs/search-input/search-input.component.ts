import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocationModel} from "../../../models/location/location.model";
import {LocationService} from "../../../services/location/location.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {SearchBarEvent} from "../../../types/search-bar-event.type";
import {isLocation} from "../../../utils/search-bar-form-group/search-bar-form-group.utils";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() public id: number | null = null;
  @Input() public searchForm: FormGroup = new FormGroup<any>({});
  @Input() public readonly: boolean = false;

  @Output() public onSearchBarSelect: EventEmitter<SearchBarEvent> = new EventEmitter<SearchBarEvent>();

  @Output() public onLocationOptionChange: EventEmitter<any> = new EventEmitter<any>();
  public locationOptions: LocationModel[] = [];

  @Input() public noMarginBottom: boolean = false;

  @Input() public hasLeisureNbr: number = 0;

  constructor(
    private _locationService: LocationService,
  ) { }

  public ngOnInit(): void {
    // Add controls
    this.searchForm.addControl(
      "locationSearch", new FormControl<string>("", [ Validators.required ]),
    );
    this.searchForm.addControl(
      "location", new FormControl<LocationModel | null>(null, [ Validators.required, isLocation() ])
    );

    // Change detection
    this.searchForm.get("locationSearch")!.valueChanges.subscribe((value: string) => {
      this.location.markAsTouched();
      this.onLocationChange(value);
    });
  }

  get locationSearch(): FormControl {
    return this.searchForm.get("locationSearch")! as FormControl;
  }

  get location(): FormControl {
    return this.searchForm.get("location")! as FormControl;
  }

  private _getLocationSuggestions(search: string): void {
    this._locationService.getLocationSuggestions(search).subscribe(
      (locations: LocationModel[]) => {
        this.locationOptions = locations;
      });
  }

  public onLocationChange(value: string): void {
    let location: AbstractControl = this.searchForm.get("location")!;
    location!.setValue(value ? new LocationModel("", value) : null);
    location.value && location.value.name ? this._getLocationSuggestions(location.value.name) : this.locationOptions = [];
  }

  public onLocationOptionClick(location: LocationModel): void {
    this.onLocationOptionChange.emit(location);
    this.locationOptions = [];
  }

  public onSelectSearchBar(): void {
    this.id !== null && this.readonly && (this.onSearchBarSelect.emit({
      index: this.id,
      isEditing: false,
    }));
  }

  public onEditSearchBar(): void {
    this.id !== null && this.readonly && (this.onSearchBarSelect.emit({
      index: this.id,
      isEditing: true,
    }));
    this.readonly = false;
  }

}
