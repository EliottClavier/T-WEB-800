import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {LeisureItemModel} from 'src/app/models/leisures/leisure-item.model';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";

@Component({
  selector: 'app-item-details-view',
  templateUrl: './card-item-details-view.component.html',
  styleUrls: ['./card-item-details-view.component.scss']
})
export class CardItemDetailsViewComponent {

  detailsItem?: LeisureItemModel;
  @Output() onClose = new EventEmitter<void>();

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private suggestionStore: SuggestionsStoreService) {
    this.detailsItem = data.item;
  }

  onCloseDetailsView() {
    this.onClose.emit();
    this.detailsItem = undefined;
  }

  onAddItemToTrip(item: LeisureItemModel) {
    this.suggestionStore.setLeisureItemToAdd(item)
  }
}
