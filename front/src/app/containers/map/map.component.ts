import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {LocationModel} from "../../models/location/location.model";
import {GoogleMap, MapDirectionsResponse, MapDirectionsService} from "@angular/google-maps";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {Observable} from 'rxjs';
import {ItineraryMode} from "../../types/itinerary-mode.type";
import {TransportRequest} from "../../types/transport-request.type";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {TransportOptions} from "../../types/transport-options.type";
import {TransportService} from "../../services/transport/transport.service";

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

  constructor(private _transportService: TransportService) {}

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

  private _getDirections(request: TransportRequest): Observable<TransportOptions> {
    return this._transportService.getTransportOptions(request);
  }

  private _requestDirections(origin: string, destination: string, travelMode: google.maps.TravelMode, startDate: Date = new Date(), transitMode?: google.maps.TransitMode): void {
    const request: google.maps.DirectionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: travelMode,
    };

    transitMode && (request.transitOptions = { modes: [transitMode] });

    let transportRequest: TransportRequest = {
      directionRequest: request,
      startDate: getIsoStringFromDate(startDate)
    }

    this._getDirections(transportRequest).subscribe((response) => {
      this.directionsResults = response.routes;
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
}
