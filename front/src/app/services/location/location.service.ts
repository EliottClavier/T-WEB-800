import { Injectable } from '@angular/core';
import {Location} from "../../models/location/location.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
  ) { }

  public getLocationsBySearch(search: string): Observable<Location[]> {
    return this.http.get<Location[]>(`/api/locations/search/${search}`);
  }
}
