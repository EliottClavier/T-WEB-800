import {fakeAsync, tick} from '@angular/core/testing';

import {SuggestionsService} from './suggestions.service';
import {createServiceFactory, SpectatorService} from "@ngneat/spectator";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ItemModel} from "../../models/item/item.model";
import {ItemType} from "../../models/ItemType";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Location} from "../../models/location/location.model";
import {delay, Observable} from "rxjs";
import {addMatchers} from 'jasmine-marbles';


describe('SuggestionsService', () => {

  let spectator: SpectatorService<SuggestionsService>;
  let httpclient: HttpClient;
  let service: SuggestionsService;
  let httpMock: HttpTestingController;

  const createService = createServiceFactory({
    service: SuggestionsService,
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [HttpClient],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    httpclient = spectator.inject(HttpClient);
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

  it('should GET http request ', () => {
    let req = httpMock.expectOne(`/api/search/accommodation/nantes`);
    expect(req.request.method).toEqual('GET');
    // req.flush(testItemModelInformations.filter(
    //   (accomodations : ItemModel[]) => accomodation.getTitle().toLowerCase())
    // ), {status: 200, statusText: 'OK'});
  });


  it('should have getReviewSuggestions method', () => {
    expect(service.getReviewSuggestions(ItemType.BAR, new Location("0", "Nantes"))).toBeDefined();
    expect(spectator.service.getReviewSuggestions(ItemType.BAR, new Location("0", "Nantes"))).toBeTruthy();
    expect(spectator.service.getReviewSuggestions(ItemType.BAR, new Location("0", "Nantes"))).toEqual(jasmine.any(Observable));
  });

  it('should get subscribe to an Observable and get data', fakeAsync(() => {

    const expectedValue = getBarItems();
    spyOn(spectator.service, 'getReviewSuggestions').and.returnValue(getBarItems$().pipe(delay(1)));

    tick(1);
    const result$: Observable<ItemModel[]> = spectator.service.getReviewSuggestions(ItemType.BAR, new Location("0", "Nantes"));

    getBarItems$().subscribe((data) => {
      expect(data).toEqual(expectedValue);
    });

  }));
});
function getBarItems$() {
  let data = new Array<ItemModel>();
  for (let i = 0; i < 3; i++) {
    let item = new ItemModel();
    item.typeOfItem = ItemType.BAR;
    data.push(item);
  }
  return new Observable<ItemModel[]>((observer) => {
    observer.next(data);
    observer.complete();
  });
}

function getBarItems() {
  let data = new Array<ItemModel>();
  for (let i = 0; i < 3; i++) {
    let item = new ItemModel();
    item.typeOfItem = ItemType.BAR;
    data.push(item);
  }
  return data;
};

let testItemModelInformations: ItemModel[] = [
  {
    "id": "1",
    "title": "firstAccommodation",
    "description": "this is a description",
    "image":'./assets/images/default_image.jpg',
    "typeOfItem": ItemType.ACCOMMODATION,
  },
  {
    "id": "2",
    "title": "secondAccommodation",
    "description": "this is a description",
    "image":'./assets/images/default_image.jpg',
    "typeOfItem": ItemType.ACCOMMODATION,
  },
  {
    "id": "3",
    "title": "thirdAccommodation",
    "description": "this is a description",
    "image":'./assets/images/default_image.jpg',
    "typeOfItem": ItemType.ACCOMMODATION,
  },
  {
    "id": "4",
    "title": "fourthAccommodation",
    "description": "this is a description",
    "image":'./assets/images/default_image.jpg',
    "typeOfItem": ItemType.ACCOMMODATION,
  },
  {
    "id": "5",
    "title": "fifthAccommodation",
    "description": "this is a description",
    "image": './assets/images/default_image.jpg',
    "typeOfItem": ItemType.ACCOMMODATION,
  },
  {
    "id": "6",
    "title": "firstAccommodation",
    "description": "this is a description",
    "image": './assets/images/default_image.jpg',
    "typeOfItem": ItemType.ACCOMMODATION,
  },
]
