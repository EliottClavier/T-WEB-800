import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { SaveTripDialogComponent } from './save-trip-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AppModule} from "../../app.module";







describe('SaveTripDialogComponent', () => {
  let spectator: Spectator<SaveTripDialogComponent>;
  let dialogRef : MatDialogRef<SaveTripDialogComponent> ;
  const dialogMock = {
    close: () => {

    }
  }
  const createComponent = createComponentFactory({
    component: SaveTripDialogComponent,
    imports: [AppModule],
    providers: [
      { provide: MatDialogRef, useValue: dialogMock },
      {
        provide: MAT_DIALOG_DATA,
        useValue: 'Test Data',
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    dialogRef = spectator.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should close the dialog on onNoClick', () => {
    spyOn(dialogRef, 'close');
    spectator.component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog with data on onOKClick', () => {
     spyOn(dialogRef, 'close');
    spectator.component.onOKClick();
    expect(dialogRef.close).toHaveBeenCalledWith('Test Data');
  });
});
