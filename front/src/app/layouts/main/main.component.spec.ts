import { MainComponent } from './main.component';
import {MultipleSearchBarsComponent} from "../../containers/multiple-search-bars/multiple-search-bars.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {By} from "@angular/platform-browser";
import {SingleSearchBarComponent} from "../../containers/single-search-bar/single-search-bar.component";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('MainComponent', () => {
  let component: MainComponent;
  let spectator: Spectator<MainComponent>;

  const createComponent = createComponentFactory({
    component: MainComponent,
    declarations: [
      MainComponent,
      MultipleSearchBarsComponent,
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

  it('should have a search bar component with multiple search disabled', () => {
    let searchBar = spectator.debugElement.query(By.css("app-single-search-bar[search-bar]"))!;
    let searchBarComponent: SingleSearchBarComponent = searchBar.componentInstance as SingleSearchBarComponent;
    expect(searchBarComponent).toBeDefined();
  });

});
