import {Component, Input} from '@angular/core';
import {CardItem} from "../model/CardItem";


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {

  @Input() private _cardItem: CardItem = new CardItem();


}

8
