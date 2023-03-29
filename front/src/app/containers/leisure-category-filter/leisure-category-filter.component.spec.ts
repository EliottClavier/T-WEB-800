import {LeisureCategoryFilterComponent} from './leisure-category-filter.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {RadioButtonComponent} from "../../components/inputs/radio-button/radio-button.component";
import {LeisureCategory} from "../../enums/leisure-category";

describe('LeisureCategoryFilterComponent', () => {
  let spectator: Spectator<LeisureCategoryFilterComponent>;
  let component: LeisureCategoryFilterComponent;
  let radioButtonSpectator: RadioButtonComponent ;

  const createComponent = createComponentFactory({
    component: LeisureCategoryFilterComponent,
    imports: [AppModule],
     declarations: [RadioButtonComponent]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    radioButtonSpectator = spectator.query(RadioButtonComponent)!;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a list of leisure category', () => {
    expect(component.leisureCategoryList).toBeDefined();
    expect(component.leisureCategoryList.length).toBeGreaterThan(0);
  });

  it('should call the onSelectedLeisureCategory function when a radio button is clicked', async () => {
;
    const spy = await spyOn<LeisureCategoryFilterComponent,any>(spectator.component, 'onSelectedLeisureCategory').and.callThrough();
    spectator.detectChanges();

    radioButtonSpectator.selectedOptionChange.emit();

    spectator.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('Should emit selected bars category', async () => {
    let emitted: LeisureCategory = LeisureCategory.BAR
    component.onSelectedCategory.subscribe((event: LeisureCategory) => {
      emitted = event;
      expect(emitted).toBe(LeisureCategory.BAR);
    });
    component.onSelectedLeisureCategory(0);
  });
  it('Should emit selected accommodation category', async () => {
    let emitted: LeisureCategory = LeisureCategory.ACCOMMODATION
    component.onSelectedCategory.subscribe((event: LeisureCategory) => {
      emitted = event;
      expect(emitted).toBe(LeisureCategory.ACCOMMODATION);
    });
    component.onSelectedLeisureCategory(2);
  });
  it('Should emit selected restaurant category', async () => {
    let emitted: LeisureCategory = LeisureCategory.RESTAURANT
    component.onSelectedCategory.subscribe((event: LeisureCategory) => {
      emitted = event;
      expect(emitted).toBe(LeisureCategory.RESTAURANT);
    });
    component.onSelectedLeisureCategory(1);
  });
  it('Should emit selected sport category', async () => {
    let emitted: LeisureCategory = LeisureCategory.SPORTING_EVENT
    component.onSelectedCategory.subscribe((event: LeisureCategory) => {
      emitted = event;
      expect(emitted).toBe(LeisureCategory.SPORTING_EVENT);
    });
    component.onSelectedLeisureCategory(4);
  });
  it('Should emit selected cultural category', async () => {
    let emitted: LeisureCategory = LeisureCategory.CULTURAL_EVENT
    component.onSelectedCategory.subscribe((event: LeisureCategory) => {
      emitted = event;
      expect(emitted).toBe(LeisureCategory.CULTURAL_EVENT);
    });
    component.onSelectedLeisureCategory(3);
  });


});
