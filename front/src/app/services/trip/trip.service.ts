import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  sendTripsData(data: TripModel[]) : Observable<TripModel[]> {


    return this._httpclient.post<TripModel[]>(`${this.url}add`, data);
  }
  sendTripData(data: TripModel) : Observable<TripModel> {

      console.log(JSON.stringify(data));

    return this._httpclient.post<TripModel>(`${this.url}add`, data);
  }

}
