import { MultipleSearchBarsComponent } from './multiple-search-bars.component';
import {SearchInputComponent} from "../../components/inputs/search-input/search-input.component";
import {DateRangeComponent} from "../../components/inputs/date-range/date-range.component";
import {SimpleButtonComponent} from "../../components/buttons/simple-button/simple-button.component";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Location} from "../../models/location/location.model";
import {SimpleIconButtonComponent} from "../../components/buttons/simple-icon-button/simple-icon-button.component";
import {Router} from "@angular/router";
import {EventEmitter, NO_ERRORS_SCHEMA} from "@angular/core";
import {AppModule} from "../../app.module";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {SearchBarEvent} from "../../types/search-bar-event.type";

describe('MultipleSearchBarsComponent', () => {
  let component: MultipleSearchBarsComponent;
  let spectator: Spectator<MultipleSearchBarsComponent>;
  let _router: Router;

  const createComponent = createComponentFactory({
    component: MultipleSearchBarsComponent,
    declarations: [
      MultipleSearchBarsComponent,
      SearchInputComponent,
      DateRangeComponent,
      SimpleButtonComponent,
      SimpleIconButtonComponent
    ],
    imports: [
      AppModule
    ],
    schemas: [
      NO_ERRORS_SCHEMA
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

    it('should not add a start date to the new search bar initialized if previous search bar has end date', () => {
      component.addSearchBar();
      spectator.detectChanges();
      let length: number = component.searchFormsArrayControls!.length;
      expect(component.searchFormsArrayControls![length - 1].get('start')!.value).toBeNull();
    });

    it('should add a start date to the new search bar initialized if previous search bar has end date', () => {
      component.lastSearchBar.get('end')!.setValue(new Date());
      component.addSearchBar();
      spectator.detectChanges();
      let length: number = component.searchFormsArrayControls!.length;
      expect(component.searchFormsArrayControls![length - 1].get('start')!.value).toBe(component.searchFormsArrayControls![length - 2].get('end')!.value);
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

    it('should have add search bar button', () => {
      expect(spectator.query("app-simple-icon-button[search-bar-add]")).toBeDefined();
      expect(spectator.query("app-simple-icon-button[search-bar-add] mat-icon[simple-icon]")).toHaveText("add");
    });

    it('should add search bar when search-bar-add button is clicked', () => {
      let length: number = component.searchFormsArrayControls!.length;

      spyOn(component, 'addSearchBar').and.callThrough();
      spectator.click(spectator.query("app-simple-icon-button[search-bar-add] [simple-icon-button]")!);
      spectator.detectChanges();
      expect(component.addSearchBar).toHaveBeenCalled();
      expect(spectator.queryAll("div[search-bars]").length).toBe(length + 1);
    });

    it('should not have remove search bar button when there is only one search bar', () => {
      expect(component.searchFormsArrayControls!.length).toBe(1);
      expect(spectator.query("app-simple-button[search-bar-remove]")).toBeFalsy();
    });

    it('should have disabled remove search bar when there is only one search bar', () => {
      expect(component.searchFormsArrayControls!.length).toBe(1);
      expect(spectator.query("app-simple-icon-button[search-bar-remove] [simple-icon-button]")!).toBeTruthy();
      expect(spectator.query("app-simple-icon-button[search-bar-remove] [simple-icon-button]")!).toBeDisabled();
    });

    it('should have remove search bar button for each search bar when there are multiple search bar', () => {
      component.addSearchBar();
      spectator.detectChanges();

      expect(spectator.queryAll("app-simple-icon-button[search-bar-remove]").length).toBe(component.searchFormsArrayControls!.length);
      expect(spectator.queryAll("app-simple-icon-button[search-bar-remove]").length).toBeGreaterThan(1);
      spectator.queryAll("app-simple-icon-button[search-bar-remove]").map((button: Element) => {
        expect(button).toHaveText("delete");
      });
    });

    it('should remove search bar when a search-bar-remove button is clicked', () => {
      component.addSearchBar();
      spectator.detectChanges();
      expect(component.searchFormsArrayControls!.length).toBeGreaterThan(1);
      expect(spectator.queryAll("app-simple-icon-button[search-bar-remove]").length).toBeGreaterThan(1);

      spyOn(component, 'removeSearchBar').and.callThrough();
      spectator.click(spectator.queryLast("app-simple-icon-button[search-bar-remove] [simple-icon-button]")!);
      spectator.detectChanges();
      expect(component.removeSearchBar).toHaveBeenCalled();
      expect(component.searchFormsArrayControls!.length).toBe(1);

      expect(spectator.query("app-simple-icon-button[search-bar-remove] [simple-icon-button]")).toBeTruthy();
      expect(spectator.query("app-simple-icon-button[search-bar-remove] [simple-icon-button]")).toBeDisabled();
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

    it('should have Router injected', () => {
      expect(component["_router"]).toBeDefined();
      expect(component["_router"]).toBeTruthy();
      expect(component["_router"]).toEqual(_router);
    });

  });

  describe('Active Search bar', () => {

    describe('Active search bar attribute', () => {

      beforeEach(() => {
        component.activeSearchBar = {
          index: 0,
          isEditing: false
        };
        spectator.detectChanges();
      });

      it('should have activeSearchBar set to 0 and false by default', () => {
        expect(component.activeSearchBar).toEqual({
          index: 0,
          isEditing: false
        });
      });

      it('should have activeSearchBar set to 0 when there are multiple search bar, the first one is removed and index was 0', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.activeSearchBarChange, 'emit');
        component.removeSearchBar(0);
        spectator.detectChanges();
        let searchBarEvent: SearchBarEvent = {
          index: 0,
          isEditing: false
        }
        expect(component.activeSearchBar).toEqual(searchBarEvent);
        expect(component.activeSearchBarChange.emit).toHaveBeenCalledWith(searchBarEvent);
      });

      it('should have activeSearchBar set to current index minus 1 when there are multiple search bar, the first one is removed and index was greater than 0', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.activeSearchBarChange, 'emit');
        component.activeSearchBar = {
          index: 1,
          isEditing: false
        };
        component.removeSearchBar(0);
        spectator.detectChanges();
        let searchBarEvent: SearchBarEvent = {
          index: component.searchFormsArrayControls.length - 1,
          isEditing: false
        }
        expect(component.activeSearchBar).toEqual(searchBarEvent);
        expect(component.activeSearchBarChange.emit).toHaveBeenCalledWith(searchBarEvent);
      });

      it('should have activeSearchBar set to last search bar index when new search bar is created', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.activeSearchBarChange, 'emit');
        component.addSearchBar();
        spectator.detectChanges();
        let searchBarEvent: SearchBarEvent = {
          index: component.searchFormsArrayControls.length - 1,
          isEditing: true
        }
        expect(component.activeSearchBar).toEqual(searchBarEvent);
        expect(component.activeSearchBarChange.emit).toHaveBeenCalledWith(searchBarEvent);
      });

      it('should have activeSearchBar set to selected search bar', () => {
        spyOn<EventEmitter<SearchBarEvent>, any>(component.activeSearchBarChange, 'emit');
        let searchBarEvent: SearchBarEvent = {
          index: 1,
          isEditing: false
        }
        component.onSearchBarSelect(searchBarEvent);
        expect(component.activeSearchBar).toEqual(searchBarEvent);
        expect(component.activeSearchBarChange.emit).toHaveBeenCalledWith(searchBarEvent);
      });


    });

    describe('Active search bar', () => {

      beforeEach(() => {
        component.activeSearchBar = {
          index: 1,
          isEditing: false
        };
        component.addSearchBar();
        component.addSearchBar();
        spectator.detectChanges();
      });

      it('should have only one active search bar input at most', () => {
        expect(spectator.queryAll("[search-bar-input] [search-input]:not([readonly])").length).toBe(1);
        expect(spectator.queryAll("[search-bar-input] [search-input][readonly]").length).toBe(component.searchFormsArrayControls.length - 1);
      });
    });

  });

  /*
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
      component.addSearchBar();
      spectator.detectChanges();

      expect(spectator.queryAll("app-simple-icon-button[search-bar-up]").length).toBe(component.searchFormsArrayControls.length);
      expect(spectator.queryAll("app-simple-icon-button[search-bar-down]").length).toBe(component.searchFormsArrayControls.length);

      expect(spectator.queryAll("app-simple-icon-button[search-bar-up] mat-icon[simple-icon]")).toBeTruthy();
      spectator.queryAll("app-simple-icon-button[search-bar-up] mat-icon[simple-icon]").map((button: Element) => {
        expect(button).toHaveText("keyboard_arrow_up");
      });

      expect(spectator.queryAll("app-simple-icon-button[search-bar-down] mat-icon[simple-icon]")).toBeTruthy();
      spectator.queryAll("app-simple-icon-button[search-bar-down] mat-icon[simple-icon]").map((button: Element) => {
        expect(button).toHaveText("keyboard_arrow_down");
      });
    });

    it('should have up button not visible when search bar is the first one', () => {
      component.addSearchBar();
      spectator.detectChanges();

      expect(spectator.queryAll("app-simple-icon-button[search-bar-up]").length).toEqual(component.searchFormsArrayControls.length);
      expect(spectator.query("app-simple-icon-button[search-bar-up]>[simple-icon-button]")).toBeTruthy();
      expect(spectator.query("app-simple-icon-button[search-bar-up]>[simple-icon-button]")).toBeHidden();
    });

    it('should have down button not visible when search bar is the last one', () => {
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
   */

});
