import {AfterContentChecked, Component, EventEmitter, Input, Output} from '@angular/core';
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-card-items',
  templateUrl: './card-items-list.component.html',
  styleUrls: ['./card-items-list.component.scss']

})
export class CardItemsListComponent implements AfterContentChecked {

  @Input() cardItems: LeisureItemModel[] = [];
  emptyMessage?: string;

  @Output() cardItemClicked: EventEmitter<LeisureItemModel> = new EventEmitter<LeisureItemModel>();


  constructor(private translate: TranslateService) {
  }

  ngAfterContentChecked(): void {
    this.emptyMessage = this.translate.instant('nothing_to_display')
  }

  onItemClicked($event: LeisureItemModel) {
    this.cardItemClicked.emit($event);
  }
}
