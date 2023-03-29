import {RadioButtonComponent} from './radio-button.component'
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {
  LeisureCategoryFilterComponent
} from "../../../containers/leisure-category-filter/leisure-category-filter.component";
import {AppModule} from "../../../app.module";
import {LegacyCanUpdateErrorState} from "@angular/material/legacy-core";

describe('RadioButtonComponent', () => {
  let spectator: Spectator<RadioButtonComponent>;
  let component: RadioButtonComponent;
  let parentComponent: LeisureCategoryFilterComponent;

  const createComponent = createComponentFactory({
    component: RadioButtonComponent,
    imports: [AppModule],
    providers: [LeisureCategoryFilterComponent],
    declarations: [
      LeisureCategoryFilterComponent,

    ]
  });


  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    parentComponent = spectator.inject(LeisureCategoryFilterComponent);
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });


  it('Should have a list of label for radio button', () => {
    expect(component.radioLabelList).toBeDefined();
  });

  it('Should display a list of radio button', () => {
    spectator.setInput("radioLabelList", ["test1", "test2"]);
    expect(spectator.queryAll("[data-cy-radio-button-item]").length).toEqual(2);
  });

  it('Should emit selected option', async () => {

   spectator.setInput("radioLabelList", ["test1", "test2"]);

    let emitted: string ="";
    let emitted2: string ="";
    component.selectedOptionChange.subscribe((event: string) => {
      emitted = event;
      expect(emitted).toBe("test1");
    });
    parentComponent.onSelectedCategory.subscribe((event: string) => {
      emitted2 = event;
      expect(emitted).toBe("test1");
    });
    spectator.click("#item-0");
    spectator.detectChanges();



    spectator.detectChanges();

    expect(component.selectedOption).toBe("test1");


  });

})
