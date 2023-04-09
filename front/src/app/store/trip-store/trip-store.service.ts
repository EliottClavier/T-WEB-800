import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TripModel} from "../../models/trip/trip.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TripStoreService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private _trips = new BehaviorSubject<TripModel[]>(new Array<TripModel>());
  private _trips$ = this._trips.asObservable();


  addOrUpdateTrip(nextTrip: TripModel) {

    const index = this._trips.getValue().findIndex(trip => trip.id === nextTrip.id);

    if (index >= 0) {
      // Si l'objet existe, remplacez-le par l'objet mis à jour
      const trips = [...this._trips.getValue()];
      trips[index] = nextTrip;
      this._trips.next(trips);
    } else {
      // Si l'objet n'existe pas, ajoutez-le au tableau
      this._trips.next([...this._trips.getValue(), nextTrip]);
    }

  }

  get trip$(): Observable<TripModel[]> {
    return this._trips$;
  }

  getTrips(): TripModel[] {
    return this._trips.getValue();
  }

  getTripsAsync(): Observable<TripModel[]> {
    if (this.authService.user) {
      return this.http.get<TripModel[]>(`/api/trip/all?id=${this.authService.user.user.id}`)
    }
    return new Observable();
  }

  deleteTrip(id: string) {
    const trips = this._trips.getValue();
    const index = trips.findIndex(trip => trip.id === id);
    if (index !== -1) {

      trips.splice(index, 1);
      this._trips.next(trips);
    }
  }

  getTripById(id: string) {
    const trips = this._trips.getValue();
    const index = trips.findIndex(trip => trip.id === id);
    if (index !== -1) {
      return trips[index];
    }

    return new TripModel();
  }
}
