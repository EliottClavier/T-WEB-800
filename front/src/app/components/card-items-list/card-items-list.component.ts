import {AfterContentChecked, Component, Input} from '@angular/core';
import {LeisureItemModel} from "../../models/Leisure/leisure.item.model";
import {CardItemComponent} from "../card-item/card-item.component";
import {TranslateService} from "@ngx-translate/core";

  @Component({
    selector: 'app-card-items',
    templateUrl: './card-items-list.component.html',
  styleUrls: ['./card-items-list.component.scss']

})
export class CardItemsListComponent implements AfterContentChecked{

  @Input() cardItems: LeisureItemModel[] = [];
   emptyMessage?: string;

  constructor(private translate: TranslateService) {
  }

    ngAfterContentChecked(): void {
      this.emptyMessage = this.translate.instant('nothing_to_display')
    }
}
