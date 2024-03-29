import {SingleSearchBarComponent} from './single-search-bar.component'
import {createComponentFactory, createServiceFactory, Spectator} from "@ngneat/spectator";
import {Router} from "@angular/router";
import {SearchInputComponent} from "../../components/inputs/search-input/search-input.component";
import {DateRangeComponent} from "../../components/inputs/date-range/date-range.component";
import {SimpleButtonComponent} from "../../components/buttons/simple-button/simple-button.component";
import {SimpleIconButtonComponent} from "../../components/buttons/simple-icon-button/simple-icon-button.component";
import {FormControl, FormGroup} from "@angular/forms";
import {LocationModel} from "../../models/location/location.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AppModule} from "../../app.module";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {throwError} from "rxjs";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";
import {buildStepFormGroupControls} from "../../utils/search-bar-form-group/search-bar-form-group.utils";

describe('SingleSearchBarComponent', () => {

  let component: SingleSearchBarComponent;
  let spectator: Spectator<SingleSearchBarComponent>;
  let _router: Router;
  let suggestionService: SuggestionsService;
  let suggestionStore: SuggestionsStoreService;

  const createComponent = createComponentFactory({
    component: SingleSearchBarComponent,
    declarations: [
      SingleSearchBarComponent,
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
    providers: [SuggestionsService, SuggestionsStoreService]
  });

  const createService = createServiceFactory(SuggestionsService)
  const createStore = createServiceFactory(SuggestionsStoreService)

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    spectator.detectChanges();
    suggestionService = createService().service;
    suggestionStore = createStore().service;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have searchForm attribute with FormGroup initialized', () => {
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm).toBeInstanceOf(FormGroup);
  });

  describe('Search bar display', () => {
    it('should have a search input', () => {
      expect(spectator.query("app-search-input[search-bar-input]")).toBeTruthy();
    });

    it('should have a search date range', () => {
      expect(spectator.query("app-date-range[search-bar-date-range]")).toBeTruthy();
    });

    it('should have a validate search button', () => {
      expect(spectator.query("app-simple-button[search-bar-validate]")).toBeTruthy();
      expect(spectator.query("app-simple-button[search-bar-validate]")).toHaveText("Validate");
    });
  });

  describe('Validate research and redirection', () => {
    let locationName: string = "Paris";
    let locationLat: number = 48.8566;
    let locationLong: number = 2.3522;
    let start: Date = new Date();
    let end: Date = new Date();

    beforeEach(() => {
      _router = spectator.inject(Router);
      component.searchForm = new FormGroup<any>({
        location: new FormControl(new LocationModel("1", locationName, locationLat, locationLong)),
        locationSearch: new FormControl(""),
        start: new FormControl(start),
        end: new FormControl(end),
      });
      spectator.detectChanges();
    });

    it('should submit search when validate button is clicked', () => {
      spyOn(component["_router"], 'navigate').and.stub();
      spyOn(component, 'validate').and.callThrough();

      let button = spectator.query("app-simple-button[search-bar-validate] [simple-button]")!;
      spectator.click(button);

      expect(button).not.toBeDisabled();
      expect(component.searchForm.invalid).toBeFalse();
      expect(component.validate).toHaveBeenCalled();
      expect(component["_router"].navigate).toHaveBeenCalled;
    });

    it('should have Router injected', () => {
      expect(component["_router"]).toBeDefined();
      expect(component["_router"]).toBeTruthy();
      expect(component["_router"]).toEqual(_router);
    });

    it('should redirect to explore view with params', () => {
      spyOn(component["_router"], 'navigate').and.stub();

      component.validate();

      expect(component["_router"].navigate).toHaveBeenCalledWith(
        ["/", "explore", locationName],
        {
          queryParams: {
            start: getIsoStringFromDate(start),
            end: getIsoStringFromDate(end),
            lat: locationLat,
            lng: locationLong
          }
        }
      );
    });

    it('should redirect to explore view when validate button is clicked', () => {
      spyOn(component, 'validate').and.callThrough();
      spyOn(component["_router"], 'navigate').and.stub();

      let button = spectator.query("app-simple-button[search-bar-validate] [simple-button]")!;
      spectator.click(button);

      expect(component.validate).toHaveBeenCalled();
      expect(component["_router"].navigate).toHaveBeenCalledWith(
        ["/", "explore", locationName],
        {
          queryParams: {
            start: getIsoStringFromDate(start),
            end: getIsoStringFromDate(end),
            lat: locationLat,
            lng: locationLong
          }
        }
      );
    });


    it('should update the Suggestions value when location is updated and getting error ', () => {

      const location = new LocationModel('01', 'New York', 0, 0);
      const suggestions = new Array<LeisureItemModel>();


      spyOn(suggestionService, "getPreviewSuggestions").and.returnValue(throwError(() => new Error('error')));
      suggestionStore.setSuggestionsData(suggestions)

      suggestionStore.suggestions$.subscribe({
        next: suggests => {
          expect(suggestions).toEqual(suggests);
        }, error: err => {
          expect(err).toEqual('error');
        }
      });
    });
  });

  it('should set the searchForm values when onLocationOptionClick is called', () => {
    const location: LocationModel = new LocationModel()
    const startValue = '2023-05-01';
    const endValue = '2023-05-10';
    const idValue = '123';
    const nameValue = 'Sample name';

    component.searchForm.patchValue({
      start: startValue,
      end: endValue,
      id: idValue,
      name: nameValue,
    });

    component.onLocationOptionClick(location);

    expect(component.searchForm.value).toEqual({
      locationSearch: location.name,
      location: new LocationModel(location.id, location.name, location.lat, location.lng),
      start: startValue,
      end: endValue,
      id: idValue,
      name: nameValue,
    });

  });
});

