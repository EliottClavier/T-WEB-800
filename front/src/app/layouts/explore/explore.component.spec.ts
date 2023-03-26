import {ExploreComponent} from "./explore.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {By} from "@angular/platform-browser";
import {MultipleSearchBarsComponent} from "../../containers/multiple-search-bars/multiple-search-bars.component";
import {AppModule} from "../../app.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MapComponent} from "../../containers/map/map.component";
import {FormArray, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from "../../models/location/location.model";
import {LocationService} from "../../services/location/location.service";
import {BehaviorSubject} from "rxjs";
import {MapFiltersComponent} from "../../containers/map-filters/map-filters.component";
import {buildSearchBarFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {
  MapTravelModeSelectionComponent
} from "../../containers/map-travel-mode-selection/map-travel-mode-selection.component";
import TravelMode = google.maps.TravelMode;

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let spectator: Spectator<ExploreComponent>;
  let _route: ActivatedRoute;
  let _locationService: LocationService;

  const createComponent = createComponentFactory({
    component: ExploreComponent,
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {
              location: "Nan"
            },
            queryParams: {
              start: "2023-01-01",
              end: "2023-01-02",
            }
          },
        }
      }
    ],
    declarations: [
      ExploreComponent,
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
    _locationService = spectator.inject(LocationService);
    _route = spectator.inject(ActivatedRoute);

    _route.snapshot.params = {
      location: "Nan"
    }

    _route.snapshot.queryParams = {
      start: "2023-01-01",
      end: "2023-01-02",
      lat: "42.555",
      lng: "37.444",
    }

    spyOn<LocationService, any>(_locationService, "getLocationSuggestions").and.callFake((search: string) => {
      return new BehaviorSubject<Location[]>([]);
    });

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Layout definition', () => {
    it('should have a multiple search bar component', () => {
      let searchBars = spectator.debugElement.query(By.css("app-multiple-search-bars[search-bar]"))!;
      let searchBarsComponent: MultipleSearchBarsComponent = searchBars.componentInstance as MultipleSearchBarsComponent;
      expect(searchBarsComponent).toBeDefined();
    });

    it('should have a map component', () => {
      let map = spectator.debugElement.query(By.css("app-map"))!;
      let mapComponent: MapComponent = map.componentInstance as MapComponent;
      expect(mapComponent).toBeDefined();
    });

    it('should have a map-filters component', () => {
      let mapFilters = spectator.debugElement.query(By.css("app-map-filters"))!;
      let mapFiltersComponent: MapFiltersComponent = mapFilters.componentInstance as MapFiltersComponent;
      expect(mapFiltersComponent).toBeDefined();
    });

    it('should have a map-travel-mode-selection component', () => {
      component.itineraryView = true;
      spectator.detectChanges();
      let mapTravelModeSelection = spectator.debugElement.query(By.css("app-map-travel-mode-selection"))!;
      let mapTravelModeSelectionComponent: MapTravelModeSelectionComponent = mapTravelModeSelection.componentInstance as MapTravelModeSelectionComponent;
      expect(mapTravelModeSelectionComponent).toBeDefined();
    });

    it('should not have a map-travel-mode-selection component', () => {
      component.itineraryView = false;
      spectator.detectChanges();
      let mapTravelModeSelection = spectator.debugElement.query(By.css("app-map-travel-mode-selection"))!;
      expect(mapTravelModeSelection).toBeFalsy();
    });
  });

  describe('Component initialization', () => {
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

    it('should have ActivatedRoute injected', () => {
      expect(component["_route"]).toBeDefined();
      expect(component["_route"]).toBeTruthy();
      expect(component["_route"]).toEqual(_route);
    });

    it('should have itineraryView initialized', () => {
      expect(component.itineraryView).toBeDefined();
      expect(component.itineraryView).toBeFalsy();
    });

    it('should have itineraryMode initialized', () => {
      expect(component.itineraryMode).toBeDefined();
      expect(component.itineraryMode).toBeTruthy();
      expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.DRIVING);
    });
  });

  describe('activeSearchBar initialization', () => {
    it('should have activeSearchBar set to 0 and false by default', () => {
      expect(component.activeSearchBar).toEqual({
        index: 0,
        isEditing: false
      });
    });
  });

  describe('Form Group initialization', () => {
    it('should be able to access ActivatedRoute params', () => {
      expect(component["_route"].snapshot.params['location']).toEqual("Nan");
      expect(component["_route"].snapshot.queryParams['start']).toEqual("2023-01-01");
      expect(component["_route"].snapshot.queryParams['end']).toEqual("2023-01-02");
      expect(component["_route"].snapshot.queryParams['lng']).toEqual("37.444");
      expect(component["_route"].snapshot.queryParams['lat']).toEqual("42.555");
    });

    it('should have a method to retrieve ActivatedRoute params and fill FormGroup on Init', () => {
      spyOn<ExploreComponent, any>(component, "_loadRouteParams").and.callThrough();
      component.ngOnInit();
      spectator.detectChanges();

      expect(component.searchFormsArrayControls[0].get('location')!.value)!.toEqual(new Location("", "Nan", 42.555, 37.444));
      expect(component.searchFormsArrayControls[0].get('start')!.value)!.toEqual(new Date("2023-01-01"));
      expect(component.searchFormsArrayControls[0].get('end')!.value)!.toEqual(new Date("2023-01-02"));
      expect(component["_loadRouteParams"]).toHaveBeenCalled();
    });

    it('should have a method to retrieve ActivatedRoute params without date and fill FormGroup on Init', () => {
      spyOn<ExploreComponent, any>(component, "_loadRouteParams").and.callThrough();
      _route.snapshot.queryParams = {
        lat: "42.555",
        lng: "37.444",
      }
      component.ngOnInit();
      spectator.detectChanges();

      expect(component.searchFormsArrayControls[0].get('location')!.value)!.toEqual(new Location("", "Nan", 42.555, 37.444));
      expect(component.searchFormsArrayControls[0].get('start')!.value)!.toEqual(null);
      expect(component.searchFormsArrayControls[0].get('end')!.value)!.toEqual(null);
      expect(component["_loadRouteParams"]).toHaveBeenCalled();
    });

    it('should have a method to retrieve ActivatedRoute params with invalid dates and fill FormGroup on Init', () => {
      spyOn<ExploreComponent, any>(component, "_loadRouteParams").and.callThrough();
      _route.snapshot.queryParams = {
        start: "2023-01-01111",
        end: "2023-01-02222",
        lat: "42.555",
        lng: "37.444",
      }
      component.ngOnInit();
      spectator.detectChanges();

      expect(component.searchFormsArrayControls[0].get('location')!.value)!.toEqual(new Location("", "Nan", 42.555, 37.444));
      expect(component.searchFormsArrayControls[0].get('start')!.value)!.toEqual(null);
      expect(component.searchFormsArrayControls[0].get('end')!.value)!.toEqual(null);
      expect(component["_loadRouteParams"]).toHaveBeenCalled();
    });

    it('should have a method to retrieve ActivatedRoute params with no coordinates and fill FormGroup on Init', () => {
      spyOn<ExploreComponent, any>(component, "_loadRouteParams").and.callThrough();
      _route.snapshot.queryParams = {
        start: "2023-01-01",
        end: "2023-01-02",
      }
      component.ngOnInit();
      spectator.detectChanges();

      expect(component.searchFormsArrayControls[0].get('location')!.value)!.toEqual(new Location("", "Nan", 0, 0));
      expect(component.searchFormsArrayControls[0].get('start')!.value)!.toEqual(new Date("2023-01-01"));
      expect(component.searchFormsArrayControls[0].get('end')!.value)!.toEqual(new Date("2023-01-02"));
      expect(component["_loadRouteParams"]).toHaveBeenCalled();
    });

    it('should return true if date is valid', () => {
      expect(component["_isValidDate"](new Date("2023-01-01"))).toBeTruthy();
    })

    it('should return false if date is not valid', () => {
      expect(component["_isValidDate"](new Date("2023-01-01111"))).toBeFalsy();
    });

    it('should return false if date parameter is not a date object', () => {
      expect(component["_isValidDate"]("test")).toBeFalsy();
    });
  });

  describe('View change', () => {
    it('should change itinerary view to true', () => {
      component.onViewChange("itinerary");
      expect(component.itineraryView).toEqual(true);
    });

    it('should change itinerary view to false', () => {
      component.onViewChange("location");
      expect(component.itineraryView).toEqual(false);
    });

    it('should change itinerary view to false in default case', () => {
      component.onViewChange("");
      expect(component.itineraryView).toEqual(false);
    });
  });

  describe("Next location status", () => {
    beforeEach(() => {
      component.searchFormsArrayControls.push(
        buildSearchBarFormGroupControlsDetails(),
        buildSearchBarFormGroupControlsDetails(),
      );
    });

    it('should return Location if next location exists', () => {
      component.activeSearchBar.index = 0;
      component.searchFormsArrayControls[1].get('location')!.setValue(new Location("", "Nantes", 42.555, 37.444));
      expect(component.nextLocation).toBeTruthy();
    });

    it('should return undefined if there is no next location', () => {
      // We take the last search bar
      component.activeSearchBar.index = component.searchFormsArrayControls.length - 1;
      expect(component.nextLocation).toBeFalsy();
    });
  });

  describe("Itinerary change", () => {
    it('should change itinerary mode to driving', () => {
      component.onItineraryModeChange({ travelMode: google.maps.TravelMode.DRIVING });
      expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.DRIVING);
      expect(component.selectedSearchForm.get('travelMode')!.value).toEqual(google.maps.TravelMode.DRIVING);
    });

    it('should change itinerary mode to walking', () => {
      component.onItineraryModeChange({ travelMode: google.maps.TravelMode.WALKING });
      expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.WALKING);
      expect(component.selectedSearchForm.get('travelMode')!.value).toEqual(google.maps.TravelMode.WALKING);
    });

    it('should change itinerary mode to bicycling', () => {
      component.onItineraryModeChange({ travelMode: google.maps.TravelMode.BICYCLING });
      expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.BICYCLING);
      expect(component.selectedSearchForm.get('travelMode')!.value).toEqual(google.maps.TravelMode.BICYCLING);
    });

    it('should change itinerary mode to bus', () => {
      component.onItineraryModeChange({ travelMode: google.maps.TravelMode.TRANSIT, transitMode: google.maps.TransitMode.BUS });
      expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.TRANSIT);
      expect(component.itineraryMode.transitMode).toEqual(google.maps.TransitMode.BUS);
      expect(component.selectedSearchForm.get('travelMode')!.value).toEqual(google.maps.TransitMode.BUS);
    });

    it('should change itinerary mode to train', () => {
      component.onItineraryModeChange({ travelMode: google.maps.TravelMode.TRANSIT, transitMode: google.maps.TransitMode.TRAIN });
      expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.TRANSIT);
      expect(component.itineraryMode.transitMode).toEqual(google.maps.TransitMode.TRAIN);
      expect(component.selectedSearchForm.get('travelMode')!.value).toEqual(google.maps.TransitMode.TRAIN);
    });

    it('should change itinerary mode to flight', () => {
      component.onItineraryModeChange({ travelMode: "FLIGHT" as google.maps.TravelMode });
      expect(component.itineraryMode.travelMode).toEqual("FLIGHT");
      expect(component.selectedSearchForm.get('travelMode')!.value).toEqual("FLIGHT");
    });
  });

})
