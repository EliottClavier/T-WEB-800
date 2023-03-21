import {CardItemsListComponent} from './card-items-list.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {LeisureItemModel} from "../../models/Leisure/leisure.item.model";
import {AppModule} from "../../app.module";
import {TranslateService} from "@ngx-translate/core";


describe('CardItemsComponent', () => {
  let spectator: Spectator<CardItemsListComponent>;
  let threeCardItems: LeisureItemModel[];
  let component : CardItemsListComponent;

  const createComponent = createComponentFactory({
    component: CardItemsListComponent,
    imports: [ AppModule,],
    providers: [TranslateService],
  });
  beforeEach( () => {
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

    it('should display 3 items elements', () => {
      spectator.setInput('cardItems', threeCardItems);

      expect(spectator.queryAll('[data-cy-card-component]').length).toEqual(3);
    });
    it('should display empty message if array elements is empty', () => {

      const translateService = spectator.inject(TranslateService);
      spectator.setInput('cardItems', [] as LeisureItemModel[]);

      expect(spectator.query('[data-cy-card-component-empty]')).toHaveText(translateService.instant('nothing_to_display'));
    });


  });
});
