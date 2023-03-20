import {SearchInputComponent} from './search-input.component';
import {Location} from "../../../models/location/location.model";
import {LocationService} from "../../../services/location/location.service";
import {BehaviorSubject} from "rxjs";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {EventEmitter} from "@angular/core";
import {SearchBarEvent} from "../../../types/search-bar-event.type";

describe('SearchInputComponent', () => {
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
      MatIconModule,
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
    spyOn<LocationService, any>(_locationService, "getLocationSuggestions").and.callFake((search: string) => {
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
    component["_getLocationSuggestions"](search);

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
    expect(spectator.query('[search-input-form-field]')).toBeTruthy();
  });

  it('should have a mat-label', () => {
    let element: HTMLElement = spectator.query('[search-input-autocomplete-label]')!;
    expect(element).toBeTruthy();
    expect(element).toHaveText("Destination");
  });

  it('should have a search input', () => {
    let element: HTMLElement = spectator.query('[search-input]')!;
    expect(element).toBeTruthy();
    expect(element).toHaveAttribute("matInput");
    expect(element.getAttribute("type")).toEqual("text");
    expect(element.getAttribute("placeholder")).toEqual("Search a destination ...");
  });

  it('should have a mat-autocomplete', () => {
    expect(spectator.query('[search-input-autocomplete]')).toBeTruthy();
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
    const locationInput: HTMLElement = spectator.query('[search-input]')!;
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
    const locationInput: HTMLElement = spectator.query('[search-input]')!;
    spectator.typeInElement(locationSearch, locationInput!);
    spectator.detectChanges();

    let locationOption: Location = component.locationOptions[0];
    spectator.click(spectator.query("[search-input-autocomplete]")!);
    spectator.detectChanges();

    spectator.click(spectator.query(`mat-option[id="${locationOption.getId}"]`)!);
    spectator.detectChanges();

    expect(component.onLocationOptionClick).toHaveBeenCalled();
    expect(component.searchForm.get("location")!.value).toEqual(locationOption);
    expect(component.locationOptions).toEqual([]);
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
    expect(spectator.query('[search-input-error]')).toBeFalsy();

    const locationInput: HTMLElement = spectator.query('[search-input]')!;
    spectator.typeInElement("Nan", locationInput!);
    // Field locationSearch is marked as touched when location input is changed
    component.searchForm.get("locationSearch")!.markAsTouched();

    expect(spectator.query('[search-input-error]')).toBeFalsy();

    spectator.typeInElement("", locationInput!);

    expect(spectator.query('[search-input-error]')).toBeTruthy();
    expect(spectator.query('[search-input-error]')).toHaveText("Location is required");

    spectator.typeInElement("Nan", locationInput!);

    // mat-error not displayed again
    expect(spectator.query('[search-input-error]')).toBeFalsy();
  });

  describe('Readonly mode', () => {

    beforeEach(() => {
      component.id = 1;
      component.readonly = true;
      spectator.detectChanges();
    });

    it('should display pointer when readonly', () => {
      expect(spectator.query('[search-input]')!.getAttribute("readonly")).toEqual("true");
      expect(spectator.query('[search-input]')!.getAttribute("style")).toEqual("cursor: pointer;");
    });

    it('should not display pointer when not readonly', () => {
      component.readonly = false;
      spectator.detectChanges();
      expect(spectator.query('[search-input]')!.getAttribute("readonly")).toEqual(null);
      expect(spectator.query('[search-input]')!.getAttribute("style")).toEqual("cursor: auto;");
    });

    it('should have edit icon when readonly', () => {
      expect(spectator.query('[search-input-suffix]')).toHaveText("edit");
    });

    it('should have search icon when not readonly', () => {
      component.readonly = false;
      spectator.detectChanges();
      expect(spectator.query('[search-input-suffix]')).toHaveText("search");
    });

    describe('onSelectSearchBar method', () => {
      it('should emit event with its id on search bar selected', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.onSearchBarSelect, "emit");
        component.onSelectSearchBar();
        expect(component.onSearchBarSelect.emit).toHaveBeenCalledWith({
          index: component.id!,
          isEditing: false
        });
      });

      it('should emit nothing when its id is null on search bar selected', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.onSearchBarSelect, "emit");
        component.id = null;
        spectator.detectChanges();
        component.onSelectSearchBar();
        expect(component.onSearchBarSelect.emit).not.toHaveBeenCalled();
      });

      it('should emit nothing when not readonly on search bar selected', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.onSearchBarSelect, "emit");
        component.readonly = false
        spectator.detectChanges();
        component.onSelectSearchBar();
        expect(component.onSearchBarSelect.emit).not.toHaveBeenCalled();
      });

      it('should trigger method on click on searchbar when readonly and id not null', () => {
        spyOn<SearchInputComponent, any>(component, "onSelectSearchBar");
        spectator.click(spectator.query('[search-input-form-field]')!);
        expect(component.onSelectSearchBar).toHaveBeenCalled();
      });
    });

    describe('onEditSearchBar method', () => {

      it('should set readonly property to false', () => {
        component.onEditSearchBar();
        expect(component.readonly).toEqual(false);
      });

      it('should emit event with its id on click on edit icon', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.onSearchBarSelect, "emit");
        component.onEditSearchBar();
        expect(component.onSearchBarSelect.emit).toHaveBeenCalledWith({
          index: component.id!,
          isEditing: true
        });
      });

      it('should not emit its id on click on edit icon when id is null', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.onSearchBarSelect, "emit");
        component.id = null;
        spectator.detectChanges();
        component.onEditSearchBar();
        expect(component.onSearchBarSelect.emit).not.toHaveBeenCalled();
      });

      it('should become editable on edit icon click', () => {
        spyOn<SearchInputComponent, any>(component, "onEditSearchBar");
        component.readonly = true;
        spectator.detectChanges();
        spectator.click(spectator.query('[search-input-suffix]')!);
        expect(component.onEditSearchBar).toHaveBeenCalled();
      });
    });
  });


});
