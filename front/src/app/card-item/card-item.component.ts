import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardItem} from "../model/CardItem";


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})

export class CardItemComponent {

  @Input() cardItem: CardItem = new CardItem();
  @Output() onItem =  new EventEmitter<CardItem>();

  onClickItem(cardItem: CardItem): void{
    this.onItem.emit(cardItem);
  };

}

