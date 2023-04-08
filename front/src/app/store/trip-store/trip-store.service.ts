import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TripModel} from "../../models/trip/trip.model";

@Injectable({
  providedIn: 'root'
})
export class TripStoreService {

  constructor() { }

  private _trips = new BehaviorSubject<TripModel[]>(new Array<TripModel>());
  private _trips$ = this._trips.asObservable();


  addTrip(trip: TripModel) {
    console.log('addTrip : ', trip);
    this._trips.next([...this._trips.getValue(), trip]);

  }

  get trip$(): Observable<TripModel[]> {
    return this._trips$;
  }

  getTrips(): TripModel[] {
    return this._trips.getValue();
  }
  deleteTrip(id: string) {
    console.log('deleteTrip : ', id);
    const trips = this._trips.getValue();
    const index = trips.findIndex(trip => trip.id === id);
    if (index !== -1) {
      trips.splice(index, 1);
      this._trips.next(trips);
    }
    console.log(this._trips.getValue().length);

  }

  getTripById(id: string) {
    const trips = this._trips.getValue();
    const index = trips.findIndex(trip => trip.id === id);
    if (index !== -1) {
      return trips[index];
    }

    return undefined;
  }
}
