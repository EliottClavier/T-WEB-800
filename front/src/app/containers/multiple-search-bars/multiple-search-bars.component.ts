import {Component, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchBarEvent} from "../../types/search-bar-event.type";

@Component({
  selector: 'app-multiple-search-bars',
  templateUrl: './multiple-search-bars.component.html',
  styleUrls: ['./multiple-search-bars.component.scss']
})
export class MultipleSearchBarsComponent {

  @Input() public searchForms: FormGroup = new FormGroup({
    searchFormsArray: new FormArray<FormGroup>([
      new FormGroup({}),
    ]),
  });

  public activeSearchBar: SearchBarEvent = {
    index: 0,
    isEditing: false,
  };

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

  get lastSearchBar(): FormGroup {
    return this.searchFormsArrayControls[this.searchFormsArrayControls.length - 1];
  }

  public addSearchBar(): void {
    let newFormGroup: FormGroup = new FormGroup({});
    if (this.lastSearchBar.get("end")?.value) {
      newFormGroup.addControl(
        "start", new FormControl<Date | null>(this.lastSearchBar.get("end")?.value, [ Validators.required ])
      );
    }
    this.searchFormsArray.push(newFormGroup);
    this.activeSearchBar = {
      index: this.searchFormsArrayControls.length - 1,
      isEditing: true,
    };
  }

  public removeSearchBar(index: number): void {
    this.activeSearchBar = {
      index: index > 0 ? index - 1 : index,
      isEditing: false,
    };
    this.searchFormsArrayControls.length > 1 && this.searchFormsArray.removeAt(index);
  }

  public onSearchBarSelect(event: SearchBarEvent): void {
    this.activeSearchBar = event;
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
