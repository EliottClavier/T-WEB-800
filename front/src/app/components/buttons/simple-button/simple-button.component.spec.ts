import { SimpleButtonComponent } from './simple-button.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../../app.module";

describe('SimpleButtonComponent', () => {
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
    component.buttonType = "flat";

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat-button with specific label', () => {
    expect(spectator.query('button[mat-flat-button][simple-button]')).toBeTruthy();
    expect(spectator.query('button[mat-flat-button][simple-button]')).toHaveText(component.label);
  });

  it('should emit the buttonClick event when the button is clicked and not disabled', () => {
    spyOn(component.buttonClick, 'emit');
    // .callThrough() to allow call on the original method while spying on it
    spyOn(component, 'onClickButton').and.callThrough();
    const button: HTMLElement = spectator.query('[simple-button]')!;
    button.click();
    expect(component.buttonClick.emit).toHaveBeenCalled();
    expect(component.onClickButton).toHaveBeenCalled();
  });

  it('should not emit the buttonClick event when the button is disabled', () => {
    component.isDisabled = true;
    spectator.detectChanges();
    spyOn(component, 'onClickButton');
    spyOn(component.buttonClick, 'emit');
    const button: HTMLElement = spectator.query('[simple-button]')!;
    button.click();
    expect(component.onClickButton).not.toHaveBeenCalled();
    expect(component.buttonClick.emit).not.toHaveBeenCalled();
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

  it('should change height dynamically', () => {
    let button: HTMLElement = spectator.query('[simple-button]')!;
    expect(button).toHaveStyle({height: component.height});

    component.height = '20px';
    spectator.detectChanges();
    button = spectator.query('[simple-button]')!;
    expect(button).toHaveStyle({height: component.height});
  });

  it('should have a mat-flat-button by default', () => {
    expect(spectator.query('button[mat-flat-button][simple-button]')).toBeTruthy();
  });

  it('should have a mat-stroked-button', () => {
    component.buttonType = 'stroked';
    spectator.detectChanges();
    expect(spectator.query('button[mat-stroked-button][simple-button]')).toBeTruthy();
  });

  it('should have a mat-flat-button with an icon', () => {
    component.icon = 'add';
    spectator.detectChanges();
    expect(spectator.query('button[mat-flat-button][simple-button]>mat-icon')).toHaveText('add');
  });
});
