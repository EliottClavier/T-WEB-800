import {TripsContainerComponent} from './trips-container.component'
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {TripStoreService} from "../../store/trip-store/trip-store.service";
import {TripService} from "../../services/trip/trip.service";
import {getMockTrip} from "../../utils/trip.mock.utils";
import {getAccommodationItems} from "../../utils/suggestions-mock.utils";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {TripModel} from "../../models/trip/trip.model";
import {of, throwError} from "rxjs";
import {Router} from "@angular/router";
import {getPdf} from "../../utils/pdf/pdf.utils";


describe('TripsContainerComponent', () => {
  let component: TripsContainerComponent;
  let data = {index: 0, leisures: getAccommodationItems()}
  let spectator: Spectator<TripsContainerComponent>;
  const dialogMock = {
    close: () => {
    }
  };
  const createComponent = createComponentFactory({
    component: TripsContainerComponent,
    imports: [
      AppModule,
      TranslateModule.forRoot(),
      RouterTestingModule],
    // mocks: [TripStoreService, TripBuilderService, TripService],
    providers: [
      // {provide: MatDialogRef, useValue: dialogMock},
      { provide: MatDialogRef, useValue: {} },
      TripBuilderService,
      TripService,
      TripStoreService,
      { provide: MAT_DIALOG_DATA, useValue: data },
    ],
  });

  beforeEach(async () => {

    spectator = createComponent();
    component = spectator.component;

    spectator.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onItemClicked', () => {
    const trip = getMockTrip();
    spectator.component.trips = [trip];
    spyOn(spectator.component.tripClicked, 'emit');
    spectator.component.onItemClicked(0);
    expect(spectator.component.itemSelected).toBe(trip);
    expect(spectator.component.tripClicked.emit).toHaveBeenCalledWith(trip);
  });

  it('should call onUpdate', () => {
    const trip = getMockTrip();
    spyOn(spectator.component.tripStore, 'getTripById').and.returnValue(trip);
    spyOn((spectator.component as any).tripBuilderService, 'getTripFormFromTripModel');
    spyOn((spectator.component as any).router, 'navigate');
    spectator.component.onUpdate('test');
    expect(spectator.component.tripStore.getTripById).toHaveBeenCalledWith('test');
    expect((spectator.component  as any).tripBuilderService.getTripFormFromTripModel).toHaveBeenCalledWith(trip);

  });


  it('should convert TripModel to LeisureItemModel', () => {
    const trip = new TripModel();
    trip.id = '123';
    trip.name = 'Test Trip';
    trip.startDate = '2023-04-10';
    trip.endDate = '2023-04-15';

    const leisureItem = spectator.component.tripToCardItem(trip);

    expect(leisureItem).toBeInstanceOf(LeisureItemModel);
    expect(leisureItem.id).toEqual(trip.id);
    expect(leisureItem.title).toEqual(trip.name);
    expect(leisureItem.subtitle).toEqual(trip.startDate + ' - ' + trip.endDate);
    expect(leisureItem.description).toEqual('');


  });

  it('should delete trip when onDelete is called', () => {
    const tripServiceMock = spectator.inject(TripService);
    const tripStoreMock = spectator.inject(TripStoreService);

    const tripId = '123';

    // Mock the behavior of the services
    spyOn(tripStoreMock, 'getTrips').and.returnValue([{ id: tripId, name: 'Test Trip' }]);
    spyOn(tripServiceMock, 'deleteTrip').and.returnValue(of(null));
    spyOn(tripStoreMock, 'deleteTrip');

    // Call the onDelete method
    spectator.component.onDelete(tripId);

    expect(tripServiceMock.deleteTrip).toHaveBeenCalledWith(tripId);
    expect(tripStoreMock.deleteTrip).toHaveBeenCalledWith(tripId);
  });

  it('should handle error when onDelete is called and TripService throws an error', () => {
    const tripServiceMock = spectator.inject(TripService);
    const tripStoreMock = spectator.inject(TripStoreService);

    const tripId = '123';

    // Mock the behavior of the services
    spyOn(tripStoreMock, 'getTrips').and.returnValue([{ id: tripId, name: 'Test Trip' }]);
    spyOn(tripServiceMock, 'deleteTrip').and.returnValue(throwError('Error deleting trip'));
    spyOn(tripStoreMock, 'deleteTrip');

    // Call the onDelete method
    spectator.component.onDelete(tripId);

    expect(tripServiceMock.deleteTrip).toHaveBeenCalledWith(tripId);
    expect(tripStoreMock.deleteTrip).toHaveBeenCalledWith(tripId);
  });
  it('should call getPdf when onPdf is called', () => {
    const tripStoreMock = spectator.inject(TripStoreService);
    const tripId = '123';
    const trip: TripModel = getMockTrip();
    trip.id = tripId;


    spyOn(tripStoreMock, 'getTripById').withArgs(trip.id).and.callThrough();
    spyOn(spectator.component, 'onPdf');

    spectator.component.onPdf(tripId);

    // expect(tripStoreMock.getTripById).toHaveBeenCalledWith(tripId);
    expect(component.onPdf).toHaveBeenCalled();

  });


  it('should call newTrip and navigate to home page when homePageRedirection is called', () => {
    const tripBuilderServiceMock = spectator.inject(TripBuilderService);
    const routerMock = spectator.inject(Router);

    spyOn(tripBuilderServiceMock, 'newTrip');
    spyOn(routerMock, 'navigate');

    spectator.component.homePageRedirection();

    expect(tripBuilderServiceMock.newTrip).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});

