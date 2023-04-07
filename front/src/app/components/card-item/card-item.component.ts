import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  inputs: ['cardItem']
})

export class CardItemComponent implements OnInit{

  @Input() cardItem: LeisureItemModel;
  @Output() onItem = new EventEmitter<LeisureItemModel>();


  onClickItem(cardItem: LeisureItemModel): void {
    this.onItem.emit(cardItem);
  };

  constructor() {
    this.cardItem = new LeisureItemModel();
  }

  ngOnInit(): void {
  }
}
