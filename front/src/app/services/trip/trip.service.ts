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

  sendTripData(data: TripModel): Observable<TripModel> {
    data.user = this.authService?.user ;
    console.log(JSON.stringify(data));

    return this._httpclient.post<TripModel>(`${this.url}`, data);
  }

  sendTripAndUpdateStore(data: TripModel): void {

    console.log('json : ', JSON.stringify(data));
    data.user = this.authService?.user ;
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
