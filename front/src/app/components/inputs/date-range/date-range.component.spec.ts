import { DateRangeComponent } from './date-range.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../../app.module";
import {FormControl, FormGroup} from "@angular/forms";

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let spectator: Spectator<DateRangeComponent>;

  const createComponent = createComponentFactory({
    component: DateRangeComponent,
    imports: [ AppModule ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have base dateRange FormGroup defined', () => {
    expect(component.dateRange).toBeInstanceOf(FormGroup);
  });

  it('should have base start FormControl defined in dateRange FormGroup', () => {
    expect(component.dateRange.controls["start"]).toBeInstanceOf(FormControl<Date | null>);
    expect(component.dateRange.controls["start"].value).toBeNull();
  });

  it('should have base end FormControl defined in dateRange FormGroup', () => {
    expect(component.dateRange.controls["end"]).toBeInstanceOf(FormControl<Date | null>);
    expect(component.dateRange.controls["end"].value).toBeNull();
  });

  it('should have a main mat-form-field', function () {
    expect(spectator.query("[date-range-form-field]")).toBeTruthy();
  });

  it('should have a mat-label', function () {
    let element: HTMLElement = spectator.query("[date-range-label]")!;
    expect(element).toBeTruthy();
    expect(element).toHaveText("Enter a date range");
  });

  it('should have a mat-date-range-input', function () {
    expect(spectator.query("[date-range-input]")).toBeTruthy();
  });

  it('should have a start input', function () {
    let element: HTMLElement = spectator.query("[date-range-input-start]")!;
    expect(element).toBeTruthy();
    expect(element).toHaveAttribute("matStartDate");
    expect(element.getAttribute("placeholder")).toEqual("Start date");
  });

  it('should have a end input', function () {
    let element: HTMLElement = spectator.query("[date-range-input-end]")!;
    expect(element).toBeTruthy();
    expect(element).toHaveAttribute("matEndDate");
    expect(element.getAttribute("placeholder")).toEqual("End date");
  });

  it('should have a mat-hint', function () {
    let element: HTMLElement = spectator.query("[date-range-hint]")!;
    expect(element).toBeTruthy();
    expect(element).toHaveText("MM/DD/YYYY – MM/DD/YYYY");
  });

  it('should have a mat-datepicker-toggle', function () {
    let element: HTMLElement = spectator.query("[date-range-toggle]")!;
    expect(element).toBeTruthy();
    expect(element).toHaveAttribute("matIconSuffix");
  });

  it('should have a mat-date-range-picker', function () {
    expect(spectator.query("[date-range-picker]")).toBeTruthy();
  });

  // it('should get start date when clicking on mat-date-range-picker', () => {
  //   expect(spectator.query("[date-range-toggle]")!).toBeHidden();
  //   spectator.click(spectator.query("[date-range-picker]")!);
  //   spectator.detectChanges();
  //
  //
  //   console.log(spectator.query("[date-range-picker]")!);
  //   console.log(spectator.query("[date-range-picker]")!.hasAttribute("hidden"));
  //   expect(spectator.query("[date-range-picker]")!).toBeVisible();
  //   expect(component.dateRange.controls["start"].value).toBeDefined();
  //   expect(component.dateRange.controls["start"].value).toBeTruthy();
  // });

});
