import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {CardsContainerComponent} from "./cards-container.component";
import {LeisureItemModel} from "../../models/Leisure/leisure.item.model";
import {AppModule} from "../../app.module";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {of} from "rxjs";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";
import {TranslateService} from "@ngx-translate/core";
import {getAccommodationItems} from "../../utils/suggestions-mock.utils";

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
      suggests = component.suggests = getAccommodationItems();
      barItems = new Array<LeisureItemModel>();
      for (let i = 0; i < 3; i++) {
        barItems.push(new LeisureItemModel());
      }


      spectator.detectChanges()

    });
    afterEach(() => {
      // spectator?.component?.unsubscribeItems();
      spectator?.fixture?.destroy();
    });

    it('should have SuggestionsStore injected', () => {
      expect(component.suggestionsStore).toBeDefined();
      expect(component.suggestionsStore).toBeTruthy();
      expect(component.suggestionsStore).toEqual(store);
    });

    it('should get suggestionItem from SuggestionsService when data store updated', () => {

      spyOn(store.suggestions$, 'subscribe').and.callThrough();
      spectator.component.subscribeItems();
      spectator.detectChanges();

      expect(store.suggestions$.subscribe).toHaveBeenCalled();
      expect(spectator.component.suggests).toEqual(barItems);

    });

    describe('Card container displaying', () => {


      it('should display the leisure item category', async () => {

        const translateService = await spectator.inject(TranslateService);

        let categoryString = translateService.instant(suggests[0].categoryTranslateKey().toString())
        // let categoryString = translateService.instant('leisure_category_unknown')
        console.log("salut" + categoryString);
        expect(spectator.query('[data-cy-item-category]')).toHaveText(categoryString || translateService.instant('unknown'));
      });

      it('should display the leisure items', () => {

        expect(spectator.query('[data-cy-items]')).toBeTruthy();
        expect(suggests).toBeTruthy()
      });

      it('should display the "show more" button of leisure items', () => {
        expect(spectator.query('[data-cy-show-more-item-button]')).toBeTruthy();

      });
    });
  });
});
