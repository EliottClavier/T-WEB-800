import {Injectable} from '@angular/core';
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {LeisureCategory} from "../../enums/leisure-category";
import {HttpClient} from "@angular/common/http";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";
import {LocationModel} from "../../models/location/location.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private preview_suggestions_url: string = '/api/preview/';
  private suggestions_url: string = '/api/suggestions/';

  constructor(private _httpclient: HttpClient, private suggestionStore: SuggestionsStoreService) {
  }

  getPreviewSuggestions(category: LeisureCategory, location: LocationModel, start: string, end: string): Observable<LeisureItemModel[]> {
    !end && (end = start);
    category === LeisureCategory.UNKNOWN && (category = LeisureCategory.ACCOMMODATION);
    return this._httpclient.get<LeisureItemModel[]>(`/api/${category.toLowerCase()}/preview/search?location=${location.getCoordinates()}&start=${start}&end=${end}`)
      .pipe(
        map((items: LeisureItemModel[]) => {
          return items.map((item: LeisureItemModel) => Object.assign(new LeisureItemModel(), item));
        })
      )
  }

  getSuggestions(category: LeisureCategory, location: LocationModel, start: string, end: string = start): Observable<LeisureItemModel[]> {
    !end && (end = start);
    category === LeisureCategory.UNKNOWN && (category = LeisureCategory.ACCOMMODATION);
    return this._httpclient.get<LeisureItemModel[]>(`/api${category.toLowerCase()}/search?location=${location.getCoordinates()}&start=${start}&end=${end}`)
      .pipe(
        map((items: LeisureItemModel[]) => {
          return items.map((item: LeisureItemModel) => Object.assign(new LeisureItemModel(), item));
        })
      );
  }
}
