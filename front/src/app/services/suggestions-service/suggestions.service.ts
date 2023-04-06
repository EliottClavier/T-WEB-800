import {Injectable} from '@angular/core';
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {LeisureCategory} from "../../enums/leisure-category";
import {HttpClient} from "@angular/common/http";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";
import {LocationModel} from "../../models/location/location.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private preview_suggestions_url: string = '/api/preview/';
  private suggestions_url: string = '/api/suggestions/';

  constructor(private _httpclient: HttpClient, private suggestionStore: SuggestionsStoreService) {
  }

  getPreviewSuggestions(category: LeisureCategory, location: LocationModel, start: string, end: string): Observable<LeisureItemModel[]> {
    console.log(category + " " + location.name + " " + start + " " + end)

    return this._httpclient.get<LeisureItemModel[]>(`${this.preview_suggestions_url}${category.toLowerCase()}/search?location=${location.getCoordinates()}&start=${start}&end=${end}`);
  }

  getSuggestions(category: LeisureCategory, location: LocationModel, start: string, end: string): Observable<LeisureItemModel[]> {
 return this._httpclient.get<LeisureItemModel[]>(`${this.suggestions_url}${category.toLowerCase()}/search?location=${location.getCoordinates()}&start=${start}&end=${end}`);
  }
}
