import {Injectable} from '@angular/core';
import {ItemModel} from "../models/item/item.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsStoreService {


   private _suggestions: BehaviorSubject<ItemModel[]> = new BehaviorSubject<ItemModel[]>(new Array<ItemModel>());


  constructor() {
    this._suggestions.subscribe((suggestions) => {
      console.log('suggestions', suggestions);
    });
  }


  get suggestions(): BehaviorSubject<ItemModel[]> {
    return this._suggestions;
  }

  set suggestions(value: BehaviorSubject<ItemModel[]>) {
    this._suggestions = value;
  }


  public get suggestionsData(): ItemModel[] {
    return this._suggestions.getValue();
  }
  public set suggestionsData(data: ItemModel[]) {
    this._suggestions.next(data);
  }


}
