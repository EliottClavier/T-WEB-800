import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LeisureItemModel} from 'src/app/models/leisure/leisure-item.model';

@Component({
  selector: 'app-item-details-view',
  templateUrl: './card-item-details-view.component.html',
  styleUrls: ['./card-item-details-view.component.scss']
})
export class CardItemDetailsViewComponent {

  @Input() detailsItem?: LeisureItemModel;
  @Output() onClose = new EventEmitter<void>();
  @Output() onAddToTrip = new EventEmitter<LeisureItemModel>();


  onCloseDetailsView() {
    this.onClose.emit();
    this.detailsItem = undefined;
  }

  onAddItemToTrip(item: LeisureItemModel) {
    this.onAddToTrip.emit(item);
    console.log('add to trip');
  }
}
