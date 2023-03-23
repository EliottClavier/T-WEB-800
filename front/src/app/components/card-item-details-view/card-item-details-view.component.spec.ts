import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {MatCardModule} from "@angular/material/card";
import {LeisureItemModel} from "../../models/Leisure/leisure.item.model";
import {CardItemDetailsViewComponent} from "./card-item-details-view.component";
import {getAccommodationItems} from "../../utils/suggestions-mock.utils";

describe('CardItemDetailsViewComponent', () => {
  let spectator: Spectator<CardItemDetailsViewComponent>;
  let component: CardItemDetailsViewComponent;
  const createComponent = createComponentFactory({
    component: CardItemDetailsViewComponent,
    imports: [MatCardModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Details View', () => {
    it('should appear as the given mockup a detail with title, subtile, description and image', () => {
      expect(spectator.query('[data-cy-item-details]')).toBeTruthy();
      expect(spectator.query('[data-cy-item-details-title]')).toBeTruthy();
      expect(spectator.query('[data-cy-item-details-subtitle]')).toBeTruthy();
      expect(spectator.query('[data-cy-item-details-description]')).toBeTruthy();
      expect(spectator.query('[data-cy-item-details-image]')).toBeTruthy();

    });

    it('should display in detail specific title, subtitle, description and image', () => {

      let items = getAccommodationItems();
      items[0].title = "test-title";
      items[0].subtitle = "test-subtitle";
      items[0].description = "test-description";
      items[0].image = "https://material.angular.io/assets/img/examples/shiba2.jpg";
      spectator.setInput('detailsItem', items[0]);

      spectator.detectChanges();

      expect(spectator.query('[data-cy-item-details-title]')).toHaveText("test-title");
      expect(spectator.query('[data-cy-item-details-subtitle]')).toHaveText('test-subtitle');
      expect(spectator.query('[data-cy-item-details-description]')).toHaveText('test-description');
      expect(spectator.query('[data-cy-item-details-image]')?.getAttribute('src')?.trim()).toEqual('https://material.angular.io/assets/img/examples/shiba2.jpg');

    });
  });

});
