import {LocationComponent} from './location.component';
import {Location} from "../../../models/location/location.model";
import {LocationService} from "../../../services/location.service";
import {AppModule} from "../../../app.module";
import {BehaviorSubject} from "rxjs";
import {byValue, createComponentFactory, Spectator} from "@ngneat/spectator";
import {MatSelectModule} from "@angular/material/select";

describe('LocationComponent', () => {
  let component: LocationComponent;
  let spectator: Spectator<LocationComponent>;
  let _locationService: LocationService;

  const createComponent = createComponentFactory({
    component: LocationComponent,
    imports: [ AppModule, MatSelectModule ],
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

    component.location = "";
    component.locationOptions = [];

    // spyOn LocationService.getLocations() to mock API Call
    spyOn<LocationService, any>(_locationService, "getLocations").and.callFake((search: string) => {
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

  it('should have base attributes initialized', () => {
    expect(component.location).toBeDefined();
    expect(component.locationOptions).toBeDefined();

    expect(component.location).toEqual("");
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
    component["_getLocations"](search);

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

    expect(component.location).toEqual(locationSearch);
    expect(component.locationOptions).toEqual(
      testLocationOptions.filter((location: Location) => location.getName.toLowerCase().startsWith(component.location.toLowerCase())
    ));
  });

  it('should reset location options when removing location search', () => {
    const locationSearch: string = "";
    component.onLocationChange(locationSearch);

    expect(component.location).toEqual(locationSearch);
    expect(component.locationOptions).toEqual([]);
  });

  it('should complete location search when clicking on location option', () => {
    /*
    * spyOn LocationService.getLocations() is active
    */

    const locationSearch: string = "Nan";
    component.onLocationChange(locationSearch);
    expect(component.location).toEqual(locationSearch);

    let locationOption: Location = component.locationOptions[0];
    component.onLocationOptionClick(locationOption);

    expect(component.location).toEqual(locationOption.getName);
    expect(component.locationOptions).toEqual([]);
  });

  /* Behavior tests */
  it('should have elements', () => {
    expect(spectator.query('[location-form-field]')).toBeTruthy();
    expect(spectator.query('[location-autocomplete-label]')).toHaveText("Location");
    expect(spectator.query('[location-search]')).toBeTruthy();
    expect(spectator.query('[location-autocomplete]')).toBeTruthy();
    // Should not appear until location search is not empty
    expect(spectator.query('mat-option')).toBeFalsy();
  });

  it('should trigger event on location input change', () => {
    /*
    * spyOn LocationService.getLocations() is active
    */

    spyOn<LocationComponent, any>(component, "onLocationChange").and.callThrough();

    const locationSearch: string = "Nan";
    const locationInput = spectator.query('[location-search]');
    spectator.typeInElement(locationSearch, locationInput!);

    expect(component.onLocationChange).toHaveBeenCalled();
    expect(component.location).toEqual(locationSearch);
    expect(component.locationOptions).toEqual(
      testLocationOptions.filter((location: Location) => location.getName.toLowerCase().startsWith(component.location.toLowerCase())
    ));
    expect(spectator.queryAll('mat-option').length).toEqual(component.locationOptions.length);
  });

  it('should trigger event on location option click', () => {
    spyOn<LocationComponent, any>(component, "onLocationOptionClick").and.callThrough();

    const locationSearch: string = "Nan";
    const locationInput = spectator.query('[location-search]');
    spectator.typeInElement(locationSearch, locationInput!);
    spectator.detectChanges();

    let locationOption: Location = component.locationOptions[0];

    spectator.click(spectator.query("[location-autocomplete]")!);
    spectator.detectChanges();

    spectator.click(spectator.query(`mat-option[id="${locationOption.getId}"]`)!);
    spectator.detectChanges();

    expect(component.onLocationOptionClick).toHaveBeenCalled();
    expect(component.location).toEqual(locationOption.getName);
    expect(component.locationOptions).toEqual([]);
  });

});
