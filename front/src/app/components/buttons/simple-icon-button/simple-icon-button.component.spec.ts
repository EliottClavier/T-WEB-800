import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../../app.module";
import {SimpleIconButtonComponent} from "./simple-icon-button.component";

describe('SimpleIconButtonComponent', () => {
  let component: SimpleIconButtonComponent;
  let spectator: Spectator<SimpleIconButtonComponent>;

  const createComponent = createComponentFactory({
    component: SimpleIconButtonComponent,
    imports: [ AppModule ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;

    component.icon = "home";

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat-button with specific icon', () => {
    expect(spectator.query('button[mat-icon-button][simple-icon-button]')).toBeTruthy();
    expect(spectator.query('button[mat-icon-button][simple-icon-button]>mat-icon[simple-icon]')).toHaveText(component.icon);
  });

  it('should emit the buttonClick event when the button is clicked and not disabled', () => {
    spyOn(component.buttonClick, 'emit');
    // .callThrough() to allow call on the original method while spying on it
    spyOn(component, 'onClickButton').and.callThrough();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    button.click();
    expect(component.buttonClick.emit).toHaveBeenCalled();
    expect(component.onClickButton).toHaveBeenCalled();
  });

  it('should not emit the buttonClick event when the button is disabled', () => {
    component.isDisabled = true;
    spectator.detectChanges();
    spyOn(component, 'onClickButton');
    spyOn(component.buttonClick, 'emit');
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    button.click();
    expect(component.onClickButton).not.toHaveBeenCalled();
    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });

  it('should disable the button when isDisabled is true', () => {
    component.isDisabled = true;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button.getAttribute('disabled')).toBeTruthy();
  });

  it('should enable the button when isDisabled is false', () => {
    component.isDisabled = false;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button.getAttribute('disabled')).toBeFalsy();
  });

  it('should hide the button when isHidden is true', () => {
    component.isHidden = true;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button.getAttribute('hidden')).toEqual('');
  });

  it('should show the button when isHidden is false', () => {
    component.isHidden = false;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button.getAttribute('hidden')).toBeFalsy();
  });
});