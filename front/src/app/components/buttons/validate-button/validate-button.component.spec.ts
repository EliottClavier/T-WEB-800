import { ValidateButtonComponent } from './validate-button.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../../app.module";

describe('ValidateButtonComponent', () => {
  let component: ValidateButtonComponent;
  let spectator: Spectator<ValidateButtonComponent>;

  const createComponent = createComponentFactory({
    component: ValidateButtonComponent,
    imports: [ AppModule ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat-button with specific text', () => {
    expect(spectator.query('button[mat-stroked-button][validate-button]')).toBeTruthy();
    expect(spectator.query('button[mat-stroked-button][validate-button]')).toHaveText('Validate');
  });

  it('should emit the validate event when the button is clicked and not disabled', () => {
    spyOn(component.validate, 'emit');
    // .callThrough() to allow call on the original method while spying on it
    spyOn(component, 'onClickButton').and.callThrough();
    const button: HTMLElement = spectator.query('[validate-button]')!;
    button.click();
    expect(component.validate.emit).toHaveBeenCalled();
    expect(component.onClickButton).toHaveBeenCalled();
  });

  it('should not emit the validate event when the button is disabled', () => {
    component.isDisabled = true;
    spectator.detectChanges();
    spyOn(component, 'onClickButton');
    spyOn(component.validate, 'emit');
    const button: HTMLElement = spectator.query('[validate-button]')!;
    button.click();
    expect(component.onClickButton).not.toHaveBeenCalled();
    expect(component.validate.emit).not.toHaveBeenCalled();
  });

  it('should disable the button when isDisabled is true', () => {
    component.isDisabled = true;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[validate-button]')!;
    expect(button.getAttribute('disabled')).toBeTruthy();
  });

  it('should enable the button when isDisabled is false', () => {
    component.isDisabled = true;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[validate-button]')!;
    expect(button.getAttribute('disabled')).toEqual('true');
  });
});
