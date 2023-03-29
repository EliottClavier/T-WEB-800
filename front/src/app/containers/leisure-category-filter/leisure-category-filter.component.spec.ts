import {LeisureCategoryFilterComponent} from './leisure-category-filter.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {RadioButtonComponent} from "../../components/inputs/radio-button/radio-button.component";

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

});
