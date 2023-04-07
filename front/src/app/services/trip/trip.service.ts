import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TripModel} from "../../models/trip/trip.model";
import {Observable} from "rxjs";
import {TripStoreService} from "../../store/trip-store/trip-store.service";
import {nextMonthDisabled} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private url: string = '/api/trips/';

  constructor(private _httpclient: HttpClient, private _tripStoreService: TripStoreService) { }

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
  sendTripAndUpdateStore(data: TripModel) : void {

    console.log('json : ',JSON.stringify(data));

    this._httpclient.post<TripModel>(`${this.url}add`, data).subscribe((trip: TripModel) => {

      this._tripStoreService.addTrip(trip)
    }, error => {
      this._tripStoreService.addTrip(data)
      console.log('error : ', error);
    });
  }
}
