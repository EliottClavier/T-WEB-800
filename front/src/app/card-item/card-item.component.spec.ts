import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardItemComponent} from "./card-item.component";
import {MatCardModule} from "@angular/material/card";
import {ComponentFixture, TestBed} from "@angular/core/testing";

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardItemComponent ],
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
  const createComponent = createComponentFactory({
    component: CardItemComponent,
    imports: [MatCardModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should appear as the given mockup a card with title, subtile, description and image', () => {
    expect(spectator.query('[data-cy-card-item]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-title]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-subtitle]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-description]')).toBeTruthy();
    expect(spectator.query('[data-cy-card-item-image]')).toBeTruthy();

  });

  it('should display in card specific title, subtitle, description and image', () => {
    spectator.component.cardItem.title = ' test-title ';
    spectator.component.cardItem.subtitle = 'test-subtitle';
    spectator.component.cardItem.description = 'test-description';
    spectator.component.cardItem.image = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

    spectator.detectChanges();

    expect(spectator.query('[data-cy-card-item-title]')?.textContent?.trim()).toEqual("test-title");
    expect(spectator.query('[data-cy-card-item-subtitle]')?.textContent?.trim()).toEqual('test-subtitle');
    expect(spectator.query('[data-cy-card-item-description]')?.textContent?.trim()).toEqual('test-description');
    expect(spectator.query('[data-cy-card-item-image]')?.getAttribute('src')?.trim()).toEqual('https://material.angular.io/assets/img/examples/shiba2.jpg');

  });
});
