import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {CardsContainerComponent} from "./cards-container.component";

import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {AppModule} from "../../app.module";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {of} from "rxjs";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";
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
import {CardItemDetailsViewComponent} from "../../components/card-item-details-view/card-item-details-view.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


describe('Card container', () => {
  let spectator: Spectator<CardsContainerComponent>;
  let barItems: LeisureItemModel[] = getBarItems();
  let component: CardsContainerComponent;
  let store: SuggestionsStoreService;
  let suggestionsService: SuggestionsService;
  let suggests: LeisureItemModel[]
  let accommodationItems: LeisureItemModel[] = getAccommodationItems();

  const dialogMock = {
    close: () => {
    }
  }
  const createComponent = createComponentFactory({
    component: CardsContainerComponent,
    imports: [AppModule],
    declarations: [CardItemsListComponent, CardItemDetailsViewComponent],
    providers: [
      CardItemDetailsViewComponent,

      {provide: MatDialogRef, useValue: dialogMock},
      {provide: MAT_DIALOG_DATA, useValue: new LeisureItemModel()},

      {
        provide: SuggestionsService,
        // useValue: {getSuggestions: ()=> of(barItems)}
      },
      {
        provide: SuggestionsStoreService,
        useValue: {suggestions$: of(barItems)}
      },
      TranslateService,
    ],
  });

  afterEach(() => {
    spectator.fixture.destroy()
  });

  describe('should fetch suggestions store to get data', () => {

    beforeEach(() => {
      spectator = createComponent();

      component = spectator.component;
      store = spectator.inject(SuggestionsStoreService);
      suggestionsService = spectator.inject(SuggestionsService);

      spectator.detectChanges()

    });


    it('should have SuggestionsStore injected', () => {
      expect(component['_suggestionsStore']).toBeDefined();
      expect(component['_suggestionsStore']).toBeTruthy();
      expect(component['_suggestionsStore']).toEqual(store);
    });

    it('should get suggestionItem from SuggestionsService when data store updated', () => {

      let spy = spyOn(store.suggestions$, 'subscribe').and.callThrough();
      spectator.component.subscribeItems();
      spectator.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(spectator.component.suggests).toEqual(getBarItems());

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
        try {

          const itemListComponent = spectator.query(CardItemsListComponent);
          suggests = component.suggests = getAccommodationItems();
          let item = suggests[0];

          let spy = spyOn(component, 'onItemSelected').and.callThrough();

          spectator.setInput({suggests: suggests});
          itemListComponent?.onItemClicked(item);
          expect(spy).toHaveBeenCalledWith(item);
        } catch (e) {
          console.log(e)
        }
      });
      });

      it('should display the item details view when leisure items is selected', () => {
        suggests = getAccommodationItems();
        let item = suggests[0];
        component.onItemSelected(item);

        spectator.detectChanges()
        expect(spectator.query('[data-cy-item-details]')).toBeTruthy();

      });
      it('should hidden the item details view when leisure items is not more selected', () => {
        suggests = getAccommodationItems();
        let item = suggests[0];
        component.onItemSelected(item);

        spectator.detectChanges()
        expect(spectator.query('[data-cy-item-details]')).toBeTruthy();

        component.onCloseDetails();
        spectator.detectChanges()
        expect(spectator.query('[data-cy-item-details]')).toBeFalsy();

      });

      it('should close the item details view when closing emitted', () => {
        suggests = getAccommodationItems();
        let item = suggests[0];
        component.onItemSelected(item);
        spectator.detectChanges();
        let spy = spyOn<CardsContainerComponent, any>(component, 'onCloseDetails').and.callThrough();
        spectator.triggerEventHandler(CardItemDetailsViewComponent, 'onClose', undefined);

        spectator.detectChanges();
        expect(spy).toHaveBeenCalled();
        expect(spectator.query('[data-cy-item-details]')).toBeFalsy();

      });

      it('should display the "show more" button of leisure items', () => {

        expect(spectator.query('[data-cy-show-more-item-button]')).toBeTruthy();

      });

      it('should get the next leisure items when button clicked', () => {
        // component.suggests = getAccommodationItems();
        let items = getBarItems();
        let spy = spyOn(component, 'onShowMoreItems').and.callFake(() => {
        });

        let item = items[0];
        spectator.click('[data-cy-show-more-item-button] [simple-button]');
        spectator.triggerEventHandler('[data-cy-show-more-item-button] [simple-button]', 'click', item);

        expect(spy).toHaveBeenCalled();
        spectator.detectChanges();
        expect(spectator.component.suggests).toEqual(items);
      });
      it('should get LeisureItems when OnShowMoreItems called', () => {
        expect(spectator.component.onShowMoreItems).toBeDefined();
        let spy = spyOn(component, 'onShowMoreItems').and.callThrough();
        let spy2 = spyOn(suggestionsService, 'getSuggestions').and.returnValue(of(barItems));
        suggestionsService.getSuggestions(accommodationItems[0].category, accommodationItems[0].location, "", "").subscribe((suggestions) => {
          expect(suggestions).toEqual(barItems);
        });
        component.onShowMoreItems();
        expect(spy).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
      });


      it('should set _itemSelected', () => {

        let item = getBarItems()[0];
        component.itemsSelected = item;
        expect(component.itemsSelected).toEqual(item);

      });
      it('should set translateService', () => {
        let translateService = spectator.inject(TranslateService);
        component.translateService = translateService;
        expect(component.translateService).toEqual(translateService);
      });
    });
    // it('should emit a add leisure item event when clicking on the add leisure item button', () => {
    //   let item = getBarItems()[0];
    //   component.itemsSelected = item;
    //
    //    let spy = spyOn<CardsContainerComponent, any>(component, 'onAddStepItem').and.callThrough();
    //   const childComponent = spectator.inject(CardItemDetailsViewComponent);
    //   let spyChild = spyOn<CardItemDetailsViewComponent, any>(childComponent, 'onAddItemToTrip').and.callThrough();
    //   spectator.detectChanges();
    //   childComponent.detailsItem = item;
    //   expect(childComponent).toBeTruthy();
    //   childComponent?.onAddItemToTrip(item);
    //   expect(spyChild).toHaveBeenCalledWith(item);
    //   expect(spectator.query('[data-cy-item-details]')).toBeTruthy();
    //
    //   spectator.detectChanges();
    //   expect(childComponent).toBeTruthy();
    //   component.itemsSelected = item;
    //   spectator.detectChanges();
    //   expect(component.onAddStepItem).toHaveBeenCalled();
    //   //   expect(spy).toHaveBeenCalledWith(item);
    // });
  // });
});

