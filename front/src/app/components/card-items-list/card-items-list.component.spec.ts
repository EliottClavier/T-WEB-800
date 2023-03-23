import {CardItemsListComponent} from './card-items-list.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {LeisureItemModel} from "../../models/Leisure/leisure.item.model";
import {AppModule} from "../../app.module";
import {TranslateService} from "@ngx-translate/core";
import {getAccommodationItems} from "../../utils/suggestions-mock.utils";


describe('CardItemsComponent', () => {
  let spectator: Spectator<CardItemsListComponent>;
  let threeCardItems: LeisureItemModel[];
  let component: CardItemsListComponent;

  const createComponent = createComponentFactory({
    component: CardItemsListComponent,
    imports: [AppModule,],
    providers: [TranslateService],
  });
  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('Cards Display', () => {

    beforeEach(() => {
      spectator = createComponent();

      threeCardItems = new Array<LeisureItemModel>();
      for (let i = 0; i < 3; i++) {
        threeCardItems.push(new LeisureItemModel());
      }
    });

    it('should display 6 items elements', () => {
      let items = getAccommodationItems()
      spectator.setInput('cardItems', items);
      spectator.detectChanges();
      let itemsElementsLength = spectator.queryAll('app-card-item').length;
      expect(itemsElementsLength).toEqual(items.length);
    });
    it('should display empty message if array elements is empty', () => {

      const translateService = spectator.inject(TranslateService);
      spectator.setInput('cardItems', [] as LeisureItemModel[]);

      expect(spectator.query('[data-cy-card-component-empty]')).toHaveText(translateService.instant('nothing_to_display'));
    });


  });
});
