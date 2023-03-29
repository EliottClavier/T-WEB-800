import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LeisureCategory} from "../../enums/leisure-category";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";

@Component({
  selector: 'app-leisure-category-filter',
  templateUrl: './leisure-category-filter.component.html',
  styleUrls: ['./leisure-category-filter.component.scss']
})
export class LeisureCategoryFilterComponent implements OnInit {
  @Output() onSelectedCategory: EventEmitter<string> = new EventEmitter<string>();
  leisureCategoryList: string[] = [];

  onSelectedLeisureCategory(value: string) {
    // this.onSelectedCategory.next(value);
  };

  ngOnInit(): void {
    this.leisureCategoryList = Object.values(LeisureCategory).map((value) => LeisureItemModel.categoryTranslateKey(value).toString());
  }


}
