import { MapFiltersComponent } from './map-filters.component'
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('MapFiltersComponent', () => {
  let component: MapFiltersComponent;
  let spectator: Spectator<MapFiltersComponent>;
  const createComponent = createComponentFactory({
    component: MapFiltersComponent,
    declarations: [
      MapFiltersComponent
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
})
