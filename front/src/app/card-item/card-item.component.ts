import { Component } from '@angular/core';
import {CardItem} from "../model/CardItem";



@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {

  cardItem: CardItem ;

  constructor() {
  this.cardItem  = new CardItem();
  }


}
