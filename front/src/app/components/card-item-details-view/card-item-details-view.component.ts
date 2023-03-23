import {Component, EventEmitter, Input, Output} from '@angular/core';
import { LeisureItemModel } from 'src/app/models/Leisure/leisure.item.model';

@Component({
  selector: 'app-item-details-view',
  templateUrl: './card-item-details-view.component.html',
  styleUrls: ['./card-item-details-view.component.scss']
})
export class CardItemDetailsViewComponent {

@Input() detailsItem?: LeisureItemModel;
@Output() onClose = new EventEmitter<void>();


  onCloseDetailsView() {
    this.onClose.emit();
    this.detailsItem = undefined;
  }
}
