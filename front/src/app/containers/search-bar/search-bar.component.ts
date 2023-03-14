import {Component, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Location} from "../../models/location/location.model";
import {Router} from "@angular/router";
import {getDateFromIsoString} from "../../utils/date.utils";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() public multipleSearch: boolean = false;

  public searchForms: FormGroup = new FormGroup({
    searchFormsArray: new FormArray<FormGroup>([
      new FormGroup({}),
    ]),
  });

  constructor(
    private _router: Router,
  ) {
  }

  get searchFormsArray(): FormArray {
    return this.searchForms.get('searchFormsArray') as FormArray;
  }

  get searchFormsArrayControls(): FormGroup[] {
    return this.searchFormsArray.controls as FormGroup[];
  }

  public addSearchBar(): void {
    this.searchFormsArray.push(new FormGroup({}));
  }

  public removeSearchBar(index: number): void {
    this.searchFormsArrayControls.length > 1 && this.searchFormsArray.removeAt(index);
  }

  public moveSearchBar(index: number, down: boolean): void {
    if ((down && index < this.searchFormsArray.length - 1) || (!down && index > 0)) {
      let searchBar = this.searchFormsArray.at(down ? index + 1 : index);
      this.removeSearchBar(down ? index + 1 : index);
      this.searchFormsArray.insert(down ? index : index - 1, searchBar);
    }
  }

  public validate(): void {
    const form: FormGroup = this.searchFormsArrayControls[0];
    let location: Location = form.get('location')!.value;
    let start: Date = form.get('start')!.value;
    let end: Date = form.get('end')!.value;

    if (location && start && end) {
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
