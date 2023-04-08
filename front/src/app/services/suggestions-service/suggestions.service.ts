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

  private preview_suggestions_url: string = '/api';
  private suggestions_url: string = '/api';

  constructor(private _httpclient: HttpClient, private suggestionStore: SuggestionsStoreService) {
  }

  getPreviewSuggestions(category: LeisureCategory, location: LocationModel, start: string, end: string): Observable<LeisureItemModel[]> {
    !end && (end = start);
    category === LeisureCategory.UNKNOWN && (category = LeisureCategory.ACCOMMODATION);
    return this._httpclient.get<LeisureItemModel[]>(`${this.preview_suggestions_url}/${this.getCategoryNormalizedName(category)}/preview/search?location=${location.getCoordinates()}&start=${start}&end=${end}`);
  }

  getSuggestions(category: LeisureCategory, location: LocationModel, start: string, end: string = start): Observable<LeisureItemModel[]> {
    !end && (end = start);
    category === LeisureCategory.UNKNOWN && (category = LeisureCategory.ACCOMMODATION);
    return this._httpclient.get<LeisureItemModel[]>(`${this.suggestions_url}/${this.getCategoryNormalizedName(category)}/search?location=${location.getCoordinates()}&start=${start}&end=${end}`);
  }

  getCategoryNormalizedName(category: LeisureCategory): string {
    switch (category) {
      case LeisureCategory.ACCOMMODATION:
        return 'accommodation';
      case LeisureCategory.BAR:
        return 'bar';
      case LeisureCategory.SPORTING_EVENT:
        return 'sport';
      case LeisureCategory.CULTURAL_EVENT:
        return 'culture';
      case LeisureCategory.RESTAURANT:
        return 'restaurant';
      case LeisureCategory.UNKNOWN:
        return 'accommodation';
      default:
        return 'accommodation';
    }
  }
}
