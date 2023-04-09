import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppModule} from "../../app.module";
import {UserLeisuresDialogComponent} from "./user-leisures-dialog.component";
import {TripBuilderService} from "../../services/trip/trip-builder.service";
import {getAccommodationItems} from "../../utils/suggestions-mock.utils";
import {getMockTripForm} from "../../utils/trip.mock.utils";
import {
  buildStepFormGroupControls,
  buildStepFormGroupControlsDetails
} from "../../utils/search-bar-form-group/search-bar-form-group.utils";
import {FormArray, FormGroup} from "@angular/forms";

describe('UserLeisuresDialogComponent', () => {
  let component: UserLeisuresDialogComponent;
  let tripBuilderService: TripBuilderService;
  let spectator: Spectator<UserLeisuresDialogComponent>;

  const dialogMock = {
    close: () => {
    }
  };
  let data = {index: 0, leisures: getAccommodationItems()}
  const createComponent = createComponentFactory({
    component: UserLeisuresDialogComponent,
    imports: [
      AppModule,

    ], mocks: [
    ],
    providers: [
      { provide: MatDialogRef, useValue: {} },
      TripBuilderService,
       { provide: MAT_DIALOG_DATA, useValue: data },
    ],
  });

  beforeEach(async () => {

    spectator = createComponent();
    component = spectator.component;

    spectator.detectChanges()
    tripBuilderService = spectator.inject(TripBuilderService);
    tripBuilderService.stepsForms =  new FormGroup({
      searchFormsArray: new FormArray<FormGroup>([
        buildStepFormGroupControlsDetails(),
      ]),
    });
  });

  it('should create', () => {
    component.stepFormInfo.leisures = getAccommodationItems()
    expect(component).toBeTruthy();
  });
});
