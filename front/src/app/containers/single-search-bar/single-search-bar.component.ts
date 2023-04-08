import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LocationModel} from "../../models/location/location.model";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {buildStepFormGroupControls} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {SuggestionsService} from "../../services/suggestions-service/suggestions.service";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";
import {TripBuilderService} from "../../services/trip/trip-builder.service";

@Component({
  selector: 'app-single-search-bar',
  templateUrl: './single-search-bar.component.html',
  styleUrls: ['./single-search-bar.component.scss']
})
export class SingleSearchBarComponent {

  @Input() public searchForm: FormGroup = buildStepFormGroupControls();

  constructor(
    private _router: Router,
    private _suggestionService: SuggestionsService,
    private _suggestionStoreService: SuggestionsStoreService,
    private tripBuilderService: TripBuilderService,
  ) {
  }

  public onLocationOptionClick(location: LocationModel): void {
    this.searchForm.setValue({
      locationSearch: location.name,
      location: new LocationModel(location.id, location.name, location.lat, location.lng),
    });
  }

  public validate(): void {
    let location: LocationModel = this.searchForm.get('location')!.value;
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
