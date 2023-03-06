import { Component } from '@angular/core';
import {Location} from "../../../models/location/location.model";
import {LocationService} from "../../../services/location.service";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  public location: string = "";
  public locationOptions: Location[] = [];

  constructor(
    private _locationService: LocationService,
  ) {
  }

  private _getLocations(search: string): void {
    this._locationService.getLocations(search).subscribe(
      (locations: Location[]) => {
        this.locationOptions = locations;
    });
  }

  public onLocationChange(value: string): void {
    this.location = value;
    this.location ? this._getLocations(this.location) : this.locationOptions = [];
  }

  public onLocationOptionClick(location: Location): void {
    this.location = location.getName;
    this.locationOptions = [];
  }

}
