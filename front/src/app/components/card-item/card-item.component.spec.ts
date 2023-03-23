import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {CardItemComponent} from "./card-item.component";
import {MatCardModule} from "@angular/material/card";
import {LeisureItemModel} from "../../models/Leisure/leisure.item.model";
import {LeisureCategory} from "../../enums/leisure-category";

describe('CardItemComponent', () => {
  let spectator: Spectator<CardItemComponent>;
  let cardItem: LeisureItemModel;
  let component : CardItemComponent;
  const createComponent = createComponentFactory({
    component: CardItemComponent,
    imports: [MatCardModule],
  });

  beforeEach( () => {
    spectator = createComponent();
    component = spectator.component;
    cardItem = new LeisureItemModel()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Card Display', () => {

    it('should appear as the given mockup a card with title, subtile and image', () => {
      expect(spectator.query('[data-cy-card-item]')).toBeTruthy();
      expect(spectator.query('[data-cy-card-item-title]')).toBeTruthy();
      expect(spectator.query('[data-cy-card-item-subtitle]')).toBeTruthy();
      expect(spectator.query('[data-cy-card-item-image]')).toBeTruthy();

    });

    it('should display in card specific title, subtitle and image', () => {

      InitializeCardValue(cardItem, spectator);

      expect(spectator.query('[data-cy-card-item-title]')).toHaveText("test-title");
      expect(spectator.query('[data-cy-card-item-subtitle]')).toHaveText('test-subtitle');
      expect(spectator.query('[data-cy-card-item-image]')?.getAttribute('src')?.trim()).toEqual('https://material.angular.io/assets/img/examples/shiba2.jpg');

    });
  });

  describe('Card Interaction', () => {

    it('should emit event when click on item', () => {
      InitializeCardValue(cardItem, spectator);
      const spy = spyOn(spectator.component, 'onClickItem');
      spectator.click('[data-cy-card-item]');
      expect(spy).toHaveBeenCalled();
    });

    it('should emit the correct value when button is clicked', () => {
      InitializeCardValue(cardItem, spectator);
      ;
      let emittedValue: LeisureItemModel = new LeisureItemModel();

      spectator.component.onItem.subscribe((val) => (emittedValue = val));

      spectator.click('[data-cy-card-item]');
      expect(emittedValue).toEqual(cardItem);
    });
  });
});

function InitializeCardValue(cardItem: LeisureItemModel, spectator: Spectator<CardItemComponent>) {
  cardItem.title = ' test-title ';
  cardItem.subtitle = 'test-subtitle';
  cardItem.description = 'test-description';
  cardItem.image = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
  cardItem.category = LeisureCategory.ACCOMMODATION;

  spectator.setInput('cardItem', cardItem);

  spectator.detectChanges();
}
