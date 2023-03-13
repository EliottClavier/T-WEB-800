import { SimpleButtonComponent } from './simple-button.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../../app.module";

describe('ValidateButtonComponent', () => {
  let component: SimpleButtonComponent;
  let spectator: Spectator<SimpleButtonComponent>;

  const createComponent = createComponentFactory({
    component: SimpleButtonComponent,
    imports: [ AppModule ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;

    component.label = "Test";

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat-button with specific label', () => {
    expect(spectator.query('button[mat-stroked-button][simple-button]')).toBeTruthy();
    expect(spectator.query('button[mat-stroked-button][simple-button]')).toHaveText(component.label);
  });

  it('should emit the validate event when the button is clicked and not disabled', () => {
    spyOn(component.validate, 'emit');
    // .callThrough() to allow call on the original method while spying on it
    spyOn(component, 'onClickButton').and.callThrough();
    const button: HTMLElement = spectator.query('[simple-button]')!;
    button.click();
    expect(component.validate.emit).toHaveBeenCalled();
    expect(component.onClickButton).toHaveBeenCalled();
  });

  it('should not emit the validate event when the button is disabled', () => {
    component.isDisabled = true;
    spectator.detectChanges();
    spyOn(component, 'onClickButton');
    spyOn(component.validate, 'emit');
    const button: HTMLElement = spectator.query('[simple-button]')!;
    button.click();
    expect(component.onClickButton).not.toHaveBeenCalled();
    expect(component.validate.emit).not.toHaveBeenCalled();
  });

  it('should disable the button when isDisabled is true', () => {
    component.isDisabled = true;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-button]')!;
    expect(button.getAttribute('disabled')).toBeTruthy();
  });

  it('should enable the button when isDisabled is false', () => {
    component.isDisabled = false;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-button]')!;
    expect(button.getAttribute('disabled')).toBeFalsy();
  });

  it('should hide the button when isHidden is true', () => {
    component.isHidden = true;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-button]')!;
    expect(button.getAttribute('hidden')).toEqual('');
  });

  it('should show the button when isHidden is false', () => {
    component.isHidden = false;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-button]')!;
    expect(button.getAttribute('hidden')).toBeFalsy();
  });
});
