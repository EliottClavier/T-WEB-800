import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {CardItemComponent} from "./card-item.component";
import {MatCardModule} from "@angular/material/card";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CardItem} from "../model/CardItem";

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardItemComponent],
      imports: [MatCardModule],

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

describe('Card Display', () => {
  let spectator: Spectator<CardItemComponent>;
  let cardItem: CardItem;
  const createComponent = createComponentFactory({
    component: CardItemComponent,
    imports: [MatCardModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    cardItem = new CardItem()


  });

  it('should appear as the given mockup a card with title, subtile, description and image', () => {
    expect(spectator.query('[data-cy-card-item]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-title]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-subtitle]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-description]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-image]')).toBeTruthy();

  });

  it('should display in card specific title, subtitle, description and image', () => {


    cardItem.title = ' test-title ';
    cardItem.subtitle = 'test-subtitle';
    cardItem.description = 'test-description';
    cardItem.image = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

    spectator.component['_cardItem'] = cardItem;
    // spectator.setInput('cardItem', cardItem);

    spectator.detectChanges();

    expect(spectator.query('[data-cy-card-item-title]')?.textContent?.trim()).toEqual("test-title");
    expect(spectator.query('[data-cy-card-item-subtitle]')?.textContent?.trim()).toEqual('test-subtitle');
    expect(spectator.query('[data-cy-card-item-description]')?.textContent?.trim()).toEqual('test-description');
    expect(spectator.query('[data-cy-card-item-image]')?.getAttribute('src')?.trim()).toEqual('https://material.angular.io/assets/img/examples/shiba2.jpg');

  });
});
