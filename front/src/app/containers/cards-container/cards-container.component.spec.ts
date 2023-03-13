import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {CardsContainerComponent} from "./cards-container.component";
import {ItemModel} from "../../models/item.model";
import {AppModule} from "../../app.module";
import {LocationService} from "../../services/location/location.service";
import {BarService} from "../../services/bar-service/bar.service";
import {SearchInputComponent} from "../../components/inputs/search-input/search-input.component";
import {BehaviorSubject} from "rxjs";
import {Location} from "../../models/location/location.model";

describe('Card container', () => {
  let spectator: Spectator<CardsContainerComponent>;
  let cardsItem: ItemModel[];
  let component: CardsContainerComponent;
  let barService: BarService;

  const createComponent = createComponentFactory({
    component: CardsContainerComponent,
    imports: [AppModule],
    providers: [BarService],
  });


  describe('should fetch bar service to get data', () => {

    beforeEach(() => {
      spectator = createComponent();
      component = spectator.component;
      barService = spectator.inject(BarService);

      cardsItem = new Array<ItemModel>();
      for (let i = 0; i < 3; i++) {
        cardsItem.push(new ItemModel());
      }

      // spyOn LocationService.getLocations() to mock API Call
      // spyOn<LocationService, any>(_locationService, "getLocationsBySearch").and.callFake((search: string) => {
      //   return new BehaviorSubject<Location[]>(testLocationOptions.filter(
      //     (location: Location) => location.getName.toLowerCase().startsWith(search.toLowerCase()))
      //   );
      // });

      spectator.detectChanges()


    });

    it('should have BarService injected', () => {
      expect(component["_barService"]).toBeDefined();
      expect(component["_barService"]).toBeTruthy();
      expect(component["_barService"]).toEqual(barService);

    });
    it('should get data from BarService', () => {


    });
  });
});
