import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {LeisureItemModel} from 'src/app/models/leisures/leisure-item.model';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SuggestionsStoreService} from "../../store/suggestions-store/suggestions-store.service";
import {TripBuilderService} from "../../services/trip/trip-builder.service";

@Component({
  selector: 'app-item-details-view',
  templateUrl: './card-item-details-view.component.html',
  styleUrls: ['./card-item-details-view.component.scss']
})
export class CardItemDetailsViewComponent implements OnInit {

  detailsItem?: LeisureItemModel;
  isToDelete: boolean = false;
  stepIndex: number = 0;
  leisureIndex: number = 0;
  @Output() onClose = new EventEmitter<void>();

  constructor(private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private suggestionStore: SuggestionsStoreService,
              private tripBuilderService: TripBuilderService) {

    this.detailsItem = data.item;
    data.isToDelete && (this.isToDelete = data.isToDelete);
    data.stepIndex && (this.stepIndex = data.stepIndex);
    data.leisureIndex && (this.leisureIndex = data.leisureIndex);
  }

  ngOnInit(): void {
  }

  public closeDetailCardDialog(): void {
    this.dialog.closeAll();
  }

  onAddItemToTrip(item: LeisureItemModel) {
    this.suggestionStore.setLeisureItemToAdd(item)
  }

  onDeleteItemToTrip(item: LeisureItemModel) {

    let leisures = this.tripBuilderService.searchFormsArrayControls[this.stepIndex]?.get("leisures")?.value as LeisureItemModel[];
    leisures.splice(this.leisureIndex, 1);
    this.tripBuilderService.searchFormsArrayControls[this.stepIndex]?.get("leisures")?.setValue(leisures);
    if (leisures.length === 0) {
      {
        this.dialog.closeAll();
      }
    }
  }
}
