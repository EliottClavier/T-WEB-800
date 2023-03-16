import {Component, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Location} from "../../models/location/location.model";
import {Router} from "@angular/router";
import {getDateFromIsoString} from "../../utils/date.utils";

@Component({
  selector: 'app-multiple-search-bars',
  templateUrl: './multiple-search-bars.component.html',
  styleUrls: ['./multiple-search-bars.component.scss']
})
export class MultipleSearchBarsComponent {

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

  /*
  public moveSearchBar(index: number, down: boolean): void {
    if ((down && index < this.searchFormsArray.length - 1) || (!down && index > 0)) {
      let searchBar = this.searchFormsArray.at(down ? index + 1 : index);
      this.removeSearchBar(down ? index + 1 : index);
      this.searchFormsArray.insert(down ? index : index - 1, searchBar);
    }
  }
  */

}
