import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {CardsContainerComponent} from "./cards-container.component";

import {LeisureItemModel} from "../../models/Leisure/leisure.item.model";
import {AppModule} from "../../app.module";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {of} from "rxjs";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";
import {TranslateService} from "@ngx-translate/core";
import {
  getAccommodationItems,
  getBarItems,
  getCulturalItems,
  getRestaurantItems,
  getSportingItems,
  getUnknownItems
} from "../../utils/suggestions-mock.utils";
import {CardItemsListComponent} from "../../components/card-items-list/card-items-list.component";


function getItems(): LeisureItemModel[] {
  let items: LeisureItemModel[] = [];

  for (let i = 0; i < 3; i++) {
    items.push(new LeisureItemModel());
  }
  return items;
}

describe('Card container', () => {
  let spectator: Spectator<CardsContainerComponent>;
  let barItems: LeisureItemModel[] = getItems();
  let component: CardsContainerComponent;
  let store: SuggestionsStoreService;
  let suggests: LeisureItemModel[]
  const createComponent = createComponentFactory({
    component: CardsContainerComponent,
    imports: [AppModule],
    declarations: [CardItemsListComponent],
    componentProviders: [
      {
        provide: CardItemsListComponent,
        useValue: {
          outputEvent: {
            emit: jasmine.createSpy('emit')
          }
        }
      }],
    providers: [
      SuggestionsService,
      {
        provide: SuggestionsStoreService,
        useValue: {suggestions$: of(barItems)}
      },
      TranslateService,
    ],
  });

  describe('should fetch suggestions store to get data', () => {

    beforeEach(() => {
      spectator = createComponent();

      component = spectator.component;
      store = spectator.inject(SuggestionsStoreService);

      barItems = new Array<LeisureItemModel>();
      for (let i = 0; i < 3; i++) {
        barItems.push(new LeisureItemModel());
      }


      spectator.detectChanges()

    });
    afterEach(() => {
      spectator?.fixture?.destroy();
    });

    it('should have SuggestionsStore injected', () => {
      expect(component['_suggestionsStore']).toBeDefined();
      expect(component['_suggestionsStore']).toBeTruthy();
      expect(component['_suggestionsStore']).toEqual(store);
    });

    it('should get suggestionItem from SuggestionsService when data store updated', () => {

      spyOn(store.suggestions$, 'subscribe').and.callThrough();
      spectator.component.subscribeItems();
      spectator.detectChanges();

      expect(store.suggestions$.subscribe).toHaveBeenCalled();
      expect(spectator.component.suggests).toEqual(barItems);

    });

    describe('Card container displaying', () => {


      it('should display the accommodation item category', async () => {
        suggests = component.suggests = getAccommodationItems();
        const translateService = await spectator.inject(TranslateService);
        let categoryString = translateService.instant(suggests[0].categoryTranslateKey().toString())
        spectator.detectChanges();
        expect(spectator.query('[data-cy-item-category]')).toHaveText(categoryString);
      });

      it('should display the bar item category', async () => {
        suggests = component.suggests = getBarItems();
        const translateService = await spectator.inject(TranslateService);
        let categoryString = translateService.instant(suggests[0].categoryTranslateKey().toString())
        spectator.detectChanges();
        expect(spectator.query('[data-cy-item-category]')).toHaveText(categoryString);
      });

      it('should display the Restaurent item category', async () => {
        suggests = component.suggests = getRestaurantItems();
        const translateService = await spectator.inject(TranslateService);
        let categoryString = translateService.instant(suggests[0].categoryTranslateKey().toString())
        spectator.detectChanges();
        expect(spectator.query('[data-cy-item-category]')).toHaveText(categoryString);
      });

      it('should display the Sporting item category', async () => {
        suggests = component.suggests = getSportingItems();
        const translateService = await spectator.inject(TranslateService);
        let categoryString = translateService.instant(suggests[0].categoryTranslateKey().toString())
        spectator.detectChanges();
        expect(spectator.query('[data-cy-item-category]')).toHaveText(categoryString);
      });

      it('should display the Cultural item category', async () => {
        suggests = component.suggests = getCulturalItems();
        const translateService = await spectator.inject(TranslateService);
        let categoryString = translateService.instant(suggests[0].categoryTranslateKey().toString())
        spectator.detectChanges();
        expect(spectator.query('[data-cy-item-category]')).toHaveText(categoryString);
      });

      it('should display the unknown item category', async () => {
        suggests = component.suggests = getUnknownItems();
        const translateService = await spectator.inject(TranslateService);
        let categoryString = translateService.instant(suggests[0].categoryTranslateKey().toString())
        spectator.detectChanges();
        expect(spectator.query('[data-cy-item-category]')).toHaveText(categoryString);
      });

      it('should display the leisure items', () => {
        suggests = component.suggests = getAccommodationItems();
        spectator.detectChanges();
        expect(spectator.query('[data-cy-items]')).toBeTruthy();
        expect(suggests).toBeTruthy()
      });

      it('should get the item details view when leisure items is clicking', () => {
        const itemListComponent = spectator.query(CardItemsListComponent);
        suggests = component.suggests = getAccommodationItems();
        let item = suggests[0];

        let spy = spyOn(component, 'onSuggestClicking').and.callThrough();

        spectator.setInput({suggests: suggests});
        itemListComponent?.onItemClicked(item);
        expect(spy).toHaveBeenCalledWith(item);

      });

      it('should display the item details view when leisure items is selected', () => {
        suggests = getAccommodationItems();
        let item = suggests[0];
        component.onSuggestClicking(item);

        console.log('item ' + spectator.component.itemsSelected?.category);
        spectator.detectChanges()
        expect(spectator.query('[data-cy-item-details]')).toBeTruthy();

      });
      it('should hidden the item details view when leisure items is not more selected', () => {
        suggests = getAccommodationItems();
        let item = suggests[0];
        component.onSuggestClicking(item);

        console.log('item ' + spectator.component.itemsSelected?.category);
        spectator.detectChanges()
        expect(spectator.query('[data-cy-item-details]')).toBeTruthy();

        component.itemsSelected = undefined;
        spectator.detectChanges()
        expect(spectator.query('[data-cy-item-details]')).toBeFalsy();

      });

      it('should display the "show more" button of leisure items', () => {
        expect(spectator.query('[data-cy-show-more-item-button]')).toBeTruthy();

      });
    });
  });
});

