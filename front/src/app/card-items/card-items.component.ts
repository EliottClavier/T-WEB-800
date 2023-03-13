import {Component, Input} from '@angular/core';
import {ItemModel} from "../model/ItemModel";
import {CardItemComponent} from "../card-item/card-item.component";
import {TranslateService} from "@ngx-translate/core";

  @Component({
    selector: 'app-card-items',
    templateUrl: './card-items.component.html',
  styleUrls: ['./card-items.component.scss']

})
export class CardItemsComponent {

  @Input() cardItems: ItemModel[] = [];
   emptyMessage: string;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
   this.emptyMessage =  this.translate.instant('nothing_to_display');
  }

}
