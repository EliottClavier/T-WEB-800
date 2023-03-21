import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Location} from "../../models/location/location.model";
import {GoogleMap} from "@angular/google-maps";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  public zoom: number = 12;
  public maxZoom: number = 15;
  public minZoom: number = 5;

  public center: google.maps.LatLngLiteral = {
    lat: 47.21121663814047,
    lng: -1.5669571980709454
  };

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

  @Input() public selectedLocation: Location = new Location(
    "",
    "",
    this.center.lat,
    this.center.lng
  );

  @ViewChild(GoogleMap, { static: false }) public map!: GoogleMap;

  @Output() public onBoundariesChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  public ngOnChanges(): void {
    if (this.selectedLocation && this.selectedLocation.hasValidCoordinates()) {
      this._moveCenterToLatLng(this.selectedLocation.lat, this.selectedLocation.lng);
    }
  }

  private _moveCenterToLatLng(lat: number, lng: number): void {
    this.center = { lat: lat, lng: lng };
  }

  public onMapBoundariesChange(): void {
    let bounds: any = {
      north: this.map.getBounds()?.getNorthEast().lat(),
      east: this.map.getBounds()?.getNorthEast().lng(),
      south: this.map.getBounds()?.getSouthWest().lat(),
      west: this.map.getBounds()?.getSouthWest().lng()
    }
    this.onBoundariesChange.emit(bounds);
  }
}
