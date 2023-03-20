import {Component, Input, OnInit} from '@angular/core';
import {Location} from "../../../models/location/location.model";
import {LocationService} from "../../../services/location/location.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() public searchForm: FormGroup = new FormGroup<any>({});
  public locationOptions: Location[] = [];

  constructor(
    private _locationService: LocationService,
  ) { }

  public ngOnInit(): void {
    // Add controls
    this.searchForm.addControl(
      "locationSearch", new FormControl<string>("", [ Validators.required ]),
    );
    this.searchForm.addControl(
      "location", new FormControl<Location | null>(null, [ Validators.required, this.isLocation() ])
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

  private isLocation(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      return control.value instanceof Location ? null : { isLocation: true };
    }
  }

  private _getLocationSuggestions(search: string): void {
    this._locationService.getLocationSuggestions(search).subscribe(
      (locations: Location[]) => {
        this.locationOptions = locations;
    });
  }

  public onLocationChange(value: string): void {
    let location: AbstractControl = this.searchForm.get("location")!;
    location!.setValue(value ? new Location("", value) : null);
    location.value && location.value.getName ? this._getLocationSuggestions(location.value.getName) : this.locationOptions = [];
  }

  public onLocationOptionClick(location: Location): void {
    this.searchForm.patchValue({
      locationSearch: location.getName,
      location: location,
    })
    this.locationOptions = [];
  }

}
