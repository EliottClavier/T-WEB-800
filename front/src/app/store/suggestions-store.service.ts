import {Injectable} from '@angular/core';
import {LeisureItemModel} from "../models/leisures/leisure-item.model";
import {BehaviorSubject, Subject} from "rxjs";
import {LeisureCategory} from "../enums/leisure-category";
import {LocationModel} from "../models/location/location.model";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsStoreService {


  private _suggestions$: BehaviorSubject<LeisureItemModel[]> = new BehaviorSubject<LeisureItemModel[]>(new Array<LeisureItemModel>());
  private _getCategory?: LeisureCategory;
  private _getLocation?: LocationModel;
  private _leisureItemToAdd$?: Subject<LeisureItemModel> = new Subject<LeisureItemModel>();

  constructor() {
  }

  public setLeisureItemToAdd(item: LeisureItemModel) {
    this.leisureItemToAdd$.next(item);
  }

  get leisureItemToAdd$(): Subject<LeisureItemModel> {
    return this._leisureItemToAdd$ as Subject<LeisureItemModel>;
  }

  set leisureItemToAdd$(value: Subject<LeisureItemModel>) {
    this._leisureItemToAdd$ = value;
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

  get getCategory(): LeisureCategory {
    return this.getSuggestionsData()[0]?.category as LeisureCategory || LeisureCategory.UNKNOWN;
  }

  get getLocation(): LocationModel {
    return this.getSuggestionsData()[0]?.location as LocationModel;
  }
}
