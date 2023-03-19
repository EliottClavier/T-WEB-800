import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {CardsContainerComponent} from "./cards-container.component";
import {ItemModel} from "../../models/item/item.model";
import {AppModule} from "../../app.module";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {of} from "rxjs";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";

function getItems(): ItemModel[] {
  let items: ItemModel[] = [];

  for (let i = 0; i < 3; i++) {
    items.push(new ItemModel());
  }
    return items;
  }

  describe('Card container', () => {
    let spectator: Spectator<CardsContainerComponent>;
    let barItems: ItemModel[] = getItems();
    let component: CardsContainerComponent;
    let store: SuggestionsStoreService;
    const createComponent = createComponentFactory({
      component: CardsContainerComponent,
      imports: [AppModule],
      providers: [
        SuggestionsService,
        {
          provide: SuggestionsStoreService,
          useValue: { suggestions : of(barItems)}
        }
      ],
    });


    describe('should fetch suggestions store to get data', () => {

      beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
        store = spectator.inject(SuggestionsStoreService);

        barItems = new Array<ItemModel>();
        for (let i = 0; i < 3; i++) {
          barItems.push(new ItemModel());
        }

        spectator.detectChanges()

      });

      it('should have SuggestionsStore injected', () => {
        expect(component["_suggestionsStore"]).toBeDefined();
        expect(component["_suggestionsStore"]).toBeTruthy();
        expect(component["_suggestionsStore"]).toEqual(store);

      });
      it('should get suggestionItem from SuggestionsService when data store updated', () => {

        spyOn(store.suggestions, 'subscribe').and.callThrough();
        spectator.component.subscribeItems();
        spectator.detectChanges();

        expect(store.suggestions.subscribe).toHaveBeenCalled();
        expect(spectator.component.suggests).toEqual(barItems);

      });

    });
  });
