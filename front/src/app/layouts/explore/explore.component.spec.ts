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
import {StepDatesFiltersComponent} from "../../containers/step-dates-filter/step-dates-filters.component";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildStepFormGroupControlsDetails} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {
  MapTravelModeSelectionComponent
} from "../../containers/map-travel-mode-selection/map-travel-mode-selection.component";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {getAccommodationItems, getSportingItems} from "../../utils/suggestions-mock.utils";
import {CardsContainerComponent} from "../../containers/cards-container/cards-container.component";
import {LeisureCategory} from "../../enums/leisure-category";
import {
  LeisureCategoryFilterComponent
} from "../../containers/leisure-category-filter/leisure-category-filter.component";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {
  AddSummaryHeader,
  AddSummaryLeisures,
  AddSummaryMap,
  AddSummaryText,
  BuildCanvas,
  SavePdf
} from "../../utils/pdf/pdf.utils";
import {TripModel} from "../../models/trip/trip.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {StepModel} from "../../models/step/step.model";
import TravelMode = google.maps.TravelMode;

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let spectator: Spectator<ExploreComponent>;
  let _route: ActivatedRoute;
  let _router: Router;
  let _locationService: LocationService;
  let _suggestionService: SuggestionsService;
  let _suggestionStoreService: SuggestionsStoreService;
  let _multipleSearchComponent: MultipleSearchBarsComponent;
  let _tripBuilderService: TripBuilderService;
  let accommodationItems = getAccommodationItems();
  let sportingItems = getSportingItems();

  const createComponent = createComponentFactory({
    component: ExploreComponent,
    providers: [mockProvider(SuggestionsService, {
      getSuggestions: () => of(accommodationItems),
      getPreviewSuggestions: () => of(sportingItems)
    }),
      TripBuilderService,
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
    _suggestionStoreService = spectator.inject(SuggestionsStoreService);
    _tripBuilderService = spectator.inject(TripBuilderService);
    _route = spectator.inject(ActivatedRoute);
    _router = spectator.inject(Router);

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
      let mapFilters = spectator.debugElement.query(By.css("app-step-dates-filters"))!;
      let mapFiltersComponent: StepDatesFiltersComponent = mapFilters.componentInstance as StepDatesFiltersComponent;
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


    it('should return true if date is valid', () => {
      expect(component["_isValidDate"](new Date("2023-01-01"))).toBeTruthy();
    })

    it('should return false if date is not valid', () => {
      expect(component["_isValidDate"](new Date("2023-01-01111"))).toBeFalsy();
    });

    it('should return false if date parameter is not a date object', () => {
      expect(component["_isValidDate"]("test")).toBeFalsy();
    });


    it('should redirect to / if lat or lng is not provided', () => {
      spyOn<Router, any>(component["_router"], "navigate").and.callThrough();
      _route.snapshot.queryParams = {
        start: "2023-01-01",
        end: "2023-01-02",
      }
      component.ngOnInit();
      spectator.detectChanges();
      expect(component["_router"].navigate).toHaveBeenCalledWith(['/']);
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
  it('should subscribe to adding leisure item event and update value', () => {
    let item = getAccommodationItems()[0];
    let spy = spyOn(component, 'onAddingLeisureInStep').and.callThrough();
    _suggestionStoreService = spectator.inject(SuggestionsStoreService)
    _suggestionStoreService?.setLeisureItemToAdd(item);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(item);
  });

  it('should create an array Leisure', () => {
    let items = new Array<LeisureItemModel>();
    expect(items).toBeDefined()

  });

  it('should add a leisure item to the leisures array', () => {
    // Set up the necessary form controls for the test

    // Create a mock LeisureItemModel
    const mockItem: LeisureItemModel = getAccommodationItems()[0]

    // Call the onAddingLeisureInStep method with the mock item
    spectator.component.onAddingLeisureInStep(mockItem);
    // Check if the leisures array is created and contains the mock item
    const leisures = spectator.component.selectedSearchForm.get('leisures')?.value;
    expect(leisures).toEqual([mockItem]);
  });

  it('should call onSave when user click on save button', () => {

    let spy = spyOn(component, 'onSaveTrip').and.callThrough();
    // let spyService = spyOn<TripBuilderService, any>(_tripBuilderService, 'saveTrip').withArgs("tripname").and.callThrough();
    spectator.click('[data-cy-explorer-save-button] [simple-button]');
    spectator.detectChanges();
    expect(spy).toHaveBeenCalled();
    // expect(spyService).toHaveBeenCalled();
  });

  // it('should getPreviewSuggestions return an ERROR when it called', async() => {
  //
  //   let spyService = await spyOn<SuggestionsService, any>(component["_suggestionsService"], 'getPreviewSuggestions').and.returnValue(new Error('Error'));
  //   await component.getPreviewSuggestions()
  //   spyOn(window, 'alert');
  //
  //   setTimeout(() => {
  //     expect(spyService).toHaveBeenCalled();
  //     expect(window.alert).toHaveBeenCalledWith('error');
  //
  //   }, 0);
  // });

  describe('PDF Export', () => {
    let _tripService: TripBuilderService;
    let trip: TripModel;

    beforeEach(() => {
      _tripService = spectator.inject(TripBuilderService);
      trip = new TripModel();
      trip.name = "Trip name";
      trip.startDate = getIsoStringFromDate(new Date());
      trip.endDate = getIsoStringFromDate(new Date());
      trip.steps = [
        new StepModel(
          "1",
          "Nantes",
          new LocationModel("1", "Nantes", 47.219615480985965, -1.55627203138153),
          [
            new LeisureItemModel(
              "1",
              "Hotel",
              "",
              "Hotel description",
              './assets/images/default_image.jpg',
              new LocationModel("1", "Nantes", 47.24274536406868, -1.5948089748020868),
              LeisureCategory.ACCOMMODATION,
              getIsoStringFromDate(new Date()),
              4,
              100
            ),
            new LeisureItemModel(
              "2",
              "Restaurant",
              "",
              "Restaurant description",
              './assets/images/default_image.jpg',
              new LocationModel("1", "Nantes", 47.243949509046125, -1.5530154675910486),
              LeisureCategory.RESTAURANT,
              getIsoStringFromDate(new Date()),
              4,
              100
            ),
          ],
          getIsoStringFromDate(new Date()),
          getIsoStringFromDate(new Date()),
          "DRIVING" as TravelMode
        ),
        new StepModel(
          "2",
          "Paris",
          new LocationModel("2", "Paris", 48.8941339490254, 2.364876797684228),
          [
            new LeisureItemModel(
              "3",
              "Hotel",
              "",
              "Hotel description description description description description description description description description description description description description description description description description ",
              './assets/images/default_image.jpg',
              new LocationModel("2", "Paris", 48.8941339490254, 2.364876797684228),
              LeisureCategory.ACCOMMODATION,
              getIsoStringFromDate(new Date()),
              4,
              100,
            ),
            // Cultural event
            new LeisureItemModel(
              "4",
              "Cultural event",
              "",
              "Cultural event description",
              './assets/images/default_image.jpg',
              new LocationModel("2", "Paris", 48.8941339490254, 2.364876797684228),
              LeisureCategory.CULTURAL_EVENT,
              getIsoStringFromDate(new Date()),
              4,
              100,
            ),
          ],
          getIsoStringFromDate(new Date()),
          getIsoStringFromDate(new Date()),
          "FLIGHT" as TravelMode
        ),
        new StepModel(
          "3",
          "Pékin",
          new LocationModel("2", "Pékin", 39.91853605897336, 116.40154015421919),
          []
        ),
      ];
      spyOn<TripBuilderService, any>(_tripService, 'saveTrip').and.returnValue(trip);
      spectator.detectChanges();
    });

    it('should have _tripService service injected', () => {
      expect(component["_tripBuilderService"]).toBeDefined();
      expect(component["_tripBuilderService"]).toBeTruthy();
      expect(component["_tripBuilderService"]).toEqual(_tripService);
    });

    it('should call generateSummary when user click on export button', async () => {
      spyOn<ExploreComponent, any>(component, 'generateSummary').and.callThrough();
      spectator.click('[generate-pdf-button] [simple-button]');
      expect(component.generateSummary).toHaveBeenCalled();
    });

    it('should retrieve saved TripModel', async () => {
      await component.generateSummary();
      expect(component["_tripBuilderService"].saveTrip).toHaveBeenCalled();
    });

    it('should build a canvas', async () => {
      spyOn<any, any>(BuildCanvas, 'buildCanvas').and.callThrough();
      await component.generateSummary();
      expect(BuildCanvas.buildCanvas).toHaveBeenCalledTimes(1);
    });

    it('should build a summary header inside pdf', async () => {
      spyOn<any, any>(AddSummaryHeader, 'addSummaryHeader').and.callThrough();
      await component.generateSummary();
      expect(AddSummaryHeader.addSummaryHeader).toHaveBeenCalledTimes(1);
    });

    it('should build a road map and leisures maps inside pdf', async () => {
      spyOn<any, any>(AddSummaryMap, 'addSummaryMap').and.callThrough();
      await component.generateSummary();
      expect(AddSummaryMap.addSummaryMap).toHaveBeenCalledTimes(1 + trip.steps.length);
    });

    it('should build leisures summary inside pdf', async () => {
      spyOn<any, any>(AddSummaryLeisures, 'addSummaryLeisures').and.callThrough();
      await component.generateSummary();
      expect(AddSummaryLeisures.addSummaryLeisures).toHaveBeenCalled();
    });

    it('should write travel itinerary', async () => {
      spyOn<any, any>(AddSummaryText, 'addSummaryText').and.callThrough();
      await component.generateSummary();
      expect(AddSummaryText.addSummaryText).toHaveBeenCalledWith(
        jasmine.anything(), `${trip.steps[0].location.name} => ${trip.steps[0].travelMode} => ${trip.steps[1].location.name}`, jasmine.anything(), jasmine.anything()
      );
    });

    it('should write TO DEFINE when no travel mode is defined', async () => {
      spyOn<any, any>(AddSummaryText, 'addSummaryText').and.callThrough();
      trip.steps[1].travelMode = undefined;
      await component.generateSummary();

      expect(AddSummaryText.addSummaryText).toHaveBeenCalledWith(
        jasmine.anything(), `${trip.steps[1].location.name} => TO DEFINE => ${trip.steps[2].location.name}`, jasmine.anything(), jasmine.anything()
      );
    });

    it('should save pdf', async () => {
      spyOn<any, any>(SavePdf, 'savePdf').and.callThrough();
      await component.generateSummary();
      expect(SavePdf.savePdf).toHaveBeenCalled();
    });
  });

});
