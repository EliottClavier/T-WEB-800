import { MapComponent } from './map.component'
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {EventEmitter, NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Location} from "../../models/location/location.model";
import {GoogleMap} from "@angular/google-maps";

describe('MapComponent', () => {
  let component: MapComponent;
  let spectator: Spectator<MapComponent>;
  let http: HttpClient;

  const createComponent = createComponentFactory({
    component: MapComponent,
    declarations: [
      MapComponent,
      GoogleMap
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

    component.selectedLocation = new Location('', 'Nantes', 47.21121663814047, -1.5669571980709454)

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Google Maps API default configuration', () => {
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
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{visibility: 'off'}]
          }
        ]
      });
    });

    it('should take all width available and relative height', async () => {
      expect(spectator.query('google-map[map]')?.getAttribute('height')).toEqual('65vh');
      expect(spectator.query('google-map[map]')?.getAttribute('width')).toEqual('100%');
    });

    it('should have base selectedLocation attribute gotten from parent component', () => {
      expect(component.selectedLocation).toBeDefined();
      expect(component.selectedLocation).toBeInstanceOf(Location);
    });
  });

  describe('Position switches', () => {
    it('should change center coordinates with the lat and lng passed', () => {
      spyOn<MapComponent, any>(component, '_moveCenterToLatLng').and.callThrough();
      component["_moveCenterToLatLng"](1, 2);
      expect(component["_moveCenterToLatLng"]).toHaveBeenCalledWith(1, 2);
      expect(component.center).toEqual({
        lat: 1,
        lng: 2
      });
    });

    it('should change center coordinates on ngOnChanges with selectedSearchForm coordinates', () => {
      spyOn<MapComponent, any>(component, '_moveCenterToLatLng').and.callThrough();
      let lat = component.selectedLocation.lat;
      let lng = component.selectedLocation.lng;
      component.ngOnChanges();
      expect(component["_moveCenterToLatLng"]).toHaveBeenCalledWith(lat, lng);
    });
  });

  describe('Boundaries change', () => {

    it('should emit new boundaries on boundaries change', () => {
      spyOn<MapComponent, any>(component, 'onMapBoundariesChange').and.callThrough();
      spyOn<EventEmitter<any>, any>(component.onBoundariesChange, 'emit').and.callThrough();
      component.map.boundsChanged.subscribe(() => {
        // Can't test what's emitted  since there is no way
        // to wait for the map to be fully loaded it seems
        // The content emitted is made from component.map.getBounds() with N,E,S,W coordinates
        expect(component.onMapBoundariesChange).toHaveBeenCalled();
        expect(component.onBoundariesChange.emit).toHaveBeenCalled();
      });

      google.maps.event.trigger(component.map.googleMap!, 'bounds_changed', {
        latLng: new google.maps.LatLng(50, 50)
      });
    });

    it('should emit new boundaries on zoom change', () => {
      spyOn<MapComponent, any>(component, 'onMapBoundariesChange').and.callThrough();
      spyOn<EventEmitter<any>, any>(component.onBoundariesChange, 'emit').and.callThrough();
      component.map.boundsChanged.subscribe(() => {
        expect(component.onMapBoundariesChange).toHaveBeenCalled();
        expect(component.onBoundariesChange.emit).toHaveBeenCalled();
      });

      component.map.zoomChanged.subscribe(() => {
        google.maps.event.trigger(component.map.googleMap!, 'bounds_changed', {
          latLng: new google.maps.LatLng(50, 50)
        });
      });

      google.maps.event.trigger(component.map.googleMap!, 'zoom_changed');
    });

    it('should emit new boundaries on drag end', () => {
      spyOn<MapComponent, any>(component, 'onMapBoundariesChange').and.callThrough();
      spyOn<EventEmitter<any>, any>(component.onBoundariesChange, 'emit').and.callThrough();

      component.map.boundsChanged.subscribe(() => {
        expect(component.onMapBoundariesChange).toHaveBeenCalled();
        expect(component.onBoundariesChange.emit).toHaveBeenCalled();
      });

      component.map.mapDragend.subscribe(() => {
        google.maps.event.trigger(component.map.googleMap!, 'bounds_changed', {
          latLng: new google.maps.LatLng(50, 50)
        });
      });

      google.maps.event.trigger(component.map.googleMap!, 'dragend');
    });
  });
})
