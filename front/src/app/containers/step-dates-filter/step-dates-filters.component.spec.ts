import { StepDatesFiltersComponent } from './step-dates-filters.component'
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";

describe('MapFiltersComponent', () => {
  let component: StepDatesFiltersComponent;
  let spectator: Spectator<StepDatesFiltersComponent>;
  const createComponent = createComponentFactory({
    component: StepDatesFiltersComponent,
    declarations: [
      StepDatesFiltersComponent
    ],
    imports: [
      AppModule,
    ],
    schemas: [
      NO_ERRORS_SCHEMA
    ],
  });

  beforeEach(async () => {
    spectator = await createComponent();
    component = spectator.component;
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a date-range filter', () => {
    expect(spectator.query('app-date-range[filter-date-range]')).toBeTruthy();
  });

  it('should have base selectedSearchForm attribute gotten from parent component', () => {
    expect(component.selectedSearchForm).toBeDefined();
    expect(component.selectedSearchForm).toBeInstanceOf(FormGroup);
  });
})
