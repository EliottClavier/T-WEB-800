import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {LocationModel} from "../../models/location/location.model";
import {GoogleMap} from "@angular/google-maps";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {Observable} from 'rxjs';
import {ItineraryMode} from "../../types/itinerary-mode.type";
import {TransportRequest} from "../../types/transport-request.type";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {TransportDirections} from "../../types/transport-options.type";
import {TransportService} from "../../services/transport/transport.service";
import LatLng = google.maps.LatLng;
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  /* Zoom */
  public defaultZoom: number = 12;
  public zoom: number = this.defaultZoom;
  public maxZoom: number = 15;
  public minZoom: number = 5;

  /* Center */
  public center: google.maps.LatLngLiteral = {
    lat: 47.21121663814047,
    lng: -1.5669571980709454
  };

  /* Map options */
  public options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    // Disable all UI, but keep zoom control enabled
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: this.maxZoom,
    minZoom: this.minZoom,
    // Disable default map marquers
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{visibility: 'off'}]
      }
    ]
  }

  /* Markers style */
  public markerSize: google.maps.Size = new google.maps.Size(40, 40);
  public markerAnimation: google.maps.Animation = google.maps.Animation.DROP;

  /* Markers */
  @Input() public selectedLocation: LocationModel = new LocationModel(
    "",
    "",
    this.center.lat,
    this.center.lng
  );
  @Input() public nextLocation: LocationModel | undefined;

  @Input() public markers: LeisureItemModel[] = [];
  @Input() public selectedMarkers: LeisureItemModel[] = [];
  @Input() public activeMarker: LeisureItemModel | undefined;

  /* Map and map events */
  @ViewChild(GoogleMap, { static: false }) public map!: GoogleMap;
  @Output() public onBoundariesChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onMarkerClick: EventEmitter<LeisureItemModel> = new EventEmitter<LeisureItemModel>();

  /* Itinerary and directions */
  @Input() public itineraryView: boolean = false;
  @Input() public itineraryMode: ItineraryMode = {
    travelMode: google.maps.TravelMode.DRIVING,
  };
  public directionsResults: google.maps.DirectionsResult | undefined;

  /* Polyline options for FLIGHT itinerary mode */
  public polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#4285F4',
    strokeOpacity: 1.0,
    strokeWeight: 5,
    icons: [{
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
      }
    }],
  }

  constructor(
    private _transportService: TransportService,
    private _suggestionsStore: SuggestionsStoreService,
  ) {}

  public ngOnInit(): void {
    this._suggestionsStore?.suggestions$?.subscribe((suggestions) => {
      this.markers = this.itineraryView ? [] : suggestions;
    });
  }

  public ngOnChanges(): void {
    if (this.selectedLocation && this.selectedLocation.hasValidCoordinates()) {
      if (this.itineraryView) {
        if (this.nextLocation && this.nextLocation.hasValidCoordinates() && this._isTravelModeValid(this.itineraryMode.travelMode)) {
          this._requestDirections(this.selectedLocation.name, this.nextLocation.name, this.itineraryMode.travelMode);
        } else {
          this.directionsResults = undefined;
        }
      } else {
        this.zoom = this.defaultZoom;
        this._moveCenterToLatLng(this.selectedLocation.lat, this.selectedLocation.lng);
      }
    }
  }

  private _isTravelModeValid(travelMode: google.maps.TravelMode): boolean {
    return [google.maps.TravelMode.DRIVING, google.maps.TravelMode.WALKING, google.maps.TravelMode.BICYCLING, google.maps.TravelMode.TRANSIT].includes(travelMode)
  }

  private _getDirections(request: TransportRequest): Observable<TransportDirections> {
    return this._transportService.getTransportOptions(request);
  }

  private _requestDirections(origin: string, destination: string, travelMode: google.maps.TravelMode, startDate: Date = new Date(), transitMode?: google.maps.TransitMode): void {
    const request: google.maps.DirectionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: travelMode,
    };

    transitMode && (request.transitOptions = { modes: [transitMode] });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    let transportRequest: TransportRequest = {
      directionRequest: request,
      // If the start date is before tomorrow, we set it to tomorrow
      startDate: getIsoStringFromDate(startDate <= tomorrow ? tomorrow : startDate),
    }

    // Formatting the response to match the google maps rendering API
    this._getDirections(transportRequest).subscribe((response) => {

      response.directionsResult.routes = response.directionsResult.routes.map((response: any) => {
        response.bounds = new google.maps.LatLngBounds(
          response.bounds.southwest,
          response.bounds.northeast,
        );
        response.overview_path =
          google.maps.geometry.encoding.decodePath(response.overviewPolyline.encodedPath);

        response.legs = response.legs.map((leg: any) => {
          leg.start_location =
            new google.maps.LatLng(leg.startLocation.lat, leg.startLocation.lng);
          leg.end_location =
            new google.maps.LatLng(leg.endLocation.lat, leg.endLocation.lng);
          leg.steps = leg.steps.map((step: any) => {
            step.path = google.maps.geometry.encoding.decodePath(step.polyline.encodedPath);
            step.start_location = new google.maps.LatLng(
              step.startLocation.lat,
              step.startLocation.lng,
            );
            step.end_location = new google.maps.LatLng(
              step.endLocation.lat,
              step.endLocation.lng,
            );
            step.travel_mode = step.travelMode;
            return step;
          });
          return leg;
        });

        return response;
      });

      response.directionsResult.request = request;

      this.directionsResults = response.directionsResult;
    });
  }

  private _moveCenterToLatLng(lat: number, lng: number): void {
    this.center = { lat: lat, lng: lng };
  }

  public onMapBoundariesChange(zoomed: boolean = false): void {
    zoomed && !this.itineraryView && (this.zoom = this.map.getZoom() || this.defaultZoom);

    let bounds: any = {
      north: this.map.getBounds()?.getNorthEast().lat(),
      east: this.map.getBounds()?.getNorthEast().lng(),
      south: this.map.getBounds()?.getSouthWest().lat(),
      west: this.map.getBounds()?.getSouthWest().lng()
    }
    this.onBoundariesChange.emit(bounds);
  }

  public onMapMarkerClick(marker: LeisureItemModel): void {
    this.activeMarker = marker;
    this.onMarkerClick.emit(marker);
  }

  private _isMarkerSelected(marker: LeisureItemModel): boolean {
    return this.selectedMarkers.some((selectedMarker) => marker.location.lat === selectedMarker.location.lat && marker.location.lng === selectedMarker.location.lng);
  }

  public getMarkerImage(marker: LeisureItemModel): string {
    let markerType: string;
    if (marker === this.activeMarker) {
      markerType = 'active';
    } else if (this._isMarkerSelected(marker)) {
      markerType = 'colored';
    } else {
      markerType = 'default';
    }
    return `assets/images/markers/${markerType}-pin.svg`;
  }

  public castStringToTravelMode(travelMode: string): google.maps.TravelMode {
    return travelMode as google.maps.TravelMode;
  }

  public drawFlightPolyline(): LatLng[] {
    if (!this.selectedLocation.hasValidCoordinates() || !this.nextLocation?.hasValidCoordinates()) return [];
    return [
      new google.maps.LatLng(
        this.selectedLocation.lat,
        this.selectedLocation.lng
      ),
      new google.maps.LatLng(
        this.nextLocation.lat,
        this.nextLocation.lng
      ),
    ]
  }
}
