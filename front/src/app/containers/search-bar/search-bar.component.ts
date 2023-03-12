import {Component, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Location} from "../../models/location/location.model";

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

  public validate(): void {
  }

}
