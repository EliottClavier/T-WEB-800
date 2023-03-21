import {Injectable} from '@angular/core';
import {ItemModel} from "../../models/item/item.model";
import {ItemType} from "../../models/ItemType";
import {HttpClient} from "@angular/common/http";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";
import {Location} from "../../models/location/location.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private review_suggestions_url: string = '/api/review/';


  constructor(private _httpclient: HttpClient, private suggestionStore: SuggestionsStoreService) {
  }

  getReviewSuggestions(itemType: ItemType, location : Location,): Observable<ItemModel[]> {
    return this._httpclient.get<ItemModel[]>(`${this.review_suggestions_url}${itemType.toLowerCase()}/search?location=${location.name}`);
  }
}
