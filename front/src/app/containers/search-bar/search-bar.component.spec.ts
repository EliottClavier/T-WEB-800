import { SearchBarComponent } from './search-bar.component';
import {SearchInputComponent} from "../../components/inputs/search-input/search-input.component";
import {DateRangeComponent} from "../../components/inputs/date-range/date-range.component";
import {SimpleButtonComponent} from "../../components/buttons/simple-button/simple-button.component";
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {Location} from "../../models/location/location.model";
import {By} from "@angular/platform-browser";

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let spectator: Spectator<SearchBarComponent>;

  const createComponent = createComponentFactory({
    component: SearchBarComponent,
    declarations: [
      SearchBarComponent,
      SearchInputComponent,
      DateRangeComponent,
      SimpleButtonComponent
    ],
    imports: [
      HttpClientModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatInputModule,
      MatNativeDateModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      FormsModule
    ]
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    spectator.detectChanges();
  });

  const getSimpleButtonComponent = (selector: string, index: number = 0): SimpleButtonComponent => {
    const lastDownButton = spectator.debugElement.queryAll(By.css(selector))[index];
    return lastDownButton.componentInstance as SimpleButtonComponent;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have searchForms attribute with FormGroup initialized', () => {
    expect(component.searchForms).toBeDefined();
    expect(component.searchForms).toBeInstanceOf(FormGroup);
  });

  it('should have searchFormsArray FormArray inside searchForms FormGroup', () => {
    expect(component.searchFormsArray).toBeDefined();
    expect(component.searchFormsArray).toBeInstanceOf(FormArray);
    expect(component.searchFormsArray!.value).toBeInstanceOf(Array<FormGroup>);
  });

  it('should have searchFormsArray FormArray initialized with one FormGroup', () => {
    expect(component.searchFormsArrayControls!.length).toBe(1);
  });

  describe('And and remove search bars', () => {

    it('should add a search bar to searchFormsArray', () => {
      component.addSearchBar();
      expect(component.searchFormsArrayControls!.length).toBe(2);
    });

    it('should remove a search bar to searchFormsArray', () => {
      component.searchFormsArray.push(new FormGroup({}));
      expect(component.searchFormsArrayControls!.length).toBe(2);
      let index: number = Math.floor(Math.random() * component.searchFormsArrayControls.length);
      component.removeSearchBar(index);
      expect(component.searchFormsArrayControls!.length).toBe(1);
    });

    it('should not remove search bar in searchFormsArray if there is only one available', () => {
      expect(component.searchFormsArrayControls!.length).toBe(1);
      let index: number = Math.floor(Math.random() * component.searchFormsArrayControls.length);
      component.removeSearchBar(index);
      expect(component.searchFormsArrayControls!.length).toBe(1);
    });

    it('should not have add search bar button when multipleSearch is false', () => {
      component.multipleSearch = false;
      spectator.detectChanges();
      expect(spectator.query("app-simple-button[search-bar-add]")).toBeFalsy();
    });

    it('should have add search bar button when multipleSearch is true', () => {
      component.multipleSearch = true;
      spectator.detectChanges();
      expect(spectator.query("app-simple-button[search-bar-add]")).toBeDefined();
      expect(spectator.query("app-simple-button[search-bar-add]")).toHaveText("+");
    });

    it('should add search bar when search-bar-add button is clicked', () => {
      let length: number = component.searchFormsArrayControls!.length;
      component.multipleSearch = true;
      spectator.detectChanges();

      spyOn(component, 'addSearchBar').and.callThrough();
      spectator.click(spectator.query("app-simple-button[search-bar-add]")!);
      spectator.detectChanges();
      expect(component.addSearchBar).toHaveBeenCalled();
      expect(spectator.queryAll("div[search-bars]").length).toBe(length + 1);
    });

    it('should not have remove search bar button when there is only one search bar', () => {
      expect(component.searchFormsArrayControls!.length).toBe(1);
      expect(spectator.query("app-simple-button[search-bar-remove]")).toBeFalsy();
    });

    it('should have hidden remove search bar when there is only one search bar and multiple is on', () => {
      component.multipleSearch = true;
      spectator.detectChanges();
      expect(component.searchFormsArrayControls!.length).toBe(1);

      const buttonComponent: SimpleButtonComponent = getSimpleButtonComponent("app-simple-button[search-bar-remove]");
      expect(buttonComponent.isHidden).toBeTrue();
    });

    it('should not have remove search bar button when there is only one search bar and multiple is off', () => {
      component.multipleSearch = false;
      spectator.detectChanges();
      expect(component.searchFormsArrayControls!.length).toBe(1);
      expect(spectator.query("app-simple-button[search-bar-remove]")).toBeFalsy();
    });

    it('should have remove search bar button for each search bar when there are multiple search bar', () => {
      component.multipleSearch = true;
      component.addSearchBar();
      spectator.detectChanges();

      expect(spectator.queryAll("app-simple-button[search-bar-remove]").length).toBe(component.searchFormsArrayControls!.length);
      expect(spectator.queryAll("app-simple-button[search-bar-remove]").length).toBeGreaterThan(1);
      spectator.queryAll("app-simple-button[search-bar-remove]").map((button: Element) => {
        expect(button).toHaveText("-");
      });
    });

    it('should remove search bar when a search-bar-remove button is clicked', () => {
      component.multipleSearch = true;
      component.addSearchBar();
      spectator.detectChanges();
      expect(component.searchFormsArrayControls!.length).toBeGreaterThan(1);
      expect(spectator.queryAll("app-simple-button[search-bar-remove]").length).toBeGreaterThan(1);

      spyOn(component, 'removeSearchBar').and.callThrough();
      spectator.click(spectator.queryLast("app-simple-button[search-bar-remove]")!);
      spectator.detectChanges();
      expect(component.removeSearchBar).toHaveBeenCalled();
      expect(component.searchFormsArrayControls!.length).toBe(1);

      const buttonComponent: SimpleButtonComponent = getSimpleButtonComponent("app-simple-button[search-bar-remove]");
      expect(buttonComponent.isHidden).toBeTrue();
    });

  });

  describe('Search bars display', () => {

    it('should have divs rendered in a ngFor looping over searchFormsArray', () => {
      let length: number = component.searchFormsArrayControls.length;
      expect(spectator.queryAll("div[search-bars]").length).toBe(length);
      component.addSearchBar();
      spectator.detectChanges();
      expect(spectator.queryAll("div[search-bars]").length).toBe(length + 1);

      component.removeSearchBar(Math.floor(Math.random() * component.searchFormsArrayControls.length));
      spectator.detectChanges();
      expect(spectator.queryAll("div[search-bars]").length).toBe(length);
    });

  });

  describe('Validate research', () => {

    it('should have validate button', () => {
      expect(spectator.query("app-simple-button[search-bar-validate]")).toBeDefined();
      expect(spectator.query("app-simple-button[search-bar-validate]")).toHaveText("Validate");
    });

    it('should submit search when validate button is clicked', () => {
      component.searchFormsArray.setControl(0, new FormGroup({
        location: new FormControl(new Location("1", "France")),
        locationSearch: new FormControl(""),
        start: new FormControl(new Date()),
        end: new FormControl(new Date()),
      }));
      spectator.detectChanges();

      spyOn(component, 'validate').and.callThrough();

      const buttonComponent: SimpleButtonComponent = getSimpleButtonComponent("app-simple-button[search-bar-validate]");
      buttonComponent.onClickButton();
      expect(buttonComponent.isDisabled).toBeFalse();
      expect(component.searchForms.invalid).toBeFalse();
      expect(component.validate).toHaveBeenCalled();
    });

  });

  describe('Up and down buttons', () => {

    let length: number;

    beforeEach(() => {
      component.addSearchBar();
      component.addSearchBar();
      spectator.detectChanges();

      expect(component.searchFormsArrayControls.length).toEqual(3);
      length = component.searchFormsArrayControls.length;

      ["Lyon", "Paris", "Nantes"].map((name: string, index: number) => {
        component.searchFormsArrayControls[index].value["location"] = new Location(String(index), name);
      });
    });

    it('should have up and down buttons for each search bar when there are multiple search bar', () => {
      component.multipleSearch = true;
      component.addSearchBar();
      spectator.detectChanges();

      expect(spectator.queryAll("app-simple-button[search-bar-up]").length).toBe(component.searchFormsArrayControls.length);
      expect(spectator.queryAll("app-simple-button[search-bar-down]").length).toBe(component.searchFormsArrayControls.length);

      spectator.queryAll("app-simple-button[search-bar-up]").map((button: Element) => {
        expect(button).toHaveText("Up");
      });

      spectator.queryAll("app-simple-button[search-bar-down]").map((button: Element) => {
        expect(button).toHaveText("Down");
      });
    });

    it('should have up button not visible when search bar is the first one', () => {
      component.multipleSearch = true;
      component.addSearchBar();
      spectator.detectChanges();

      expect(spectator.queryAll("app-simple-button[search-bar-up]").length).toEqual(component.searchFormsArrayControls.length);
      const buttonComponent: SimpleButtonComponent = getSimpleButtonComponent("app-simple-button[search-bar-up]");
      expect(buttonComponent.isHidden).toBeTrue();
    });

    it('should have down button not visible when search bar is the last one', () => {
      component.multipleSearch = true;
      component.addSearchBar();
      spectator.detectChanges();

      expect(spectator.queryAll("app-simple-button[search-bar-down]").length).toEqual(component.searchFormsArrayControls.length);
      const buttonComponent: SimpleButtonComponent = getSimpleButtonComponent("app-simple-button[search-bar-down]", component.searchFormsArrayControls.length - 1);
      expect(buttonComponent.isHidden).toBeTrue();
    });

    it('should move search bar up in FormArray', () => {
      component.moveSearchBar(length - 1, false);

      ["Lyon", "Nantes", "Paris"].map((name: string, index: number) => {
        expect(component.searchFormsArrayControls[index].value["location"]!.name).toEqual(name);
      });
    });

    it('should do nothing when moving down while the search bar is already at the bottom', () => {
      component.moveSearchBar(length - 1, true);

      ["Lyon", "Paris", "Nantes"].map((name: string, index: number) => {
        expect(component.searchFormsArrayControls[index].value["location"]!.name).toEqual(name);
      });
    });

    it('should move search bar down in FormArray', () => {
      component.moveSearchBar(length - 3, true);

      ["Paris", "Lyon", "Nantes"].map((name: string, index: number) => {
        expect(component.searchFormsArrayControls[index].value["location"]!.name).toEqual(name);
      });
    });

    it('should do nothing when moving up while the search bar is already at the top', () => {
      component.moveSearchBar(length - 3, false);

      ["Lyon", "Paris", "Nantes"].map((name: string, index: number) => {
        expect(component.searchFormsArrayControls[index].value["location"]!.name).toEqual(name);
      });
    });

  });

});
