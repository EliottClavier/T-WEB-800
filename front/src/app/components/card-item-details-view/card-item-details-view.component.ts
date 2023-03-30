import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {LeisureItemModel} from 'src/app/models/leisures/leisure-item.model';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {debounceTime} from "rxjs";


@Component({
  selector: 'app-item-details-view',
  templateUrl: './card-item-details-view.component.html',
  styleUrls: ['./card-item-details-view.component.scss']
})
export class CardItemDetailsViewComponent  {

  // @Input() detailsItem?: LeisureItemModel;
   detailsItem?: LeisureItemModel;
  @Output() onClose = new EventEmitter<void>();
  @Output() onAddToTrip = new EventEmitter<LeisureItemModel>();

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.detailsItem = data.item;
  }


  onCloseDetailsView() {
    this.onClose.emit();
    this.detailsItem = undefined;
  }

  onAddItemToTrip(item: LeisureItemModel) {
    this.onAddToTrip.emit(item);
    console.log('add to trip');
  }

}
