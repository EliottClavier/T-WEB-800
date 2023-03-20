import { MapComponent } from './map.component'
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClient} from "@angular/common/http";

describe('MapComponent', () => {
  let component: MapComponent;
  let spectator: Spectator<MapComponent>;
  let http: HttpClient;

  const createComponent = createComponentFactory({
    component: MapComponent,
    declarations: [
      MapComponent
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
    http = spectator.inject(HttpClient);
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default zoom configured', () => {
    expect(component.zoom).toEqual(12);
  });

  it('should have min zoom configured', () => {
    expect(component.minZoom).toEqual(5);
  });

  it('should have max zoom configured', () => {
    expect(component.maxZoom).toEqual(15);
  });

  it('should have center configured', () => {
    expect(component.center).toEqual({
      lat: 47.21121663814047,
      lng: -1.5669571980709454
    });
  });

  it('should have google map options configured', () => {
    expect(component.options).toEqual({
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      maxZoom: component.maxZoom,
      minZoom: component.minZoom,
    });
  });

  it('should take all width available and relative height', async () => {
    expect(spectator.query('google-map[map]')?.getAttribute('height')).toEqual('65vh');
    expect(spectator.query('google-map[map]')?.getAttribute('width')).toEqual('100%');
  });

})
