import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemModel} from "../model/ItemModel";


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  inputs: ['cardItem']
})

export class CardItemComponent {

  @Input() cardItem: ItemModel;
  @Output() onItem = new EventEmitter<ItemModel>();

  onClickItem(cardItem: ItemModel): void {
    this.onItem.emit(cardItem);
  };

  constructor() {

    this.cardItem = new ItemModel();
  }
}

