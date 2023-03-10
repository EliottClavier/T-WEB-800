import {SearchInputComponent} from './search-input.component';
import {Location} from "../../../models/location/location.model";
import {LocationService} from "../../../services/location/location.service";
import {BehaviorSubject} from "rxjs";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

describe('LocationComponent', () => {
  let component: SearchInputComponent;
  let spectator: Spectator<SearchInputComponent>;
  let _locationService: LocationService;

  const createComponent = createComponentFactory({
    component: SearchInputComponent,
    imports: [
      HttpClientModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      FormsModule
    ],
    providers: [ LocationService ],
  });

  /* Fixtures */
  let testLocationOptions: Location[] = [
    new Location("1", "Paris"),
    new Location("2", "Nantes"),
    new Location("3", "Nanterre")
  ];

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    _locationService = spectator.inject(LocationService);

    component.locationOptions = [];

    // spyOn LocationService.getLocations() to mock API Call
    spyOn<LocationService, any>(_locationService, "getLocationsBySearch").and.callFake((search: string) => {
      return new BehaviorSubject<Location[]>(testLocationOptions.filter(
        (location: Location) => location.getName.toLowerCase().startsWith(search.toLowerCase()))
      );
    });

    spectator.detectChanges()
  });

  /* Component tests */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have base searchForm attribute gotten from parent component', () => {
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm).toBeInstanceOf(FormGroup);
  });

  it('should have base locationSearch FormControl inside searchForm FormGroup with base value', () => {
    expect(component.searchForm.get("locationSearch")).toBeDefined();
    expect(component.searchForm.get("locationSearch")).toBeInstanceOf(FormControl<string>);
    expect(component.searchForm.get("locationSearch")!.value).toEqual("");
  });

  it('should have base location FormControl inside searchForm FormGroup with base value', () => {
    expect(component.searchForm.get("location")).toBeDefined();
    expect(component.searchForm.get("location")).toBeInstanceOf(FormControl<Location | null>);
    expect(component.searchForm.get("location")!.value).toEqual(null);
  });

  it('should have base locationOptions attribute defined with base value', () => {
    expect(component.locationOptions).toBeDefined();
    expect(component.locationOptions).toEqual([]);
  });

  it('should have LocationService injected', () => {
    expect(component["_locationService"]).toBeDefined();
    expect(component["_locationService"]).toBeTruthy();
    expect(component["_locationService"]).toEqual(_locationService);
  });

  it('should retrieve location options', () => {
    /*
    * spyOn LocationService.getLocations() is active
    */

    let search: string = "Nan";
    component["_getLocationsBySearch"](search);

    expect(component.locationOptions).toEqual(
      testLocationOptions.filter((location: Location) => location.getName.toLowerCase().includes(search.toLowerCase())
    ));
  });

  it('should get location options when inputting location', () => {
    /*
    * spyOn LocationService.getLocations() is active
    */

    const locationSearch: string = "Nan";
    component.onLocationChange(locationSearch);

    expect(component.searchForm.get("location")!.value.getName).toEqual(locationSearch);
    expect(component.locationOptions).toEqual(
      testLocationOptions.filter((location: Location) =>
        location.getName.toLowerCase().startsWith(locationSearch.toLowerCase())
    ));
  });

  it('should reset location options when removing location search', () => {
    const locationSearch: string = "";
    component.onLocationChange(locationSearch);

    expect(component.searchForm.get("location")!.value).toEqual(null);
    expect(component.locationOptions).toEqual([]);
  });

  it('should complete location search when clicking on location option', () => {
    /*
    * spyOn LocationService.getLocations() is active
    */

    const locationSearch: string = "Nan";
    component.onLocationChange(locationSearch);

    expect(component.searchForm.get("location")!.value.getName).toEqual(locationSearch);

    let locationOption: Location = component.locationOptions[0];
    component.onLocationOptionClick(locationOption);

    expect(component.searchForm.get("locationSearch")!.value).toEqual(locationOption.getName);
    expect(component.searchForm.get("location")!.value.getName).toEqual(locationOption.getName);
    expect(component.locationOptions).toEqual([]);
  });

  it('should have a mat-form-field', () => {
    expect(spectator.query('[location-form-field]')).toBeTruthy();
  });

  it('should have a mat-label', () => {
    let element: HTMLElement = spectator.query('[location-autocomplete-label]')!;
    expect(element).toBeTruthy();
    expect(element).toHaveText("Location");
  });

  it('should have a search input', () => {
    let element: HTMLElement = spectator.query('[location-search]')!;
    expect(element).toBeTruthy();
    expect(element).toHaveAttribute("matInput");
    expect(element.getAttribute("type")).toEqual("text");
    expect(element.getAttribute("placeholder")).toEqual("Choose a location ...");
  });

  it('should have a mat-autocomplete', () => {
    expect(spectator.query('[location-autocomplete]')).toBeTruthy();
  });

  it('should not have any mat-option', () => {
    expect(spectator.query('mat-option')).toBeFalsy();
  });

  it('should trigger event on location input change', () => {
    /*
    * spyOn LocationService.getLocations() is active
    */

    spyOn<SearchInputComponent, any>(component, "onLocationChange").and.callThrough();

    const locationSearch: string = "Nan";
    const locationInput: HTMLElement = spectator.query('[location-search]')!;
    spectator.typeInElement(locationSearch, locationInput!);

    expect(component.onLocationChange).toHaveBeenCalled();
    expect(component.searchForm.get("locationSearch")!.value).toEqual(locationSearch);
    expect(component.searchForm.get("location")!.value.getName).toEqual(locationSearch);
    expect(component.locationOptions).toEqual(
      testLocationOptions.filter((location: Location) =>
        location.getName.toLowerCase().startsWith(locationSearch.toLowerCase()
    )));
    expect(spectator.queryAll('mat-option').length).toEqual(component.locationOptions.length);
  });

  it('should trigger event on location option click', () => {
    spyOn<SearchInputComponent, any>(component, "onLocationOptionClick").and.callThrough();

    const locationSearch: string = "Nan";
    const locationInput: HTMLElement = spectator.query('[location-search]')!;
    spectator.typeInElement(locationSearch, locationInput!);
    spectator.detectChanges();

    let locationOption: Location = component.locationOptions[0];
    spectator.click(spectator.query("[location-autocomplete]")!);
    spectator.detectChanges();

    spectator.click(spectator.query(`mat-option[id="${locationOption.getId}"]`)!);
    spectator.detectChanges();

    expect(component.onLocationOptionClick).toHaveBeenCalled();
    expect(component.searchForm.get("location")!.value).toEqual(locationOption);
    expect(component.locationOptions).toEqual([]);
  });

  it('should define a validator called isLocation', () => {
    expect(component["isLocation"]).toBeDefined();
  });

  it('should have a validator to verify that location has Location type', () => {
    component.searchForm.patchValue({
      locationSearch: "Nan",
      location: new Location("1", "Nantes")
    });
    expect(component["isLocation"]()(component.searchForm.get("location")!)).toEqual(null);
  });

  it('should require location FormControl with value of type Location', () => {
    component.searchForm.patchValue({
      locationSearch: "Nan",
      location: ""
    });

    expect(component.searchForm.valid).toEqual(false);

    component.searchForm.patchValue({
      locationSearch: "Nan",
      location: "Nan"
    });

    // Should be equal to false because location is not a Location object
    expect(component.searchForm.valid).toEqual(false);

    component.searchForm.patchValue({
      locationSearch: "Nan",
      location: new Location("1", "Nantes")
    });

    // Should be equal to false because location is not a Location object
    expect(component.searchForm.valid).toEqual(true);
  });

  it('should display an error message when form is not valid', () => {
    expect(spectator.query('[location-error]')).toBeFalsy();

    const locationInput: HTMLElement = spectator.query('[location-search]')!;
    spectator.typeInElement("Nan", locationInput!);
    // Field locationSearch is marked as touched when location input is changed
    component.searchForm.get("locationSearch")!.markAsTouched();

    expect(spectator.query('[location-error]')).toBeFalsy();

    spectator.typeInElement("", locationInput!);

    expect(spectator.query('[location-error]')).toBeTruthy();
    expect(spectator.query('[location-error]')).toHaveText("Location is required");

    spectator.typeInElement("Nan", locationInput!);

    // mat-error not displayed again
    expect(spectator.query('[location-error]')).toBeFalsy();
  });

});
