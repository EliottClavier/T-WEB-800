import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "../../models/location/location.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {buildSearchBarFormGroupControls} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {LeisureCategory} from "../../enums/leisure-category";
import {SuggestionsStoreService} from "../../store/suggestions-store.service";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";

@Component({
  selector: 'app-single-search-bar',
  templateUrl: './single-search-bar.component.html',
  styleUrls: ['./single-search-bar.component.scss']
})
export class SingleSearchBarComponent {

  @Input() public searchForm: FormGroup = buildSearchBarFormGroupControls();

  constructor(
    private _router: Router,
    private _suggestionService: SuggestionsService,
    private _suggestionStoreService: SuggestionsStoreService,
  ) {
  }

  public onLocationOptionClick(location: Location): void {
    this.searchForm.patchValue({
      locationSearch: location.name,
      location: location,
    });

  }

  public validate(): void {
    let location: Location = this.searchForm.get('location')!.value;
    let start: Date = this.searchForm.get('start')!.value;
    let end: Date = this.searchForm.get('end')!.value;

    if (this.searchForm.valid) {
      this._router.navigate(
        ['/', 'explore', location.name],
        {
          queryParams: {
            start: getIsoStringFromDate(start),
            end: getIsoStringFromDate(end),
            lat: location.lat,
            lng: location.lng,
          }
        }
      );
    }
  }

}
