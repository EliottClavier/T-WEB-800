import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {CardsContainerComponent} from "./cards-container.component";
import {LeisureItemModel} from "../../models/Leisure/leisure.item.model";
import {AppModule} from "../../app.module";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {of} from "rxjs";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";
import {TranslateService} from "@ngx-translate/core";

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

    const createComponent = createComponentFactory({
      component: CardsContainerComponent,
      imports: [AppModule],
      providers: [
        SuggestionsService,
        TranslateService,
        {
          provide: SuggestionsStoreService,
          useValue: { suggestions$ : of(barItems)}
        }
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

      it('should have SuggestionsStore injected', () => {
        expect(component["_suggestionsStore"]).toBeDefined();
        expect(component["_suggestionsStore"]).toBeTruthy();
        expect(component["_suggestionsStore"]).toEqual(store);

      });

      it('should get suggestionItem from SuggestionsService when data store updated', () => {

        spyOn(store.suggestions$, 'subscribe').and.callThrough();
        spectator.component.subscribeItems();
        spectator.detectChanges();

        expect(store.suggestions$.subscribe).toHaveBeenCalled();
        expect(spectator.component.suggests).toEqual(barItems);

      });

      describe('Card container displaying', () => {

          it('should display the leisure item category', () => {
            const translateService = spectator.inject(TranslateService);
            expect(spectator.query('[data-cy-item-category]')).toHaveText(translateService.instant('accommodations_leisure_accommodations'));
          });

      });
    });
  });
