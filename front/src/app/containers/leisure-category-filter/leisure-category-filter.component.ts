import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LeisureCategory} from "../../enums/leisure-category";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";

@Component({
  selector: 'app-leisure-category-filter',
  templateUrl: './leisure-category-filter.component.html',
  styleUrls: ['./leisure-category-filter.component.scss']
})
export class LeisureCategoryFilterComponent implements OnInit {
  @Output() onSelectedCategory: EventEmitter<LeisureCategory> = new EventEmitter<LeisureCategory>();
  leisureCategoryList: string[] = [];

  onSelectedLeisureCategory(value: number) {
    let category: LeisureCategory = this.getCategoryEnum(this.leisureCategoryList[value]);
    this.onSelectedCategory.next(category);
  };

  ngOnInit(): void {
    this.leisureCategoryList = Object.values(LeisureCategory).map((value) => LeisureItemModel.categoryTranslateKey(value).toString());
    this.leisureCategoryList = this.leisureCategoryList.filter((value) => value != "unknown");
    this.leisureCategoryList = this.leisureCategoryList.sort(function (x, y) {
      return x.toString().localeCompare(y.toString());
    });

  }

  getCategoryEnum(value: string): LeisureCategory {

    switch (value) {
      case 'leisure_category_accommodations':
        return LeisureCategory.ACCOMMODATION
      case 'leisure_category_bar':
        return LeisureCategory.BAR
      case 'leisure_category_restaurant':
        return LeisureCategory.RESTAURANT
      case 'leisure_category_cultural_event':
        return LeisureCategory.CULTURAL_EVENT
      case 'leisure_category_sporting_event':
        return LeisureCategory.SPORTING_EVENT
      default:

        return LeisureCategory.UNKNOWN
    }
  }

}
