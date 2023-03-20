import {fakeAsync, TestBed} from '@angular/core/testing';

import { SuggestionsService } from './suggestions.service';
import {createServiceFactory, Spectator, SpectatorService} from "@ngneat/spectator";
import {createComponent, inject, ProviderToken} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {T} from "@angular/cdk/keycodes";
import {TranslateService} from "@ngx-translate/core";
import {AppModule} from "../../app.module";
import {ItemModel} from "../../models/item/item.model";
import {ItemType} from "../../models/ItemType";
import {of} from "rxjs";

function getBarItems() {
  let data = new Array<ItemModel>();
  for (let i = 0; i < 3; i++) {
    let item = new ItemModel();
    item.typeOfItem = ItemType.BAR;
    data.push(item);
  }
  return data;
}

describe('SuggestionsService', () => {

  let spectator: SpectatorService<SuggestionsService>;
  let httpclient: HttpClient;
  const createService = createServiceFactory({
    service: SuggestionsService,
    imports: [HttpClientModule],
    providers: [HttpClient],
  });

  beforeEach(() => {
    spectator = createService();
    httpclient  = spectator.inject(HttpClient);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should inject HttpClient', () => {
    // const httpclient = spectator.inject(HttpClient);
    expect(httpclient).toBeDefined();
  });

  it('should have HttpClient as dependency', () => {
    const myService = spectator.inject(HttpClient);
    expect(myService).toBeDefined();
  });
  it('On init users should be loaded', fakeAsync(() => {
    const myService = spectator.inject(HttpClient);
    // spyOn(SuggestionsService, 'getSuggestions').and.returnValue(of(getBarItems()));

    // Trigger ngOnInit()
    // myService.detectChanges();

    // expect(component.loading).toBeTruthy();
    // expect(component.users).toBeUndefined();
    // expect(userService.getUsers).toHaveBeenCalledWith();
    //
    // // Simulates the asynchronous passage of time
    // tick(1);
    //
    // expect(component.loading).toBeFalsy();
    // expect(component.users).toEqual([user]);
  }));
});
