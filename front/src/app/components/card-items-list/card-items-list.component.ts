import {AfterContentChecked, Component, EventEmitter, Input, Output} from '@angular/core';
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {TranslateService} from "@ngx-translate/core";
import {CardItemDetailsViewComponent} from "../card-item-details-view/card-item-details-view.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-card-items',
  templateUrl: './card-items-list.component.html',
  styleUrls: ['./card-items-list.component.scss']

})
export class CardItemsListComponent implements AfterContentChecked {

  @Input() cardItems: LeisureItemModel[] = [];
  emptyMessage?: string;
  itemSelected?: LeisureItemModel;
  dialogRef: MatDialogRef<CardItemDetailsViewComponent, any> | undefined;

  @Output() cardItemClicked: EventEmitter<LeisureItemModel> = new EventEmitter<LeisureItemModel>();


  constructor(private translate: TranslateService, public dialog: MatDialog) {
  }

  ngAfterContentChecked(): void {
    this.emptyMessage = this.translate.instant('nothing_to_display')
  }

  onItemClicked($event: LeisureItemModel) {
    this.itemSelected = $event;
    this.openDialog();


    this.cardItemClicked.emit($event);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CardItemDetailsViewComponent, {
      id: 'leisure-detail-dialog-id',
      data: {item: this.itemSelected}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.itemSelected = undefined;
    })

  }
}
