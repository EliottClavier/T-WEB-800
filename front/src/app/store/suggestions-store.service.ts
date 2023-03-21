import {Injectable} from '@angular/core';
import {ItemModel} from "../models/item/item.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsStoreService {


   private _suggestions$: BehaviorSubject<ItemModel[]> = new BehaviorSubject<ItemModel[]>(new Array<ItemModel>());


  constructor() {
    // this._suggestions.subscribe((suggestions) => {
    //   console.log('suggestions', suggestions);
    // });
  }


  public get suggestions$(): BehaviorSubject<ItemModel[]> {
    return this._suggestions$;
  }

  public set suggestions$(value: BehaviorSubject<ItemModel[]>) {
    this._suggestions$ = value;
  }

  public getSuggestionsData(): ItemModel[] {
    return this._suggestions$.getValue();
  }

  public setSuggestionsData(data: ItemModel[]) {
    this._suggestions$.next(data);

  }



}
