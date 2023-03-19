import { TestBed } from '@angular/core/testing';

import { SuggestionsService } from './suggestions.service';
import {createServiceFactory, Spectator, SpectatorService} from "@ngneat/spectator";
import {createComponent, inject, ProviderToken} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {T} from "@angular/cdk/keycodes";
import {TranslateService} from "@ngx-translate/core";
import {AppModule} from "../../app.module";

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

});
