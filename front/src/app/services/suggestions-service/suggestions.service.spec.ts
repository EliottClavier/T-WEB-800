import {fakeAsync} from '@angular/core/testing';

import {SuggestionsService} from './suggestions.service';
import {createHttpFactory, createServiceFactory, HttpMethod, SpectatorHttp, SpectatorService} from "@ngneat/spectator";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {LeisureCategory} from "../../enums/leisure-category";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Location} from "../../models/location/location.model";
import {Observable} from "rxjs";
import {addMatchers} from 'jasmine-marbles';


describe('SuggestionsService', () => {

  let spectator: SpectatorService<SuggestionsService>;
  let httpclient: HttpClient;
  let service: SuggestionsService;
  let spectatorHttp: SpectatorHttp<SuggestionsService>

  const createService = createServiceFactory({
    service: SuggestionsService,
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [HttpClient],
  });

  const createHttp = createHttpFactory(SuggestionsService);

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    httpclient = spectator.inject(HttpClient);
    spectatorHttp = createHttp();
    addMatchers();
  });


  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should inject HttpClient', () => {
    expect(httpclient).toBeDefined();
    expect(spectator.service["_httpclient"]).toBeDefined();
    expect(spectator.service["_httpclient"]).toBeTruthy();
    expect(spectator.service["_httpclient"]).toEqual(httpclient);
  });

  it('should have HttpClient as dependency', () => {
    expect(httpclient).toBeDefined();
  });
  it('should test HttpClient getPreviewSuggestions', () => {
    let location = new Location("1", "Nantes");
    let items = getBarItems()

    spectatorHttp.service.getPreviewSuggestions(LeisureCategory.ACCOMMODATION, location, "","").subscribe(
      (data) => {
        expect(data[0].title).toEqual(items[0].title);
      }
    );
    let date = items[0].date;
    let req = spectatorHttp.expectOne(`/api/preview/accommodations/search?location=${location.getCoordinates()}&start=&end=`, HttpMethod.GET);
    req.flush(getBarItems());
    expect(req.request.method).toEqual('GET');

  });

  it('should have getPreviewSuggestions method', () => {
    expect(service.getPreviewSuggestions(LeisureCategory.BAR, new Location("0", "Nantes"), "","")).toBeDefined();
    expect(spectator.service.getPreviewSuggestions(LeisureCategory.BAR, new Location("0", "Nantes"), "","")).toBeTruthy();
    expect(spectator.service.getPreviewSuggestions(LeisureCategory.BAR, new Location("0", "Nantes"), "","")).toEqual(jasmine.any(Observable));
  });

  it('should get subscribe to an Observable and get data', fakeAsync(() => {

    const expectedValue = getBarItems();
    spyOn(spectator.service, 'getPreviewSuggestions').and.returnValue(getBarItems$());

    // tick(1);
    const result$: Observable<LeisureItemModel[]> = spectator.service.getPreviewSuggestions(LeisureCategory.BAR, new Location("0", "Nantes"), "","");

    getBarItems$().subscribe((data) => {
      expect(data).toEqual(expectedValue);
    });

  }));

  it('should test HttpClient getSuggestions', () => {
    let location = new Location("1", "Nantes");
    let items = getBarItems()

    spectatorHttp.service.getSuggestions(LeisureCategory.ACCOMMODATION, location, "","").subscribe(
      (data) => {
        expect(data[0].title).toEqual(items[0].title);
      }
    );
    let date = items[0].date;
    let req = spectatorHttp.expectOne(`/api/suggestions/accommodations/search?location=${location.getCoordinates()}&start=&end=`, HttpMethod.GET);
    req.flush(getBarItems());
    expect(req.request.method).toEqual('GET');
  });


  it('should have getSuggestions method', () => {
    expect(service.getSuggestions(LeisureCategory.BAR, new Location("0", "Nantes"), "","")).toBeDefined();
    expect(spectator.service.getSuggestions(LeisureCategory.BAR, new Location("0", "Nantes"), "","")).toBeTruthy();
    expect(spectator.service.getSuggestions(LeisureCategory.BAR, new Location("0", "Nantes"), "","")).toEqual(jasmine.any(Observable));
  });


  it('should getSuggestions subscribe to an Observable and get data', fakeAsync(() => {

    const expectedValue = getBarItems();
    spyOn(spectator.service, 'getSuggestions').and.returnValue(getBarItems$());

    // tick(1);
    const result$: Observable<LeisureItemModel[]> = spectator.service.getSuggestions(LeisureCategory.BAR, new Location("0", "Nantes"), "","");

    getBarItems$().subscribe((data) => {
      expect(data).toEqual(expectedValue);
    });

  }));
});
  function getBarItems$() {
    let data = new Array<LeisureItemModel>();
    for (let i = 0; i < 3; i++) {
      let item = new LeisureItemModel();
      item.category = LeisureCategory.BAR;
      data.push(item);
    }
    return new Observable<LeisureItemModel[]>((observer) => {
      observer.next(data);
      observer.complete();
    });
  }

  function getBarItems() {
    let data = new Array<LeisureItemModel>();
    for (let i = 0; i < 3; i++) {
      let item = new LeisureItemModel();
      item.category = LeisureCategory.BAR;
      data.push(item);
    }
    return data;
  };
//
// let testItemModelInformations: LeisureItemModel[] = [
//   {
//     "id": "1",
//     "title": "firstAccommodation",
//     "description": "this is a description",
//     "image": './assets/images/default_image.jpg',
//     "category": LeisureCategory.ACCOMMODATION,
//   },
//   {
//     "id": "2",
//     "title": "secondAccommodation",
//     "description": "this is a description",
//     "image": './assets/images/default_image.jpg',
//     "category": LeisureCategory.ACCOMMODATION,
//   },
//   {
//     "id": "3",
//     "title": "thirdAccommodation",
//     "description": "this is a description",
//     "image": './assets/images/default_image.jpg',
//     "category": LeisureCategory.ACCOMMODATION,
//   },
//   {
//     "id": "4",
//     "title": "fourthAccommodation",
//     "description": "this is a description",
//     "image": './assets/images/default_image.jpg',
//     "category": LeisureCategory.ACCOMMODATION,
//   },
//   {
//     "id": "5",
//     "title": "fifthAccommodation",
//     "description": "this is a description",
//     "image": './assets/images/default_image.jpg',
//     "category": LeisureCategory.ACCOMMODATION,
//     c
//   },
//   {
//     "id": "6",
//     "title": "sixthAccommodation",
//     "description": "this is a description",
//     "image": './assets/images/default_image.jpg',
//     "category": LeisureCategory.ACCOMMODATION,
//   },
// ]

