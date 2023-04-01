import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {TripModel} from "../../models/trip/trip.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private url: string = '/api/trips/';

  constructor(private _httpclient: HttpClient) { }

  getTripData() :Observable<TripModel[]> {
    return this._httpclient.get<TripModel[]>(`${this.url}`);
  }

  sendTripData(data: TripModel[]) : Observable<TripModel[]> {
    return this._httpclient.post<TripModel[]>(`${this.url}add`, data);
  }

}
