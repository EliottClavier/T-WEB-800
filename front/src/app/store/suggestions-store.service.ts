import {Injectable} from '@angular/core';
import {LeisureItemModel} from "../models/leisures/leisure-item.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsStoreService {

   private _suggestions$: BehaviorSubject<LeisureItemModel[]> = new BehaviorSubject<LeisureItemModel[]>(new Array<LeisureItemModel>());

  constructor() {
  }

  public get suggestions$(): BehaviorSubject<LeisureItemModel[]> {
    return this._suggestions$;
  }

  public set suggestions$(value: BehaviorSubject<LeisureItemModel[]>) {
    this._suggestions$ = value;
  }

  public getSuggestionsData(): LeisureItemModel[] {
    return this._suggestions$.getValue();
  }

  public setSuggestionsData(data: LeisureItemModel[]) {
    this._suggestions$.next(data);

  }
}
