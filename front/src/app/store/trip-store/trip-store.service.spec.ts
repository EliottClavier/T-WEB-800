import {TripStoreService} from './trip-store.service';
import {createServiceFactory, mockProvider, SpectatorService} from "@ngneat/spectator";
import {SingleSearchBarComponent} from "../../containers/single-search-bar/single-search-bar.component";

describe('TripStoreService', () => {
  let spectator: SpectatorService<TripStoreService>;
  let service: TripStoreService;

  const createService = createServiceFactory<TripStoreService>({
    service: TripStoreService,
    providers: [
      mockProvider(TripStoreService, {}),
      SingleSearchBarComponent]
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
