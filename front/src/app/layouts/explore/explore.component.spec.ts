import {ExploreComponent} from "./explore.component";
import {createComponentFactory, mockProvider, Spectator} from "@ngneat/spectator";
import {By} from "@angular/platform-browser";
import {MultipleSearchBarsComponent} from "../../containers/multiple-search-bars/multiple-search-bars.component";
import {AppModule} from "../../app.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MapComponent} from "../../containers/map/map.component";
import {FormArray, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationModel} from "../../models/location/location.model";
import {LocationService} from "../../services/location/location.service";
import {BehaviorSubject, of} from "rxjs";
import {MapFiltersComponent} from "../../containers/map-filters/map-filters.component";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildStepFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {
  MapTravelModeSelectionComponent
} from "../../containers/map-travel-mode-selection/map-travel-mode-selection.component";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {getAccommodationItems, getBarItems, getSportingItems} from "../../utils/suggestions-mock.utils";
import {CardsContainerComponent} from "../../containers/cards-container/cards-container.component";
import {LeisureCategory} from "../../enums/leisure-category";
import {
  LeisureCategoryFilterComponent
} from "../../containers/leisure-category-filter/leisure-category-filter.component";

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let spectator: Spectator<ExploreComponent>;
  let _route: ActivatedRoute;
  let _locationService: LocationService;
  let _suggestionService: SuggestionsService;
  let _suggestionStoreService: SuggestionsStoreService;
  let _multipleSearchComponent: MultipleSearchBarsComponent;
  let accommodationItems = getAccommodationItems();
  let sportingItems = getSportingItems();

  const createComponent = createComponentFactory({
    component: ExploreComponent,
    providers: [mockProvider(SuggestionsService, {
      getSuggestions: () => of(accommodationItems),
      getPreviewSuggestions: () => of(sportingItems)
    }),
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
      },
      SuggestionsStoreService,
      MultipleSearchBarsComponent
    ],
    declarations: [
      ExploreComponent,
      MultipleSearchBarsComponent
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
    _suggestionService = spectator.inject(SuggestionsService);
    _route = spectator.inject(ActivatedRoute);
    let router = spectator.inject(Router);

    _multipleSearchComponent = spectator.inject(MultipleSearchBarsComponent);
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
      return new BehaviorSubject<LocationModel[]>([]);
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

      expect(component.searchFormsArrayControls[0].get('location')!.value)!.toEqual(new LocationModel("", "Nan", 42.555, 37.444));
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

      expect(component.searchFormsArrayControls[0].get('location')!.value)!.toEqual(new LocationModel("", "Nan", 42.555, 37.444));
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

      expect(component.searchFormsArrayControls[0].get('location')!.value)!.toEqual(new LocationModel("", "Nan", 42.555, 37.444));
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

      expect(component.searchFormsArrayControls[0].get('location')!.value)!.toEqual(new LocationModel("", "Nan", 0, 0));
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
  describe('Getting Suggestions information', () => {


    it('should update activeSearchBar when index of input location triggered', () => {

      let mockedValue: SearchBarEvent = {
        index: 0,
        isEditing: true,
      };
      const valueChangeSpy = spyOn(component, 'onActiveSearchBarChange').and.callThrough();

      spectator.triggerEventHandler(MultipleSearchBarsComponent, 'activeSearchBarChange', mockedValue);

      expect(valueChangeSpy).toHaveBeenCalled();
      expect(mockedValue).toEqual(component.activeSearchBar);
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
          buildStepFormGroupControlsDetails(),
          buildStepFormGroupControlsDetails(),
        );
      });

      it('should return LocationModel if next location exists', () => {
        component.activeSearchBar.index = 0;
        component.searchFormsArrayControls[1].get('location')!.setValue(new LocationModel("", "Nantes", 42.555, 37.444));
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
        component.onItineraryModeChange({travelMode: google.maps.TravelMode.DRIVING});
        expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.DRIVING);
        expect(component.selectedSearchForm.get('travelMode')!.value).toEqual(google.maps.TravelMode.DRIVING);
      });

      it('should change itinerary mode to walking', () => {
        component.onItineraryModeChange({travelMode: google.maps.TravelMode.WALKING});
        expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.WALKING);
        expect(component.selectedSearchForm.get('travelMode')!.value).toEqual(google.maps.TravelMode.WALKING);
      });

      it('should change itinerary mode to bicycling', () => {
        component.onItineraryModeChange({travelMode: google.maps.TravelMode.BICYCLING});
        expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.BICYCLING);
        expect(component.selectedSearchForm.get('travelMode')!.value).toEqual(google.maps.TravelMode.BICYCLING);
      });

      it('should change itinerary mode to bus', () => {
        component.onItineraryModeChange({
          travelMode: google.maps.TravelMode.TRANSIT,
          transitMode: google.maps.TransitMode.BUS
        });
        expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.TRANSIT);
        expect(component.itineraryMode.transitMode).toEqual(google.maps.TransitMode.BUS);
        expect(component.selectedSearchForm.get('travelMode')!.value).toEqual(google.maps.TransitMode.BUS);
      });

      it('should change itinerary mode to train', () => {
        component.onItineraryModeChange({
          travelMode: google.maps.TravelMode.TRANSIT,
          transitMode: google.maps.TransitMode.TRAIN
        });
        expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.TRANSIT);
        expect(component.itineraryMode.transitMode).toEqual(google.maps.TransitMode.TRAIN);
        expect(component.selectedSearchForm.get('travelMode')!.value).toEqual(google.maps.TransitMode.TRAIN);
      });

      it('should change itinerary mode to flight', () => {
        component.onItineraryModeChange({travelMode: "FLIGHT" as google.maps.TravelMode});
        expect(component.itineraryMode.travelMode).toEqual("FLIGHT");
        expect(component.selectedSearchForm.get('travelMode')!.value).toEqual("FLIGHT");
      });
    });


  });

  it('should getSuggestions has been call when i called onActiveSearchBar', () => {

    let suggestionSpy = spyOn<ExploreComponent, any>(component, 'getPreviewSuggestions').and.callThrough();
    component.onActiveSearchBarChange({index: 0, isEditing: true});
    expect(suggestionSpy).toHaveBeenCalled();

  });
  it('should getting Suggestion when index of input location triggered', () => {
    let mockedValue: SearchBarEvent = {
      index: 0,
      isEditing: true,
    };
    const SuggestionsSpy = spyOn<ExploreComponent, any>(component, 'getPreviewSuggestions').and.callThrough();

    spectator.triggerEventHandler(MultipleSearchBarsComponent, 'activeSearchBarChange', mockedValue);

    expect(SuggestionsSpy).toHaveBeenCalled();


  });
  it('should call getSuggestions when user want shows more', () => {

    let spy = spyOn(component, 'getLeisureSuggestions').and.callThrough();
    spectator.triggerEventHandler(CardsContainerComponent, 'onGetSuggestions', undefined);

    expect(spy).toHaveBeenCalled();
  });

  it('should getSuggestions when triggered', () => {

    let spy = spyOn(_suggestionService, 'getSuggestions').and.callThrough();
    component.getLeisureSuggestions()
    expect(spy).toHaveBeenCalled();
  });

  it('should getPreviewSuggestions when user select a category', () => {

    let spy = spyOn(component, 'onSelectedCategoryChange').and.callThrough();
    let spyService = spyOn<SuggestionsService, any>(_suggestionService, 'getPreviewSuggestions').and.callThrough();
    spectator.triggerEventHandler(LeisureCategoryFilterComponent, 'onSelectedCategory', LeisureCategory.SPORTING_EVENT);
    expect(spy).toHaveBeenCalledWith(LeisureCategory.SPORTING_EVENT);
    expect(spyService).toHaveBeenCalled();
  });
});
