import {RadioButtonComponent} from './radio-button.component'
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {
  LeisureCategoryFilterComponent
} from "../../../containers/leisure-category-filter/leisure-category-filter.component";
import {AppModule} from "../../../app.module";
import {LegacyCanUpdateErrorState} from "@angular/material/legacy-core";
import {LeisureCategory} from "../../../enums/leisure-category";
import {LeisureItemModel} from "../../../models/leisures/leisure-item.model";

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
    let leisureCategoryList = Object.values(LeisureCategory).map((value) => LeisureItemModel.categoryTranslateKey(value).toString());
    leisureCategoryList = leisureCategoryList.filter((value) => value != "unknown");
   spectator.setInput("radioLabelList", leisureCategoryList);

    let emitted: number = -1;
    let emitted2: number =- 1;
    component.selectedOptionChange.subscribe((event: number) => {
      emitted = event;
      expect(emitted).toBe(0);
    });
    parentComponent.onSelectedCategory.subscribe((event: number) => {

      emitted2 = event;
      expect(emitted).toBe(0);
    });
    spectator.click("#item-0");
    spectator.detectChanges();



    spectator.detectChanges();

    expect(component.selectedOption).toBe(0);


  });

})
