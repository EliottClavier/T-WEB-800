import {AfterContentChecked, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {TranslateService} from "@ngx-translate/core";
import {CardItemDetailsViewComponent} from "../card-item-details-view/card-item-details-view.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NoopScrollStrategy} from "@angular/cdk/overlay";

@Component({
  selector: 'app-card-items',
  templateUrl: './card-items-list.component.html',
  styleUrls: ['./card-items-list.component.scss']

})
export class CardItemsListComponent implements AfterContentChecked, OnDestroy {

  @Input() cardItems: LeisureItemModel[] = [];
  @Input() isToDelete: boolean = false;
  @Input() stepIndex: number = 0;
  leisureIndex: number = 0;
  emptyMessage?: string;
  itemSelected?: LeisureItemModel;
  dialogRef: MatDialogRef<CardItemDetailsViewComponent, any> | undefined;

  @Output() cardItemClicked: EventEmitter<LeisureItemModel> = new EventEmitter<LeisureItemModel>();

  constructor(private translate: TranslateService, public dialog: MatDialog) {
  }

  ngAfterContentChecked(): void {
    this.emptyMessage = this.translate.instant('nothing_to_display')
  }

  onItemClicked(index: number) {
    this.leisureIndex = index;
    this.itemSelected = this.cardItems[index];
    this.openDialog();
    this.cardItemClicked.emit(this.itemSelected);
  }

  onItemFromMapClicked(item: LeisureItemModel) {
    this.itemSelected = item;
    this.openDialog();
    this.cardItemClicked.emit(this.itemSelected);
  }

  openDialog() {
    this.dialogRef = this.dialog.open(CardItemDetailsViewComponent, {
      id: 'leisure-detail-dialog-id',
      data: {
        item: this.itemSelected,
        isToDelete: this.isToDelete,
        stepIndex: this.stepIndex,
        leisureIndex: this.leisureIndex
      },
      scrollStrategy: new NoopScrollStrategy()
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.itemSelected = undefined;
    })
  }

  ngOnDestroy(): void {

  }


}
