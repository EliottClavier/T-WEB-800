import {Injectable} from '@angular/core';
import {LeisureItemModel} from "../../models/leisure/leisure-item.model";
import {LeisureCategory} from "../../enums/leisure-category";
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

  getPreviewSuggestions(category: LeisureCategory, location : Location, date : string | undefined): Observable<LeisureItemModel[]> {
    return this._httpclient.get<LeisureItemModel[]>(`${this.review_suggestions_url}${category.toLowerCase()}/search?location=${location.getCoordinates()}&date=${date}`);
  }

  getSuggestions(category: LeisureCategory, location: Location, date : string |undefined ): Observable<LeisureItemModel[]> {
    return this._httpclient.get<LeisureItemModel[]>(`${this.review_suggestions_url}${category.toLowerCase()}/search?location=${location.getCoordinates()}&date=${date}`);
  }
}
