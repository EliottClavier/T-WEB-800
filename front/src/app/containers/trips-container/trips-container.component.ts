import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {TranslateService} from "@ngx-translate/core";
import {TripModel} from "../../models/trip/trip.model";
import {TripStoreService} from "../../store/trip-store/trip-store.service";
import {getPdf} from "../../utils/pdf/pdf.utils";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {Router} from "@angular/router";
import {getIsoStringFromDate} from "../../utils/date.utils";
import {LocationModel} from "../../models/location/location.model";
import {FormArray, FormGroup} from "@angular/forms";

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

  constructor(private translate: TranslateService,
              public tripStore: TripStoreService,
              private tripBuilderService: TripBuilderService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.trips = this.tripStore.getTrips();

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
    this.tripStore.getTrips().forEach((trip, index) => {
      console.log(trip.name);
      trip.steps.forEach((step, index) => {
        console.log(step.name);
      })
    })
    const trip: TripModel = this.tripStore.getTripById(id);
    console.log(trip );

    this.tripBuilderService.getTripFormFromTripModel(trip);


    const location = this.tripBuilderService.searchFormsArray.controls[0].get('location')?.value;
    const start = this.tripBuilderService.searchFormsArray.controls[0].get('start')?.value;
    const end = this.tripBuilderService.searchFormsArray.controls[this.tripBuilderService.searchFormsArray.controls.length -1].get('end')?.value;

   let t = this.router.navigate(
      ['/', 'explore', location?.name],
      {
        queryParams: {
          // start: getIsoStringFromDate(start),
          // end: getIsoStringFromDate(end),

          start:"2023-06-04",
          end: "2023-06-05",
          lat: location?.lat,
          lng: location?.lng,
        }
      }
    ).finally(
      () => {
        console.log(t);
      }
   );
  }

  onDelete(id: string) {
    this.tripStore.deleteTrip(id);
  }

  onPdf(id: string) {
    const trip: TripModel | undefined = this.tripStore.getTripById(id);
    trip && getPdf(trip);
  }
}
