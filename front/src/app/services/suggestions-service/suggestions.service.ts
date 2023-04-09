import {Injectable} from '@angular/core';
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {LeisureCategory} from "../../enums/leisure-category";
import {HttpClient} from "@angular/common/http";
import {LocationModel} from "../../models/location/location.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private base_url: string = '/api';

  constructor(private _httpclient: HttpClient) {
  }

  getPreviewSuggestions(category: LeisureCategory, location: LocationModel, start: string, end: string): Observable<LeisureItemModel[]> {
    !end && (end = start);
    category === LeisureCategory.UNKNOWN && (category = LeisureCategory.ACCOMMODATION);
    return this._httpclient.get<LeisureItemModel[]>(`${this.base_url}/${this.getCategoryNormalizedName(category)}/preview/search?location=${location.getCoordinates()}&start=${start}&end=${end}`)
      .pipe(
        map((items: LeisureItemModel[]) => {
          return items.map((item: LeisureItemModel) => Object.assign(new LeisureItemModel(), item));
        })
      )
  }

  getSuggestions(category: LeisureCategory, location: LocationModel, start: string, end: string = start): Observable<LeisureItemModel[]> {
    !end && (end = start);
    category === LeisureCategory.UNKNOWN && (category = LeisureCategory.ACCOMMODATION);
    return this._httpclient.get<LeisureItemModel[]>(`${this.base_url}/${this.getCategoryNormalizedName(category)}/search?location=${location.getCoordinates()}&start=${start}&end=${end}`)
      .pipe(
        map((items: LeisureItemModel[]) => {
          return items.map((item: LeisureItemModel) => Object.assign(new LeisureItemModel(), item));
        })
      );
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
