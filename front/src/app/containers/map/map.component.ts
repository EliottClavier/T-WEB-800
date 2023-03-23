import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Location} from "../../models/location/location.model";
import {GoogleMap} from "@angular/google-maps";
import {ItemModel} from "../../models/item/item.model";
import {LeisureType} from "../../enums/leisure-type";

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
  _markerSize: google.maps.Size = new google.maps.Size(40, 40);
  _markerAnimation: google.maps.Animation = google.maps.Animation.DROP;

  @Input() public selectedLocation: Location = new Location(
    "",
    "",
    this.center.lat,
    this.center.lng
  );

  @Input() public markers: ItemModel[] = [];
  @Input() public selectedMarkers: ItemModel[] = [];
  @Input() public activeMarker: ItemModel | undefined;

  @ViewChild(GoogleMap, { static: false }) public map!: GoogleMap;

  @Output() public onBoundariesChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onMarkerClick: EventEmitter<ItemModel> = new EventEmitter<ItemModel>();

  constructor() {
  }

  public ngOnChanges(): void {
    if (this.selectedLocation && this.selectedLocation.hasValidCoordinates()) {
      this.zoom = this.defaultZoom;
      this._moveCenterToLatLng(this.selectedLocation.lat, this.selectedLocation.lng);
    }
  }

  private _moveCenterToLatLng(lat: number, lng: number): void {
    this.center = { lat: lat, lng: lng };
  }

  public onMapBoundariesChange(zoomed: boolean = false): void {
    zoomed && (this.zoom = this.map.getZoom() || this.defaultZoom);

    let bounds: any = {
      north: this.map.getBounds()?.getNorthEast().lat(),
      east: this.map.getBounds()?.getNorthEast().lng(),
      south: this.map.getBounds()?.getSouthWest().lat(),
      west: this.map.getBounds()?.getSouthWest().lng()
    }
    this.onBoundariesChange.emit(bounds);
  }

  public onMapMarkerClick(marker: ItemModel): void {
    this.activeMarker = marker;
    this.onMarkerClick.emit(marker);
  }

  private _isMarkerSelected(marker: ItemModel): boolean {
    return this.selectedMarkers.some((selectedMarker) => marker.lat === selectedMarker.lat && marker.lng === selectedMarker.lng);
  }

  public getMarkerImage(marker: ItemModel): string {
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
