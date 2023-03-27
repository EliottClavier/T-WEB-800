import { Injectable } from '@angular/core';
import {LocationModel} from "../../models/location/location.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {getIsoStringFromDate} from "../../utils/date.utils";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
  ) { }

  public getLocationSuggestions(search: string): Observable<LocationModel[]> {
    return this.http.get<LocationModel[]>(`/api/locations/suggestion/${search}`);
  }

  public getLocationInformations(
    search: string, type: string, start: Date = new Date(), end: Date = new Date()
  ): Observable<string[]> {
    return this.http.get<string[]>(
      `/api/locations/search/${search}/${type}`,
      {
        params: {
          start: getIsoStringFromDate(start),
          end: getIsoStringFromDate(end)
        }
      }
    );
  }
}
