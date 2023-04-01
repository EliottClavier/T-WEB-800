import {TestBed} from '@angular/core/testing';

import {SuggestionsStoreService} from './suggestions-store.service';
import {createServiceFactory, mockProvider, SpectatorService} from "@ngneat/spectator";
import {LeisureItemModel} from "../models/leisures/leisure-item.model";
import {SuggestionsService} from "../services/suggestions-service/suggestions.service";
import {LeisureCategory} from "../enums/leisure-category";
import {BehaviorSubject} from "rxjs";
import {SingleSearchBarComponent} from "../containers/single-search-bar/single-search-bar.component";
import {getBarItems} from "../utils/suggestions-mock.utils";
import {LocationModel} from "../models/location/location.model";
import {shouldBeautify} from "@angular-devkit/build-angular/src/utils/environment-options";

describe('SuggestionsStoreService', () => {
  let store: SuggestionsStoreService;
  let spectator: SpectatorService<SuggestionsStoreService>;

  const createService = createServiceFactory<SuggestionsStoreService>({
    service: SuggestionsStoreService,
    providers: [mockProvider(SuggestionsService, {
      getPreviewSuggestions: () => new Array<LeisureItemModel>(), //if needed
    }),
      SingleSearchBarComponent]
  });



  function getActivityItem() {
    let data = new Array<LeisureItemModel>();
    for (let i = 0; i < 4; i++) {
      let item = new LeisureItemModel();
      item.category = LeisureCategory.CULTURAL_EVENT;
      data.push(item);
    }
    return data;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(SuggestionsStoreService);
  });

  it('should be created', () => {
    expect(createService().service).toBeDefined();
    expect(store).toBeTruthy();
  });
  it('should be get suggestion data', () => {
    expect(createService().service.getSuggestionsData()).toBeDefined();
    // expect(createService().service.getSuggestions()).toEqual(new Array<LeisureItemModel>());
  });

  it('should be update suggestion data', () => {
    spyOnProperty(createService().service, 'suggestions$', 'set').and.callThrough();
    expect(createService().service.suggestions$ = new BehaviorSubject<LeisureItemModel[]>(new Array<LeisureItemModel>())).toBeDefined();
  });

  it('should be get Bar suggestions ', () => {
    let data = new BehaviorSubject<LeisureItemModel[]>(getBarItems())
    const subjectSpy = spyOn(createService().service.suggestions$, 'asObservable').and.returnValue(data.asObservable());
    expect(createService().service.suggestions$.asObservable()).toEqual(data.asObservable());
    expect(createService().service.suggestions$.asObservable()).toBeDefined();
    expect(subjectSpy).toHaveBeenCalled();
  });

  it('should get Activity suggestions ', () => {
    let data = new BehaviorSubject<LeisureItemModel[]>(getActivityItem())
    const subjectSpy = spyOn(createService().service.suggestions$, 'asObservable').and.returnValue(data.asObservable());
    expect(createService().service.suggestions$.asObservable()).toEqual(data.asObservable());
    expect(createService().service.suggestions$.asObservable()).toBeDefined();
    expect(subjectSpy).toHaveBeenCalled();
  });

  it('should be set suggestion ', () => {
    let spy = spyOn(createService().service, 'setSuggestionsData').and.callFake(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should subscribe to data when "next" is called', () => {
    spyOn(createService().service, 'setSuggestionsData').and.callFake(() => {

      expect(createService().service.suggestions$).toHaveBeenCalled();

      createService().service.setSuggestionsData(getBarItems());

      expect(createService().service.getSuggestionsData()).toEqual(getBarItems());
    });
  });

  it('should  trigger the next Suggestions value when location updated', () => {

    const subjectSpy = spyOn(createService().service, 'setSuggestionsData').and.callThrough();
    createService().service.setSuggestionsData(getBarItems());
    expect(subjectSpy).toHaveBeenCalled();
    expect(createService().service.getSuggestionsData()).toEqual(getBarItems());
  });

  it('should get category of item', () => {
    store.suggestions$.next(getBarItems());
    expect(store.getCategory).toEqual(LeisureCategory.BAR);
  });


  it('should get location of item', () => {
    let items = getBarItems();
    items.forEach((item) => {
      item.location.lng = 34.78;
      item.location.lat = 32.08;
      item.location.name = "Tel Aviv";
    });

    store.suggestions$.next(items);

    expect(store.getLocation.name).toEqual("Tel Aviv");
    expect(store.getLocation.lat).toEqual(32.08);
    expect(store.getLocation.lng).toEqual(34.78);
  });

  it('should set leisure item', () => {
    let items = getBarItems();
    store.leisureItemToAdd$ = new BehaviorSubject<LeisureItemModel>(items[0]);
    store.leisureItemToAdd$.subscribe((item) => {
      expect(item).toEqual(items[0]);
    });
    store.setLeisureItemToAdd(items[0]);
  });
});



