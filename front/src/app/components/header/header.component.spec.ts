import { HeaderComponent } from './header.component'
import {SimpleButtonComponent} from "../buttons/simple-button/simple-button.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppModule} from "../../app.module";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let spectator: Spectator<HeaderComponent>;
  let _dialog: MatDialog;

  const dialogMock = {
    close: () => { },
    open: () => { }
  };

  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [
      AppModule
    ],
    declarations: [
      HeaderComponent,
      SimpleButtonComponent
    ],
    providers: [
      {provide: MatDialogRef, useValue: dialogMock},
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    _dialog = spectator.inject(MatDialog);
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should open login dialog', () => {
    spyOn<HeaderComponent, any>(component, 'openLoginDialog').and.callThrough();
    spyOn<MatDialog, any>(component["_dialog"], 'open').and.callThrough();
    component.openLoginDialog();
    spectator.detectChanges();
    expect(component.openLoginDialog).toHaveBeenCalled();
    expect(component["_dialog"].open).toHaveBeenCalled();
  });

  it('should open login dialog on click', () => {
    spyOn<HeaderComponent, any>(component, 'openLoginDialog').and.callThrough();
    spyOn<MatDialog, any>(component["_dialog"], 'open').and.callThrough();
    spectator.click('[header-login] button');
    spectator.detectChanges();
    expect(component.openLoginDialog).toHaveBeenCalled();
    expect(component["_dialog"].open).toHaveBeenCalled();
  });
})
