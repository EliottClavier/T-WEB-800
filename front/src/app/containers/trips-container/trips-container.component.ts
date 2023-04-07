import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CardItemDetailsViewComponent} from "../../components/card-item-details-view/card-item-details-view.component";
import {TranslateService} from "@ngx-translate/core";
import {TripModel} from "../../models/trip/trip.model";
import cypressConfig from "../../../../cypress.config";
import {TripStoreService} from "../../store/trip-store/trip-store.service";

@Component({
  selector: 'app-trips-container',
  templateUrl: './trips-container.component.html',
  styleUrls: ['./trips-container.component.scss']
})
export class TripsContainerComponent implements OnInit {
  trips: TripModel[] = [];
  // @Input() isToDelete: boolean = false;
  // @Input() stepIndex: number = 0;
   tripIndex: number = 0;
  emptyMessage?: string;
  itemSelected?: TripModel;


  @Output() tripClicked: EventEmitter<TripModel> = new EventEmitter<TripModel>();

  constructor(private translate: TranslateService, public tripStore: TripStoreService) {
  }


  ngOnInit(): void {
       this.trips = this.tripStore.getTrips();
       console.log(this.trips);
    }

  ngAfterContentChecked(): void {
    this.emptyMessage = this.translate.instant('nothing_to_display')
  }

  onItemClicked(index: number) {
    this.tripIndex = index;
    this.itemSelected = this.trips[index];

    this.tripClicked.emit(this.itemSelected);
  }



  tripToCardItem(item: TripModel) {
    return new LeisureItemModel(
      item.id,
      item.name,
      "",
      "",
      undefined,
      undefined,
      undefined,
      item.startDate + ' - ' + item.endDate,
      undefined,
      undefined);



    }


  ngOnDestroy(): void {

  }

  onUpdate(id: string) {

  }

  onDelete(id: string) {

  }
}
