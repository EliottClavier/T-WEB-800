import { Injectable } from '@angular/core';
import {Location} from "../../models/location/location.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {getDateFromIsoString} from "../../utils/date.utils";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
  ) { }

  public getLocationSuggestions(search: string): Observable<Location[]> {
    return this.http.get<Location[]>(`/api/locations/suggestion/${search}`);
  }

  public getLocationInformations(
    search: string, type: string, start: Date = new Date(), end: Date = new Date()
  ): Observable<string[]> {
    return this.http.get<string[]>(
      `/api/locations/search/${search}/${type}`,
      {
        params: {
          start: getDateFromIsoString(start),
          end: getDateFromIsoString(end)
        }
      }
    );
  }
}
