import {MapComponent} from './map.component'
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {EventEmitter, NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Location} from "../../models/location/location.model";
import {GoogleMap} from "@angular/google-maps";
import {ItemModel} from "../../models/item/item.model";
import {LeisureType} from "../../enums/leisure-type";
import {By} from "@angular/platform-browser";

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

    it('should have base markers attribute gotten from parent component', () => {
      expect(component.markers).toBeDefined();
      expect(component.markers).toBeInstanceOf(Array);
      expect(component.markers).toEqual([]);
    });

    it('should have selected markers attribute gotten from parent component', () => {
      expect(component.selectedMarkers).toBeDefined();
      expect(component.selectedMarkers).toBeInstanceOf(Array);
      expect(component.selectedMarkers).toEqual([]);
    });

    it('should have active marker attribute gotten from parent component', () => {
      expect(component.activeMarker).not.toBeDefined();
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

    it('should reset zoom on ngOnChanges', () => {
      let zoom: number = component.zoom
      component.zoom = 1;
      component.ngOnChanges();
      expect(component.zoom).toEqual(zoom);
    });
  });

  describe('Boundaries change', () => {

    it('should emit new boundaries', () => {
      spyOn<EventEmitter<any>, any>(component.onBoundariesChange, 'emit').and.callThrough();
      component.onMapBoundariesChange();
      expect(component.onBoundariesChange.emit).toHaveBeenCalled();
    });

    it('should reset zoom level', () => {
      component.zoom = 1;
      component.onMapBoundariesChange(true);
      // Default zoom level is 12 and assigning zoom to 1 doesn't update map zoom
      expect(component.zoom).toEqual(component.map.getZoom()!);
    });

    it('should reset zoom level even with map getZoom returns undefined', () => {
      spyOn(component.map, 'getZoom').and.returnValue(undefined);
      component.zoom = 1;
      component.onMapBoundariesChange(true);
      // Default zoom level is 12 and assigning zoom to 1 doesn't update map zoom
      expect(component.zoom).toEqual(component.defaultZoom!);
    });

    it('should emit new boundaries on zoom change', async() => {
      spyOn<MapComponent, any>(component, 'onMapBoundariesChange').and.callThrough();
      spyOn<EventEmitter<any>, any>(component.onBoundariesChange, 'emit').and.callThrough();
      component.map.boundsChanged.subscribe(() => {
        // Can't test what's emitted since there is no way
        // to wait for the map to be fully loaded it seems
        // The content emitted is made from component.map.getBounds() with N,E,S,W coordinates
        expect(component.onMapBoundariesChange).toHaveBeenCalledWith(true);
        expect(component.onBoundariesChange.emit).toHaveBeenCalled();
      });

      component.map.zoomChanged.subscribe(() => {
        google.maps.event.trigger(component.map.googleMap!, 'bounds_changed', {
          latLng: new google.maps.LatLng(50, 50)
        });
      });

      google.maps.event.trigger(component.map.googleMap!, 'zoom_changed');
    });

    it('should emit new boundaries on drag end', async() => {
      spyOn<MapComponent, any>(component, 'onMapBoundariesChange').and.callThrough();
      spyOn<EventEmitter<any>, any>(component.onBoundariesChange, 'emit').and.callThrough();

      component.map.boundsChanged.subscribe(() => {
        // Can't test what's emitted since there is no way
        // to wait for the map to be fully loaded it seems
        // The content emitted is made from component.map.getBounds() with N,E,S,W coordinates
        expect(component.onMapBoundariesChange).toHaveBeenCalledWith();
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

  describe('Markers', () => {

    beforeEach(() => {
      component.markers = [
        new ItemModel(
          '1',
          'Title',
          'Subtitile',
          'Description',
          'image',
          47.21121663814047,
          -1.5669571980709454,
          LeisureType.ACCOMMODATION,
        ),
        new ItemModel(
          '2',
          'Title',
          'Subtitile',
          'Description',
          'image',
          47.21121663814047,
          -1.5669571980709454,
          LeisureType.ACCOMMODATION,
        ),
        new ItemModel(
          '3',
          'Title',
          'Subtitile',
          'Description',
          'image',
          47.21121663814047,
          -1.5669571980709454,
          LeisureType.ACCOMMODATION,
        ),
      ];
      spectator.detectChanges();
    });

    it('should build markers on ngOnChanges', () => {
      component.ngOnChanges();
      spectator.detectChanges();
      expect(spectator.queryAll('map-marker[map-marker]').length).toEqual(component.markers.length);
    });

    it('should emit marker', () => {
      spyOn<EventEmitter<any>, any>(component.onMarkerClick, 'emit').and.callThrough();
      component.onMapMarkerClick(component.markers[0]);
      expect(component.activeMarker).toEqual(component.markers[0]);
      expect(component.onMarkerClick.emit).toHaveBeenCalled();
    });

    it('should emit marker on marker click', () => {
      spyOn<MapComponent, any>(component, 'onMapMarkerClick').and.callThrough();
      spyOn<EventEmitter<any>, any>(component.onMarkerClick, 'emit').and.callThrough();

      let marker = spectator.debugElement.queryAll(By.css('map-marker[map-marker]'))[0];
      spectator.triggerEventHandler(marker, 'mapClick', {})
      expect(component.onMapMarkerClick).toHaveBeenCalled();
      expect(component.onMarkerClick.emit).toHaveBeenCalled();
    });

    it('should return true if marker is selected', () => {
      component.selectedMarkers.push(component.markers[0]);
      expect(component["_isMarkerSelected"](component.markers[0])).toBeTruthy();
    });

    it('should return false if marker is not selected', () => {
      component.selectedMarkers = [];
      spectator.detectChanges();
      expect(component["_isMarkerSelected"](component.markers[0])).toBeFalsy();
    });

    it('should give default marker image if marker isn\'t selected nor active', () => {
      expect(component.getMarkerImage(component.markers[0])).toEqual('assets/images/markers/default-pin.svg');
    });

    it('should give selected marker image if marker is selected', () => {
      component.selectedMarkers.push(component.markers[0]);
      expect(component.getMarkerImage(component.markers[0])).toEqual('assets/images/markers/colored-pin.svg');
    });

    it('should give active marker image if marker is active', () => {
      component.activeMarker = component.markers[0];
      expect(component.getMarkerImage(component.activeMarker)).toEqual('assets/images/markers/active-pin.svg');
    });

  });

})
