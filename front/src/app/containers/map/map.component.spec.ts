import {MapComponent} from './map.component'
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {EventEmitter, NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Location} from "../../models/location/location.model";
import {GoogleMap, MapDirectionsResponse, MapDirectionsService} from "@angular/google-maps";
import {ItemModel} from "../../models/item/item.model";
import {LeisureType} from "../../enums/leisure-type";
import {By} from "@angular/platform-browser";
import {BehaviorSubject, Observable} from "rxjs";

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

    it('should not define nextLocation attribute gotten from parent component', () => {
      expect(component.nextLocation).not.toBeDefined();
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

    it('should be on suggestions mode by default', () => {
      expect(component.itineraryView).toBeFalsy();
    });

    it('should not have any direction results by default', () => {
      expect(component.directionsResults).toBeUndefined();
    });

    it('should have a default ItineraryMode', () => {
      expect(component.itineraryMode).toBeDefined();
      expect(component.itineraryMode.travelMode).toEqual(google.maps.TravelMode.DRIVING);
    });

    it('should have a markerSize value', () => {
      expect(component.markerSize).toBeDefined();
      expect(component.markerSize).toEqual(new google.maps.Size(40, 40));
    });

    it('should have a markerAnimation value', () => {
      expect(component.markerAnimation).toBeDefined();
      expect(component.markerAnimation).toEqual(google.maps.Animation.DROP);
    });

  });

  describe('Position switches', () => {

    describe('_moveCenterToLatLng', () => {
      it('should change center coordinates with the lat and lng passed', () => {
        spyOn<MapComponent, any>(component, '_moveCenterToLatLng').and.callThrough();
        component["_moveCenterToLatLng"](1, 2);
        expect(component["_moveCenterToLatLng"]).toHaveBeenCalledWith(1, 2);
        expect(component.center).toEqual({
          lat: 1,
          lng: 2
        });
      });
    });

    describe('ngOnChanges', () => {
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
    })
  });

  describe('Boundaries change', () => {

    describe('onMapBoundariesChange', () => {
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
        component.defaultZoom = 12;
        component.zoom = 1;
        component.onMapBoundariesChange(true);
        // Default zoom level is 12 and assigning zoom to 1 doesn't update map zoom
        expect(component.zoom).toEqual(component.defaultZoom!);
      });

      it('should not reset zoom level when itinerary view is true', () => {
        component.itineraryView = true;
        spyOn(component.map, 'getZoom').and.returnValue(undefined);
        component.zoom = 1;
        component.onMapBoundariesChange(true);
        expect(component.zoom).toEqual(1);
      });
    });

    describe('on Events (simplified)', () => {
      it('should emit new boundaries on zoom change', async() => {
        spyOn<MapComponent, any>(component, 'onMapBoundariesChange').and.callThrough();
        spyOn<EventEmitter<any>, any>(component.onBoundariesChange, 'emit').and.callThrough();
        component.onMapBoundariesChange();
        expect(component.onBoundariesChange.emit).toHaveBeenCalled();
      });
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

    describe('ngOnChanges', () => {
      it('should build markers', () => {
        component.ngOnChanges();
        spectator.detectChanges();
        expect(spectator.queryAll('map-marker[map-marker]').length).toEqual(component.markers.length);
      });
    });

    describe('onMapMarkerClick', () => {
      it('should emit marker', () => {
        spyOn<EventEmitter<any>, any>(component.onMarkerClick, 'emit').and.callThrough();
        component.onMapMarkerClick(component.markers[0]);
        expect(component.activeMarker).toEqual(component.markers[0]);
        expect(component.onMarkerClick.emit).toHaveBeenCalled();
      });
    });

    describe('on Events', () => {
      it('should emit marker on marker click', () => {
        spyOn<MapComponent, any>(component, 'onMapMarkerClick').and.callThrough();
        spyOn<EventEmitter<any>, any>(component.onMarkerClick, 'emit').and.callThrough();

        let marker = spectator.debugElement.queryAll(By.css('map-marker[map-marker]'))[0];
        spectator.triggerEventHandler(marker, 'mapClick', {})
        expect(component.onMapMarkerClick).toHaveBeenCalled();
        expect(component.onMarkerClick.emit).toHaveBeenCalled();
      });
    });

    describe('_isMarkerSelected', () => {
      it('should return true if marker is selected', () => {
        component.selectedMarkers.push(component.markers[0]);
        expect(component["_isMarkerSelected"](component.markers[0])).toBeTruthy();
      });

      it('should return false if marker is not selected', () => {
        component.selectedMarkers = [];
        spectator.detectChanges();
        expect(component["_isMarkerSelected"](component.markers[0])).toBeFalsy();
      });
    });

    describe('getMarkerImage', () => {
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
  });

  describe('Directions and itinerary', () => {
    let _directionService: MapDirectionsService;

    beforeEach(() => {
      component.itineraryView = true;
      _directionService = spectator.inject(MapDirectionsService);
      spectator.detectChanges();
    });

    describe('MapDirectionsService', () => {
      it('should have MapDirectionsService injected', () => {
        expect(component["_directionService"]).toBeDefined();
        expect(component["_directionService"]).toBeTruthy();
        expect(component["_directionService"]).toEqual(_directionService);
      });
    });

    describe('_getDirections', () => {
      it('should return Observable<google.maps.DirectionsResult> when calling _getDirections', () => {
        let request: google.maps.DirectionsRequest = {
          origin: 'Nantes',
          destination: 'Paris',
          travelMode: google.maps.TravelMode.DRIVING
        }

        expect(component["_getDirections"](request)).toBeInstanceOf(Observable);
      });
    });

    describe('_requestDirections', () => {
      it('should retrieve directions results for specific travel mode', () => {
        // spyOn<MapDirectionsService, any>(_directionService, 'route').and.callThrough();
        spyOn<MapComponent, any>(component, '_getDirections').and.callThrough();
        spyOn<MapDirectionsService, any>(_directionService, "route").and.callFake((request: google.maps.DirectionsRequest) => {
          return new BehaviorSubject<MapDirectionsResponse>(
            {
              status: google.maps.DirectionsStatus.OK,
              result: {
                routes: []
              }
            }
          );
        });

        let request: google.maps.DirectionsRequest = {
          origin: 'Nantes',
          destination: 'Paris',
          travelMode: google.maps.TravelMode.DRIVING
        }

        component["_requestDirections"](request.origin.toString(), request.destination.toString(), request.travelMode);
        expect(_directionService.route).toHaveBeenCalledWith(request);
        expect(component["_getDirections"]).toHaveBeenCalledWith(request);
        expect(component.directionsResults).toEqual({ routes: [] });
      });

      it('should retrieve directions results for transit travel mode and specific transit mode', () => {
        spyOn<MapComponent, any>(component, '_getDirections').and.callThrough();
        spyOn<MapDirectionsService, any>(_directionService, "route").and.callFake((request: google.maps.DirectionsRequest) => {
          return new BehaviorSubject<MapDirectionsResponse>(
            {
              status: google.maps.DirectionsStatus.OK,
              result: {
                routes: []
              }
            }
          );
        });

        let request: google.maps.DirectionsRequest = {
          origin: 'Nantes',
          destination: 'Paris',
          travelMode: google.maps.TravelMode.TRANSIT,
          transitOptions: {
            modes: [google.maps.TransitMode.TRAIN]
          }
        }

        component["_requestDirections"](request.origin.toString(), request.destination.toString(), request.travelMode, request.transitOptions?.modes![0]);
        expect(_directionService.route).toHaveBeenCalledWith(request);
        expect(component["_getDirections"]).toHaveBeenCalledWith(request);
        expect(component.directionsResults).toEqual({ routes: [] });
      });

      it('should not request directions results if origin isn`t valid', () => {
        spyOn<MapComponent, any>(component, "_requestDirections").and.callThrough();
        component.selectedLocation = new Location("", "", 200, 200);
        component.ngOnChanges()
        expect(component["_requestDirections"]).not.toHaveBeenCalled();
      });

      it('should not request directions results if destination isn`t valid', () => {
        spyOn<MapComponent, any>(component, "_requestDirections").and.callThrough();
        component.nextLocation = new Location("", "", 200, 200);
        component.ngOnChanges()
        expect(component["_requestDirections"]).not.toHaveBeenCalled();
      });

      it('should not request directions results if itineraryView is false', () => {
        spyOn<MapComponent, any>(component, "_requestDirections").and.callThrough();
        component.itineraryView = false;
        component.ngOnChanges()
        expect(component["_requestDirections"]).not.toHaveBeenCalled();
      });

      it('should not request directions results if itineraryMode has invalid travelMode', () => {
        spyOn<MapComponent, any>(component, "_requestDirections").and.callThrough();
        component.itineraryMode.travelMode = "TEST" as google.maps.TravelMode;
        component.ngOnChanges()
        expect(component["_requestDirections"]).not.toHaveBeenCalled();
      });

      it('should request directions results conditions are matched', () => {
        spyOn<MapComponent, any>(component, "_requestDirections").and.callThrough();
        component.selectedLocation = new Location("1", "Nantes", 10, 50);
        component.nextLocation = new Location("2", "Paris", 20, 60);
        component.ngOnChanges();
        expect(component["_requestDirections"]).toHaveBeenCalled();
      });
    });

    describe('_isTravelModeValid', () => {
      it('should return false if invalid travelMode is passed', () => {
        expect(component["_isTravelModeValid"]("TEST" as google.maps.TravelMode)).toBeFalsy();
      });

      it('should return true if invalid travelMode is passed', () => {
        expect(component["_isTravelModeValid"]("DRIVING" as google.maps.TravelMode)).toBeTruthy();
      });
    });

    describe('Templates', () => {
      it('should have a map-directions-renderer element when destinationsResults is defined', () => {
        component.directionsResults = { routes: [] };
        spectator.detectChanges();
        expect(spectator.query('map-directions-renderer[map-directions-renderer]')).toBeTruthy();
      });
    });
  });

})
