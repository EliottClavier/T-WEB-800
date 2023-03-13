import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {CardItemComponent} from "./card-item.component";
import {MatCardModule} from "@angular/material/card";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ItemModel} from "../../models/item.model";
import {AppModule} from "../../app.module";

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardItemComponent],
      imports: [MatCardModule, AppModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function InitializeCardValue(cardItem: ItemModel, spectator: Spectator<CardItemComponent>) {
  cardItem.title = ' test-title ';
  cardItem.subtitle = 'test-subtitle';
  cardItem.description = 'test-description';
  cardItem.image = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

  spectator.setInput('cardItem', cardItem);

  spectator.detectChanges();
}

describe('Card Display', () => {
  let spectator: Spectator<CardItemComponent>;
  let cardItem: ItemModel;
  const createComponent = createComponentFactory({
    component: CardItemComponent,
    imports: [MatCardModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    cardItem = new ItemModel()

  });

  it('should appear as the given mockup a card with title, subtile, description and image', () => {
    expect(spectator.query('[data-cy-card-item]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-title]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-subtitle]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-description]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-image]')).toBeTruthy();

  });

  it('should display in card specific title, subtitle, description and image', () => {

    InitializeCardValue(cardItem, spectator);

    expect(spectator.query('[data-cy-card-item-title]')).toHaveText("test-title");
    expect(spectator.query('[data-cy-card-item-subtitle]')).toHaveText('test-subtitle');
    expect(spectator.query('[data-cy-card-item-description]')).toHaveText('test-description');
    expect(spectator.query('[data-cy-card-item-image]')?.getAttribute('src')?.trim()).toEqual('https://material.angular.io/assets/img/examples/shiba2.jpg');

  });
});

describe('Card Interaction', () => {
  let spectator: Spectator<CardItemComponent>;
  let cardItem: ItemModel;
  const createComponent = createComponentFactory({
    component: CardItemComponent,
    imports: [MatCardModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    cardItem = new ItemModel()

  });
  it('should emit event when click on item' , () => {
    InitializeCardValue(cardItem, spectator);
    const spy = spyOn(spectator.component, 'onClickItem');
    spectator.click('[data-cy-card-item]');
    expect(spy).toHaveBeenCalled();
  });

  it('should emit the correct value when button is clicked', () => {
    InitializeCardValue(cardItem, spectator);
    ;
    let emittedValue: ItemModel = new ItemModel();

    spectator.component.onItem.subscribe((val) => (emittedValue = val));

    spectator.click('[data-cy-card-item]');
    expect(emittedValue).toEqual(cardItem);

  });
});
