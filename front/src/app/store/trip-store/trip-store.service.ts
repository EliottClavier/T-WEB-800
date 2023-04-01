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


  // get trip(): BehaviorSubject<TripModel[]> {
  //   return this._trips;
  // }
  //
  // set trip(value: BehaviorSubject<TripModel[]>) {
  //   this._trips = value;
  // }

  addTrip(trip: TripModel) {
    this._trips.next([...this._trips.getValue(), trip]);

  }

  get trip$(): Observable<TripModel[]> {
    return this._trips$;
  }

  getTrip(): TripModel[] {
    return this._trips.getValue();
  }

}
