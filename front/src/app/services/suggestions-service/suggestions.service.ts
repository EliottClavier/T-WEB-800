import {Injectable} from '@angular/core';
import {ItemModel} from "../../models/item/item.model";
import {ItemType} from "../../models/ItemType";
import {HttpClient} from "@angular/common/http";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private suggestions_url: string = 'http://localhost:3000/suggestions';


  constructor(private _httpclient: HttpClient, private suggestionStore: SuggestionsStoreService) {

  }

  getSuggestions(itemType: ItemType): void {
    this._httpclient.get('suggestions_url' + '/itemType').subscribe({

      next: (data ) => {
        this.suggestionStore.suggestions.next(data as ItemModel[]);
      },

      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');

      }
    });
  }
}
