import {MultipleSearchBarsComponent} from './multiple-search-bars.component';
import {SearchInputComponent} from "../../components/inputs/search-input/search-input.component";
import {DateRangeComponent} from "../../components/inputs/date-range/date-range.component";
import {SimpleButtonComponent} from "../../components/buttons/simple-button/simple-button.component";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {LocationModel} from "../../models/location/location.model";
import {SimpleIconButtonComponent} from "../../components/buttons/simple-icon-button/simple-icon-button.component";
import {Router} from "@angular/router";
import {EventEmitter, NO_ERRORS_SCHEMA} from "@angular/core";
import {AppModule} from "../../app.module";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildStepFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {MapComponent} from "../map/map.component";
import {MapView} from "../../enums/map-view-const";
import {LocationService} from "../../services/location/location.service";
import {BehaviorSubject} from "rxjs";

describe('MultipleSearchBarsComponent', () => {
  let component: MultipleSearchBarsComponent;
  let spectator: Spectator<MultipleSearchBarsComponent>;
  let _locationService: LocationService;

  const createComponent = createComponentFactory({
    component: MultipleSearchBarsComponent,
    declarations: [
      MultipleSearchBarsComponent,
      SearchInputComponent,
      DateRangeComponent,
      SimpleButtonComponent,
      SimpleIconButtonComponent
    ],
    imports: [
      AppModule
    ],
    schemas: [
      NO_ERRORS_SCHEMA
    ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have searchForms attribute with FormGroup initialized', () => {
    expect(component.searchForms).toBeDefined();
    expect(component.searchForms).toBeInstanceOf(FormGroup);
  });

  it('should have searchFormsArray FormArray inside searchForms FormGroup', () => {
    expect(component.searchFormsArray).toBeDefined();
    expect(component.searchFormsArray).toBeInstanceOf(FormArray);
    expect(component.searchFormsArray!.value).toBeInstanceOf(Array<FormGroup>);
  });

  it('should have searchFormsArray FormArray initialized with one FormGroup', () => {
    expect(component.searchFormsArrayControls!.length).toBe(1);
  });

  describe('Add and remove search bars', () => {

    it('should add a search bar to searchFormsArray', () => {
      component.addSearchBar();
      expect(component.searchFormsArrayControls!.length).toBe(2);
    });

    it('should not add a start date to the new search bar initialized if previous search bar has end date', () => {
      component.addSearchBar();
      spectator.detectChanges();
      let length: number = component.searchFormsArrayControls!.length;
      expect(component.searchFormsArrayControls![length - 1].get('start')!.value).toBeNull();
    });

    it('should add a start date to the new search bar initialized if previous search bar has end date', () => {
      component.lastSearchBar.get('end')!.setValue(new Date());
      component.addSearchBar();
      spectator.detectChanges();
      let length: number = component.searchFormsArrayControls!.length;
      expect(component.searchFormsArrayControls![length - 1].get('start')!.value).toBe(component.searchFormsArrayControls![length - 2].get('end')!.value);
    });

    it('should remove a search bar to searchFormsArray', () => {
      component.searchFormsArray.push(new FormGroup({}));
      expect(component.searchFormsArrayControls!.length).toBe(2);
      let index: number = Math.floor(Math.random() * component.searchFormsArrayControls.length);
      component.removeSearchBar(index);
      expect(component.searchFormsArrayControls!.length).toBe(1);
    });

    it('should not remove search bar in searchFormsArray if there is only one available', () => {
      expect(component.searchFormsArrayControls!.length).toBe(1);
      let index: number = Math.floor(Math.random() * component.searchFormsArrayControls.length);
      component.removeSearchBar(index);
      expect(component.searchFormsArrayControls!.length).toBe(1);
    });

    it('should have add search bar button', () => {
      expect(spectator.query("app-simple-icon-button[search-bar-add]")).toBeDefined();
      expect(spectator.query("app-simple-icon-button[search-bar-add] mat-icon[simple-icon]")).toHaveText("add");
    });

    it('should add search bar when search-bar-add button is clicked', () => {
      let length: number = component.searchFormsArrayControls!.length;

      spyOn(component, 'addSearchBar').and.callThrough();
      spectator.click(spectator.query("app-simple-icon-button[search-bar-add] [simple-icon-button]")!);
      spectator.detectChanges();
      expect(component.addSearchBar).toHaveBeenCalled();
      expect(spectator.queryAll("div[search-bars]").length).toBe(length + 1);
    });

    it('should not have remove search bar button when there is only one search bar', () => {
      expect(component.searchFormsArrayControls!.length).toBe(1);
      expect(spectator.query("app-simple-button[search-bar-remove]")).toBeFalsy();
    });

    it('should have disabled remove search bar when there is only one search bar', () => {
      expect(component.searchFormsArrayControls!.length).toBe(1);
      expect(spectator.query("app-simple-icon-button[search-bar-remove] [simple-icon-button]")!).toBeTruthy();
      expect(spectator.query("app-simple-icon-button[search-bar-remove] [simple-icon-button]")!).toBeDisabled();
    });

    it('should have remove search bar button for each search bar when there are multiple search bar', () => {
      component.addSearchBar();
      spectator.detectChanges();

      expect(spectator.queryAll("app-simple-icon-button[search-bar-remove]").length).toBe(component.searchFormsArrayControls!.length);
      expect(spectator.queryAll("app-simple-icon-button[search-bar-remove]").length).toBeGreaterThan(1);
      spectator.queryAll("app-simple-icon-button[search-bar-remove]").map((button: Element) => {
        expect(button).toHaveText("delete");
      });
    });

    it('should remove search bar when a search-bar-remove button is clicked', () => {
      component.addSearchBar();
      spectator.detectChanges();
      expect(component.searchFormsArrayControls!.length).toBeGreaterThan(1);
      expect(spectator.queryAll("app-simple-icon-button[search-bar-remove]").length).toBeGreaterThan(1);

      spyOn(component, 'removeSearchBar').and.callThrough();
      spectator.click(spectator.queryLast("app-simple-icon-button[search-bar-remove] [simple-icon-button]")!);
      spectator.detectChanges();
      expect(component.removeSearchBar).toHaveBeenCalled();
      expect(component.searchFormsArrayControls!.length).toBe(1);

      expect(spectator.query("app-simple-icon-button[search-bar-remove] [simple-icon-button]")).toBeTruthy();
      expect(spectator.query("app-simple-icon-button[search-bar-remove] [simple-icon-button]")).toBeDisabled();
    });

  });

  describe('Search bars display', () => {

    it('should have divs rendered in a ngFor looping over searchFormsArray', () => {
      let length: number = component.searchFormsArrayControls.length;
      expect(spectator.queryAll("div[search-bars]").length).toBe(length);
      component.addSearchBar();
      spectator.detectChanges();
      expect(spectator.queryAll("div[search-bars]").length).toBe(length + 1);

      component.removeSearchBar(Math.floor(Math.random() * component.searchFormsArrayControls.length));
      spectator.detectChanges();
      expect(spectator.queryAll("div[search-bars]").length).toBe(length);
    });

  });

  describe('Validate research and redirection', () => {
    let locationName: string = "Paris";

    beforeEach(() => {
      component.activeSearchBar = {
        index: 0,
        isEditing: true
      };
      _locationService = spectator.inject(LocationService);
      // spyOn LocationService.getLocations() to mock API Call
      spyOn<LocationService, any>(_locationService, "getLocationSuggestions").and.callFake((search: string) => {
        return new BehaviorSubject<LocationModel[]>([
          new LocationModel("1", locationName)
        ])
      });
      spectator.detectChanges();
    });

    it('should update locationSearch and location', () => {
      let location: LocationModel = new LocationModel("1", locationName);
      component.onLocationOptionChange(location);
      spectator.detectChanges();
      expect(component.searchFormsArrayControls[0].get("locationSearch")!.value).toEqual(locationName);
      expect(component.searchFormsArrayControls[0].get("location")!.value).toEqual(location);
    });

  });

  describe('Active Search bar', () => {

    describe('Active search bar attribute', () => {

      beforeEach(() => {
        component.activeSearchBar = {
          index: 0,
          isEditing: false
        };
        spectator.detectChanges();
      });

      it('should have activeSearchBar set to 0 and false by default', () => {
        expect(component.activeSearchBar).toEqual({
          index: 0,
          isEditing: false
        });
      });

      it('should have activeSearchBar set to 0 when there are multiple search bar, the first one is removed and index was 0', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.activeSearchBarChange, 'emit');
        component.removeSearchBar(0);
        spectator.detectChanges();
        let searchBarEvent: SearchBarEvent = {
          index: 0,
          isEditing: false
        }
        expect(component.activeSearchBar).toEqual(searchBarEvent);
        expect(component.activeSearchBarChange.emit).toHaveBeenCalledWith(searchBarEvent);
      });

      it('should have activeSearchBar set to current index minus 1 when there are multiple search bar, the first one is removed and index was greater than 0', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.activeSearchBarChange, 'emit');
        component.activeSearchBar = {
          index: 1,
          isEditing: false
        };
        component.removeSearchBar(0);
        spectator.detectChanges();
        let searchBarEvent: SearchBarEvent = {
          index: component.searchFormsArrayControls.length - 1,
          isEditing: false
        }
        expect(component.activeSearchBar).toEqual(searchBarEvent);
        expect(component.activeSearchBarChange.emit).toHaveBeenCalledWith(searchBarEvent);
      });

      it('should have activeSearchBar set to last search bar index when new search bar is created', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.activeSearchBarChange, 'emit');
        component.addSearchBar();
        spectator.detectChanges();
        let searchBarEvent: SearchBarEvent = {
          index: component.searchFormsArrayControls.length - 1,
          isEditing: true
        }
        expect(component.activeSearchBar).toEqual(searchBarEvent);
        expect(component.activeSearchBarChange.emit).toHaveBeenCalledWith(searchBarEvent);
      });

      it('should have activeSearchBar set to selected search bar', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.activeSearchBarChange, 'emit');
        let searchBarEvent: SearchBarEvent = {
          index: 1,
          isEditing: false
        }
        component.onSearchBarSelect(searchBarEvent);
        expect(component.activeSearchBar).toEqual(searchBarEvent);
        expect(component.activeSearchBarChange.emit).toHaveBeenCalledWith(searchBarEvent);
      });
    });

    describe('Active search bar elements', () => {
      beforeEach(() => {
        component.activeSearchBar = {
          index: 1,
          isEditing: false
        };
        component.addSearchBar();
        component.addSearchBar();
        spectator.detectChanges();
      });

      it('should have only one active search bar input at most', () => {
        expect(spectator.queryAll("[search-bar-input] [search-input]:not([readonly])").length).toBe(1);
        expect(spectator.queryAll("[search-bar-input] [search-input][readonly]").length).toBe(component.searchFormsArrayControls.length - 1);
      });
    });

    describe('Itinerary display', function () {
      let searchForm: FormGroup;

      beforeEach(() => {
        searchForm = buildStepFormGroupControlsDetails();
        component.searchFormsArrayControls.push(
          searchForm
        );
        spectator.detectChanges();
      });

      it('should remove margin bottom on search bars', () => {
        expect(spectator.queryAll("[search-bar-input]").every((input) =>
          input.getAttribute("ng-reflect-no-margin-bottom") === "true"
        )).toBeTruthy();
      });

      it('should have as much itinerary arrows as search bars', () => {
        expect(spectator.queryAll("app-simple-icon-button[search-bar-itinerary-arrow]").length).toBe(component.searchFormsArrayControls.length);
      });

      it('should have as much itinerary travel mode bubbles as search bars', () => {
        expect(spectator.queryAll("app-simple-icon-button[search-bar-travel-mode]").length).toBe(component.searchFormsArrayControls.length);
      });

      it('should return the correct travel mode icon depending on additional conditions', () => {
        let searchForm: FormGroup = buildStepFormGroupControlsDetails();
        searchForm.get("travelMode")!.setValue(google.maps.TravelMode.DRIVING);
        component.searchFormsArrayControls.push(
          searchForm,
          buildStepFormGroupControlsDetails(),
        );
        spectator.detectChanges();
        // 0 is the default search bar which has no travel mode
        expect(component.accessTravelModeIcon(0)).toBe("panorama_fish_eye");
        // This one matches with searchForm variable
        expect(component.accessTravelModeIcon(component.searchFormsArrayControls.length - 2)).toBe("directions_car");
        // This one matches with the last search bar of the list
        expect(component.accessTravelModeIcon(component.searchFormsArrayControls.length - 1)).toBe("outlined_flag");
      });

      it('should return true if the location is the search bar after the selected search bar is valid', () => {
        searchForm.get("location")!.setValue(new LocationModel("2", "Paris", 48.856614, 2.3522219));
        spectator.detectChanges();
        expect(component.isNextLocationValid(0)).toBeTruthy();
      });

      it('should return false if the location is the search bar after the selected search bar is not valid', () => {
        searchForm.get("location")!.setValue(new LocationModel("2", "Paris", 200, 200));
        spectator.detectChanges();
        expect(component.isNextLocationValid(0)).toBeFalsy();
      });
    });

    describe('View switch', () => {

      it('should emit the view change to location event when adding search bar', () => {
        spyOn<EventEmitter<MapView>, any>(component.viewChange, 'emit');
        component.addSearchBar();
        expect(component.viewChange.emit).toHaveBeenCalledWith(MapView.LOCATION);
      });

      it('should emit the view change to location event when removing search bar when conditions match', () => {
        spyOn<EventEmitter<MapView>, any>(component.viewChange, 'emit');
        component.searchFormsArrayControls.push(
          buildStepFormGroupControlsDetails(),
          buildStepFormGroupControlsDetails(),
        );
        component.activeSearchBar = {
          index: 0,
          isEditing: false
        }
        spectator.detectChanges();
        component.removeSearchBar(0);
        expect(component.viewChange.emit).toHaveBeenCalledWith(MapView.LOCATION);
      });

      it('should not emit the view change to location event when removing search bar when index isn\'t in range', () => {
        spyOn<EventEmitter<MapView>, any>(component.viewChange, 'emit');
        component.searchFormsArrayControls.push(
          buildStepFormGroupControlsDetails(),
          buildStepFormGroupControlsDetails(),
        );
        component.activeSearchBar = {
          index: 0,
          isEditing: false
        }
        spectator.detectChanges();
        component.removeSearchBar(component.searchFormsArrayControls.length - 1);
        expect(component.viewChange.emit).not.toHaveBeenCalled();
      });

      it('should emit the view change to location event when selecting a search bar', () => {
        spyOn<EventEmitter<MapView>, any>(component.viewChange, 'emit');
        component.searchFormsArrayControls.push(
          buildStepFormGroupControlsDetails(),
          buildStepFormGroupControlsDetails(),
        );
        component.onSearchBarSelect({
          index: 0,
          isEditing: false
        })
        expect(component.viewChange.emit).toHaveBeenCalledWith(MapView.LOCATION);
      });

      it('should emit the view change to location event when selecting a search bar', () => {
        spyOn<EventEmitter<MapView>, any>(component.viewChange, 'emit');
        component.searchFormsArrayControls.push(
          buildStepFormGroupControlsDetails(),
          buildStepFormGroupControlsDetails(),
        );
        component.onItinerarySelect({
          index: 0,
          isEditing: false
        })
        expect(component.viewChange.emit).toHaveBeenCalledWith(MapView.ITINERARY);
      });
    });
  });
});
