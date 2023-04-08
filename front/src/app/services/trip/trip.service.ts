import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TripModel} from "../../models/trip/trip.model";
import {Observable} from "rxjs";
import {TripStoreService} from "../../store/trip-store/trip-store.service";

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private url: string = '/api/trip';

  constructor(private _httpclient: HttpClient, private _tripStoreService: TripStoreService) {
  }

  getTripData(): Observable<TripModel[]> {
    return this._httpclient.get<TripModel[]>(`${this.url}/all?id=`);
  }

  sendTripData(data: TripModel): Observable<TripModel> {

    console.log(JSON.stringify(data));

    return this._httpclient.post<TripModel>(`${this.url}`, data);
  }

  sendTripAndUpdateStore(data: TripModel): void {

    console.log('json : ', JSON.stringify(data));

    this._httpclient.post<TripModel>(`${this.url}`, data).subscribe({
      next: trip => {
        this._tripStoreService.addOrUpdateTrip(trip)
      },
      error: error => {
        this._tripStoreService.addOrUpdateTrip(data)
        console.log('error : ', error);
      }
    });
  }

  deleteTrip(id: string): Observable<any> {
    return this._httpclient.delete<TripModel>(`${this.url}?id=${id}`);
  }
}
