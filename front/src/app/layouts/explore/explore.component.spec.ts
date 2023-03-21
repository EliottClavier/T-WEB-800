import {ExploreComponent} from "./explore.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {By} from "@angular/platform-browser";
import {MultipleSearchBarsComponent} from "../../containers/multiple-search-bars/multiple-search-bars.component";
import {AppModule} from "../../app.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MapComponent} from "../../containers/map/map.component";

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let spectator: Spectator<ExploreComponent>;

  const createComponent = createComponentFactory({
    component: ExploreComponent,
    declarations: [
      ExploreComponent,
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

  it('should have a multiple search bar component', () => {
    let searchBars = spectator.debugElement.query(By.css("app-multiple-search-bars[search-bar]"))!;
    let searchBarsComponent: MultipleSearchBarsComponent = searchBars.componentInstance as MultipleSearchBarsComponent;
    expect(searchBarsComponent).toBeDefined();
  });

  it('should have a map component', () => {
    let map = spectator.debugElement.query(By.css("app-map"))!;
    let mapComponent: MapComponent = map.componentInstance as MapComponent;
    expect(mapComponent).toBeDefined();
  });
})
