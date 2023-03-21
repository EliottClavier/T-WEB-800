import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchBarEvent} from "../../types/search-bar-event.type";
import {buildSearchBarFormGroupControls} from "../../utils/search-bar-form-group/search-bar-form-group.utils";

@Component({
  selector: 'app-multiple-search-bars',
  templateUrl: './multiple-search-bars.component.html',
  styleUrls: ['./multiple-search-bars.component.scss']
})
export class MultipleSearchBarsComponent {

  @Input() public searchForms: FormGroup = new FormGroup({
    searchFormsArray: new FormArray<FormGroup>([
      buildSearchBarFormGroupControls(),
    ]),
  });

  @Input() public activeSearchBar: SearchBarEvent = {
    index: 0,
    isEditing: false,
  };
  @Output() public activeSearchBarChange: EventEmitter<SearchBarEvent> = new EventEmitter<SearchBarEvent>();

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
    let newFormGroup: FormGroup = buildSearchBarFormGroupControls();
    if (this.lastSearchBar.get("end")?.value) {
      newFormGroup.setControl(
        "start", new FormControl<Date | null>(this.lastSearchBar.get("end")?.value, [ Validators.required ])
      );
    }
    this.searchFormsArray.push(newFormGroup);

    this.activeSearchBar = {
      index: this.searchFormsArrayControls.length - 1,
      isEditing: true,
    };
    this.activeSearchBarChange.emit(this.activeSearchBar);
  }

  public removeSearchBar(index: number): void {
    this.activeSearchBar = {
      index: index > 0 ? index - 1 : index,
      isEditing: false,
    };
    this.searchFormsArrayControls.length > 1 && this.searchFormsArray.removeAt(index);
    this.activeSearchBarChange.emit(this.activeSearchBar);
  }

  public onSearchBarSelect(event: SearchBarEvent): void {
    this.activeSearchBar = event;
    this.activeSearchBarChange.emit(this.activeSearchBar);
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
