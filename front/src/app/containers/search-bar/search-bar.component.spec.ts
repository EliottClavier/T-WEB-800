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
import {SimpleIconButtonComponent} from "../../components/buttons/simple-icon-button/simple-icon-button.component";
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {getDateFromIsoString} from "../../utils/date.utils";

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let spectator: Spectator<SearchBarComponent>;
  let _router: Router;

  const createComponent = createComponentFactory({
    component: SearchBarComponent,
    declarations: [
      SearchBarComponent,
      SearchInputComponent,
      DateRangeComponent,
      SimpleButtonComponent,
      SimpleIconButtonComponent
    ],
    imports: [
      HttpClientModule,
      RouterModule,
      RouterTestingModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatInputModule,
      MatIconModule,
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

  describe('Add and remove search bars', () => {

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
      expect(spectator.query("app-simple-icon-button[search-bar-add]")).toBeDefined();
      expect(spectator.query("app-simple-icon-button[search-bar-add] mat-icon[simple-icon]")).toHaveText("add");
    });

    it('should add search bar when search-bar-add button is clicked', () => {
      let length: number = component.searchFormsArrayControls!.length;
      component.multipleSearch = true;
      spectator.detectChanges();

      spyOn(component, 'addSearchBar').and.callThrough();
      spectator.click(spectator.query("app-simple-icon-button[search-bar-add]>[simple-icon-button]")!);
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
      expect(spectator.query("app-simple-icon-button[search-bar-remove]>[simple-icon-button]")!).toBeTruthy();
      expect(spectator.query("app-simple-icon-button[search-bar-remove]>[simple-icon-button]")!).toBeHidden();
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

      expect(spectator.queryAll("app-simple-icon-button[search-bar-remove]").length).toBe(component.searchFormsArrayControls!.length);
      expect(spectator.queryAll("app-simple-icon-button[search-bar-remove]").length).toBeGreaterThan(1);
      spectator.queryAll("app-simple-button[search-bar-remove]").map((button: Element) => {
        expect(button).toHaveText("-");
      });
    });

    it('should remove search bar when a search-bar-remove button is clicked', () => {
      component.multipleSearch = true;
      component.addSearchBar();
      spectator.detectChanges();
      expect(component.searchFormsArrayControls!.length).toBeGreaterThan(1);
      expect(spectator.queryAll("app-simple-icon-button[search-bar-remove]").length).toBeGreaterThan(1);

      spyOn(component, 'removeSearchBar').and.callThrough();
      spectator.click(spectator.queryLast("app-simple-icon-button[search-bar-remove]>[simple-icon-button]")!);
      spectator.detectChanges();
      expect(component.removeSearchBar).toHaveBeenCalled();
      expect(component.searchFormsArrayControls!.length).toBe(1);

      expect(spectator.query("app-simple-icon-button[search-bar-remove]>[simple-icon-button]")).toBeTruthy();
      expect(spectator.query("app-simple-icon-button[search-bar-remove]>[simple-icon-button]")).toBeHidden();
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

  describe('Validate research and redirection', () => {
    let locationName: string = "Paris";
    let start: Date = new Date();
    let end: Date = new Date();

    beforeEach(() => {
      _router = spectator.inject(Router);
      component.searchFormsArray.setControl(0, new FormGroup({
        location: new FormControl(new Location("1", locationName)),
        locationSearch: new FormControl(""),
        start: new FormControl(start),
        end: new FormControl(end),
      }));
      spectator.detectChanges();
    });

    it('should have validate button', () => {
      expect(spectator.query("app-simple-button[search-bar-validate]")).toBeDefined();
      expect(spectator.query("app-simple-button[search-bar-validate]")).toHaveText("Validate");
    });

    it('should submit search when validate button is clicked', () => {
      spyOn(component["_router"], 'navigate').and.stub();
      spyOn(component, 'validate').and.callThrough();

      let button = spectator.query("app-simple-button[search-bar-validate]>[simple-button]")!;
      spectator.click(button);

      expect(button).not.toBeDisabled();
      expect(component.searchForms.invalid).toBeFalse();
      expect(component.validate).toHaveBeenCalled();
    });

    it('should have Router injected', () => {
      expect(component["_router"]).toBeDefined();
      expect(component["_router"]).toBeTruthy();
      expect(component["_router"]).toEqual(_router);
    });

    it('should redirect to explore view with params', () => {
      spyOn(component["_router"], 'navigate').and.stub();

      component.validate();

      expect(component["_router"].navigate).toHaveBeenCalledWith(
        ["/", "explore", locationName],
        {
          queryParams: {
            start: getDateFromIsoString(start),
            end: getDateFromIsoString(end)
          }
        }
      );
    });

    it('should redirect to explore view when validate button is clicked', () => {
      spyOn(component, 'validate').and.callThrough();
      spyOn(component["_router"], 'navigate').and.stub();

      let button = spectator.query("app-simple-button[search-bar-validate]>[simple-button]")!;
      spectator.click(button);

      expect(component.validate).toHaveBeenCalled();
      expect(component["_router"].navigate).toHaveBeenCalledWith(
        ["/", "explore", locationName],
        {
          queryParams: {
            start: getDateFromIsoString(start),
            end: getDateFromIsoString(end)
          }
        }
      );
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

      expect(spectator.queryAll("app-simple-icon-button[search-bar-up]").length).toBe(component.searchFormsArrayControls.length);
      expect(spectator.queryAll("app-simple-icon-button[search-bar-down]").length).toBe(component.searchFormsArrayControls.length);

      expect(spectator.queryAll("app-simple-icon-button[search-bar-up] mat-icon[simple-icon]")).toBeTruthy();
      spectator.queryAll("app-simple-icon-button[search-bar-up] mat-icon[simple-icon]").map((button: Element) => {
        expect(button).toHaveText("arrow_upward");
      });

      expect(spectator.queryAll("app-simple-icon-button[search-bar-down] mat-icon[simple-icon]")).toBeTruthy();
      spectator.queryAll("app-simple-icon-button[search-bar-down] mat-icon[simple-icon]").map((button: Element) => {
        expect(button).toHaveText("arrow_downward");
      });
    });

    it('should have up button not visible when search bar is the first one', () => {
      component.multipleSearch = true;
      component.addSearchBar();
      spectator.detectChanges();

      expect(spectator.queryAll("app-simple-icon-button[search-bar-up]").length).toEqual(component.searchFormsArrayControls.length);
      expect(spectator.query("app-simple-icon-button[search-bar-up]>[simple-icon-button]")).toBeTruthy();
      expect(spectator.query("app-simple-icon-button[search-bar-up]>[simple-icon-button]")).toBeHidden();
    });

    it('should have down button not visible when search bar is the last one', () => {
      component.multipleSearch = true;
      component.addSearchBar();
      spectator.detectChanges();

      expect(spectator.queryAll("app-simple-icon-button[search-bar-down]").length).toEqual(component.searchFormsArrayControls.length);
      expect(spectator.queryLast("app-simple-icon-button[search-bar-down]>[simple-icon-button]")!).toBeTruthy();
      expect(spectator.queryLast("app-simple-icon-button[search-bar-down]>[simple-icon-button]")!).toBeHidden();
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
