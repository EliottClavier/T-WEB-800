import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "../../models/location/location.model";
import {getDateFromIsoString} from "../../utils/date.utils";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {ItemType} from "../../models/ItemType";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";
import {ItemModel} from "../../models/item/item.model";

@Component({
  selector: 'app-single-search-bar',
  templateUrl: './single-search-bar.component.html',
  styleUrls: ['./single-search-bar.component.scss']
})
export class SingleSearchBarComponent {

  @Input() public searchForm: FormGroup = new FormGroup<any>({});

  constructor(
    private _router: Router,
    private _suggestionService: SuggestionsService,
    private _suggestionStoreService: SuggestionsStoreService,
  ) {
  }

  public onLocationOptionClick(location: Location): void {
    this.searchForm.patchValue({
      locationSearch: location.getName,
      location: location,
    });
    this._suggestionService.getReviewSuggestions(ItemType.ACCOMMODATION, location).subscribe(
      {
        next: (suggestions) => {
            this._suggestionStoreService.setSuggestionsData(suggestions);
        },
        error: (err) => {
          this._suggestionStoreService.setSuggestionsData(new Array<ItemModel>());
        }
      }
    );
  }

  public validate(): void {
    let location: Location = this.searchForm.get('location')!.value;
    let start: Date = this.searchForm.get('start')!.value;
    let end: Date = this.searchForm.get('end')!.value;

    if (this.searchForm.valid) {
      this._router.navigate(
        ['/', 'explore', location.getName],
        {
          queryParams: {
            start: getDateFromIsoString(start),
            end: getDateFromIsoString(end)
          }
        }
      );
    }
  }

}
