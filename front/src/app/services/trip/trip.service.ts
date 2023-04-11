import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TripModel} from "../../models/trip/trip.model";
import {Observable} from "rxjs";
import {TripStoreService} from "../../store/trip-store/trip-store.service";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private url: string = '/api/trip';

  constructor(private _httpclient: HttpClient,
              private _tripStoreService: TripStoreService,
              private authService: AuthService) {
  }

  getTripData(): Observable<TripModel[]> {
    return this._httpclient.get<TripModel[]>(`${this.url}/all?id=${this.authService?.user?.user.id}`);
  }

  sendTripData(data: TripModel | any): Observable<TripModel> {
    data.user = this.authService?.user?.user ;
    // for each attribute of data, remove the first char which is underscore
    let trip = Object.keys(data).reduce((acc: any, key: any) => {
       acc[key.slice(1)] = data[key];
       return acc;
     }, {});
    return this._httpclient.post<TripModel>(`${this.url}`, trip);
  }

  sendTripAndUpdateStore(data: TripModel | any): void {
    data.user = this.authService?.user?.user;

    // for each attribute of data, remove the first char which is underscore
    let trip = Object.keys(data).reduce((acc: any, key: any) => {
      acc[key.slice(1)] = data[key];
      return acc;
    }, {});

    trip.steps = trip.steps.map((step: any) => {
      return Object.keys(step).reduce((acc: any, key: any) => {
        acc[key.slice(1)] = data[key];
        return acc;
      }, {});
    });

    this._httpclient.post<TripModel>(`${this.url}`, trip).subscribe({
      next: trip => {
        this._tripStoreService.addOrUpdateTrip(trip)
      },
      error: error => {
        this._tripStoreService.addOrUpdateTrip(data)
      }
    });
  }

  deleteTrip(id: string): Observable<any> {
    return this._httpclient.delete<TripModel>(`${this.url}?id=${id}`);
  }
}
