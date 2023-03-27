import {TestBed} from '@angular/core/testing';

import {SuggestionsStoreService} from './suggestions-store.service';
import {createServiceFactory, mockProvider, SpectatorService} from "@ngneat/spectator";
import {LeisureItemModel} from "../models/leisure/leisure-item.model";
import {SuggestionsService} from "../services/suggestions-service/suggestions.service";
import {LeisureCategory} from "../enums/leisure-category";
import {BehaviorSubject} from "rxjs";
import {SingleSearchBarComponent} from "../containers/single-search-bar/single-search-bar.component";

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

  function getBarItem() {
    let data = new Array<LeisureItemModel>();
    for (let i = 0; i < 3; i++) {
      let item = new LeisureItemModel();
      item.category = LeisureCategory.BAR;
      data.push(item);
    }
    return data;
  }

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
    let data = new BehaviorSubject<LeisureItemModel[]>(getBarItem())
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
    let  spy = spyOn(createService().service, 'setSuggestionsData').and.callFake(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should subscribe to data when "next" is called', () => {
    spyOn(createService().service, 'setSuggestionsData').and.callFake(() => {

      expect(createService().service.suggestions$).toHaveBeenCalled();

      createService().service.setSuggestionsData(getBarItem());

      expect(createService().service.getSuggestionsData()).toEqual(getBarItem());
    });
  });


  it('should  trigger the next Suggestions value when location updated', () => {

    const subjectSpy = spyOn(createService().service, 'setSuggestionsData').and.callThrough();
    createService().service.setSuggestionsData(getBarItem());
    expect(subjectSpy).toHaveBeenCalled();
    expect(createService().service.getSuggestionsData()).toEqual(getBarItem());
  });
});


function getAccommodationItems() {
  let data = new Array<LeisureItemModel>();
  for (let i = 0; i < 3; i++) {
    let item = new LeisureItemModel();
    item.category = LeisureCategory.BAR;
    data.push(item);
  }
  return data;
};
