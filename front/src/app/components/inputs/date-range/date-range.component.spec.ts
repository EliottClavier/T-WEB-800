import { DateRangeComponent } from './date-range.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {fakeAsync, tick} from "@angular/core/testing";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let spectator: Spectator<DateRangeComponent>;

  const createComponent = createComponentFactory({
    component: DateRangeComponent,
    imports: [
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      FormsModule
    ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have base searchForm attribute gotten from parent component', () => {
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm).toBeInstanceOf(FormGroup);
  });

  it('should have base locationSearch FormControl inside searchForm FormGroup with base value', () => {
    expect(component.searchForm.get("start")).toBeDefined();
    expect(component.searchForm.get("start")).toBeInstanceOf(FormControl<Date | null>);
    expect(component.searchForm.get("start")!.value).toEqual(null);
  });

  it('should have base end FormControl inside searchForm FormGroup with base value', () => {
    expect(component.searchForm.get("end")).toBeDefined();
    expect(component.searchForm.get("end")).toBeInstanceOf(FormControl<Date | null>);
    expect(component.searchForm.get("end")!.value).toEqual(null);
  });

  it('should have a main mat-form-field', function () {
    expect(spectator.query("[date-range-form-field]")).toBeTruthy();
  });

  it('should have a mat-label', function () {
    let element: HTMLElement = spectator.query("[date-range-label]")!;
    expect(element).toBeTruthy();
    expect(element).toHaveText("MM/DD/YYYY – MM/DD/YYYY");
  });

  it('should have a mat-date-range-input', function () {
    expect(spectator.query("mat-date-range-input[date-range-input]")).toBeTruthy();
  });

  it('should have a start input', function () {
    let element: HTMLElement = spectator.query("input[date-range-input-start]")!;
    expect(element).toBeTruthy();
    expect(element).toHaveAttribute("matStartDate");
    expect(element.getAttribute("placeholder")).toEqual("Start date");
  });

  it('should have a end input', function () {
    let element: HTMLElement = spectator.query("input[date-range-input-end]")!;
    expect(element).toBeTruthy();
    expect(element).toHaveAttribute("matEndDate");
    expect(element.getAttribute("placeholder")).toEqual("End date");
  });

  it('should have a mat-datepicker-toggle', function () {
    let element: HTMLElement = spectator.query("mat-datepicker-toggle[date-range-toggle]")!;
    expect(element).toBeTruthy();
    expect(element).toHaveAttribute("matIconSuffix");
  });

  it('should have a mat-date-range-picker', function () {
    expect(spectator.query("mat-date-range-picker[date-range-picker]")).toBeTruthy();
  });

  it('should not have a mat-error', function () {
    expect(spectator.query("mat-error[date-range-picker-error]")).toBeFalsy();
  });

  it('should get start date when inputting in start input', () => {
    const dateString: string = '2023-01-01';

    const input: HTMLInputElement = spectator.query('[date-range-input-start]')!;
    spectator.typeInElement(dateString, input);
    spectator.dispatchFakeEvent(input, 'blur');

    expect(component.searchForm.get('start')!.value).toEqual(new Date(dateString));
    expect(spectator.query('[date-picker-mat-error]')).toBeFalsy();
  });

  it('should get null FormControl value when inputting in fake date in start input', () => {
    const fakeDateString: string = 'XX/XX/XX';

    const input: HTMLInputElement = spectator.query('[date-range-input-start]')!;
    spectator.typeInElement(fakeDateString, input);
    spectator.dispatchFakeEvent(input, 'blur');

    expect(component.searchForm.get('start')!.value).toEqual(null);
    expect(spectator.query('[date-range-picker-error]')).toBeTruthy();
  });

  it('should get end date when inputting in start input', () => {
    const dateString: string = '2023-01-15';

    const input: HTMLInputElement = spectator.query('[date-range-input-end]')!;
    spectator.typeInElement(dateString, input);
    spectator.dispatchFakeEvent(input, 'blur');

    expect(component.searchForm.get('end')!.value).toEqual(new Date(dateString));
    expect(spectator.query('[date-range-picker-error]')).toBeFalsy();
  });

  it('should get null FormControl value when inputting in fake date in end input', () => {
    const fakeDateString: string = 'XX/XX/XX';

    const input: HTMLInputElement = spectator.query('[date-range-input-end]')!;
    spectator.typeInElement(fakeDateString, input);
    spectator.dispatchFakeEvent(input, 'blur');

    expect(component.searchForm.get('end')!.value).toEqual(null);
    expect(spectator.query('[date-range-picker-error]')).toBeTruthy();
  });

  it('should select start date from date picker', fakeAsync(() => {
    const toggle: HTMLElement = spectator.query('[date-range-toggle]')!;
    toggle.click();
    tick();
    spectator.detectChanges();

    const dayCells: NodeListOf<HTMLElement> = document.querySelectorAll('.mat-calendar-body-cell');
    const startDateCell: HTMLElement | null = Array.from(dayCells).find(cell => !cell.classList.contains('mat-calendar-body-disabled'))!;
    startDateCell?.click();
    tick();
    spectator.detectChanges();

    const startInput: HTMLInputElement = spectator.query('[date-range-input-start]')!;
    const selectedDate: string = startDateCell!.getAttribute('aria-label')!;
    expect(new Date(startInput.value)).toEqual(new Date(selectedDate));
    expect(component.searchForm.get('start')!.value).toEqual(new Date(selectedDate));
  }));

  it('should reset start date when second date selected if earlier then selected start date', fakeAsync(() => {
    const toggle: HTMLElement = spectator.query('[date-range-toggle]')!;
    toggle.click();
    tick();
    spectator.detectChanges();

    const dayCells: NodeListOf<HTMLElement> = document.querySelectorAll('.mat-calendar-body-cell');
    const filteredDateCells = Array.from(dayCells).filter(cell => !cell.classList.contains('mat-calendar-body-disabled'));
    const startDateCell: HTMLElement | null = filteredDateCells![1];
    const endDateCell: HTMLElement | null = filteredDateCells![0];
    startDateCell?.click();
    endDateCell?.click();
    tick();
    spectator.detectChanges();

    const startInput: HTMLInputElement = spectator.query('[date-range-input-start]')!;
    const endInput: HTMLInputElement = spectator.query('[date-range-input-end]')!;

    const endSelectedDate: string = endDateCell!.getAttribute('aria-label')!;

    expect(new Date(startInput.value)).toEqual(new Date(endSelectedDate));
    expect(endInput.value).toBeFalsy();
    expect(component.searchForm.get('start')!.value).toEqual(new Date(endSelectedDate));
    expect(component.searchForm.get('end')!.value).toEqual(null);
  }));


});
