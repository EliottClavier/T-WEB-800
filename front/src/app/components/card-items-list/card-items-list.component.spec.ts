import {CardItemsListComponent} from './card-items-list.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {LeisureItemModel} from "../../models/leisures/leisure-item.model";
import {AppModule} from "../../app.module";
import {TranslateService} from "@ngx-translate/core";
import {getAccommodationItems} from "../../utils/suggestions-mock.utils";
import {OverlayContainer} from "@angular/cdk/overlay";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CardItemDetailsViewComponent} from "../card-item-details-view/card-item-details-view.component";
import {Observable, of} from "rxjs";


describe('CardItemsComponent', () => {
  let spectator: Spectator<CardItemsListComponent>;
  let threeCardItems: LeisureItemModel[];
  let component: CardItemsListComponent;
  let overlayContainer: OverlayContainer;
  let dialog: MatDialog;

  const createComponent = createComponentFactory({
    component: CardItemsListComponent,
    imports: [AppModule,],
    providers: [TranslateService],
  });
  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    overlayContainer = spectator.inject(OverlayContainer);
    dialog = spectator.inject(MatDialog);
  })
  afterEach(() => {
    // Ensure that the overlay container is cleared after each test
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('Cards Display', () => {

    beforeEach(() => {
      spectator = createComponent();

      threeCardItems = new Array<LeisureItemModel>();
      for (let i = 0; i < 6; i++) {
        threeCardItems.push(new LeisureItemModel());
      }
    });

    it('should display 6 items elements', () => {
      let items = getAccommodationItems()
      spectator.setInput('cardItems', items);
      spectator.detectChanges();
      let itemsElementsLength = spectator.queryAll('app-card-item').length;
      expect(itemsElementsLength).toEqual(items.length);
    });
    it('should display empty message if array elements is empty', () => {

      const translateService = spectator.inject(TranslateService);
      spectator.setInput('cardItems', [] as LeisureItemModel[]);

      expect(spectator.query('[data-cy-card-component-empty]')).toHaveText(translateService.instant('nothing_to_display'));
    });

    it('should open a dialog with the details of the item', () => {

      spectator.component.openDialog();
      const dialogRef = spectator.inject(MatDialog).getDialogById('leisure-detail-dialog-id');

      expect(dialogRef).toBeTruthy();

      const closeButton = overlayContainer.getContainerElement().querySelector('[mat-dialog-close]');
      closeButton?.dispatchEvent(new MouseEvent('click'));
      spectator.detectChanges();

    });
    it('should reset itemSelected when dialogRef is closed', () => {
      const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<CardItemDetailsViewComponent>>({
        afterClosed: of(null),
      });
      spyOn(dialog, 'open').and.returnValue(dialogRefSpy);
      spectator.component.itemSelected = getAccommodationItems()[0];

      spectator.component.openDialog();

      expect(spectator.component.itemSelected).toBeUndefined();
    });

    it('should emit cardItemClicked event when onItemFromMapClicked is called', () => {
      const item: LeisureItemModel = getAccommodationItems()[0];
      spyOn(component.cardItemClicked, 'emit');

      component.onItemFromMapClicked(item);

      expect(component.itemSelected).toEqual(item);
      expect(component.cardItemClicked.emit).toHaveBeenCalledWith(item);
    });
  });
});
